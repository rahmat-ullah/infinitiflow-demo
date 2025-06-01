import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for blog image
export interface IBlogImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Interface for blog author
export interface IBlogAuthor {
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

// Interface for blog document with instance methods
export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  contentType: 'rich-text' | 'markdown';
  featuredImage?: IBlogImage;
  images: IBlogImage[];
  author: IBlogAuthor;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  viewCount: number;
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  generateSlug(): string;
  calculateReadingTime(): number;
  publish(): Promise<IBlog>;
  unpublish(): Promise<IBlog>;
}

// Interface for model static methods
export interface IBlogModel extends Model<IBlog> {
  findPublished(): Promise<IBlog[]>;
  findBySlug(slug: string): Promise<IBlog | null>;
  findByCategory(category: string): Promise<IBlog[]>;
  findByTag(tag: string): Promise<IBlog[]>;
  getPopularBlogs(limit?: number): Promise<IBlog[]>;
  getRecentBlogs(limit?: number): Promise<IBlog[]>;
}

// Blog image sub-schema
const BlogImageSchema = new Schema<IBlogImage>({
  url: {
    type: String,
    required: true,
    trim: true
  },
  alt: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 500
  },
  width: {
    type: Number,
    min: 1
  },
  height: {
    type: Number,
    min: 1
  }
});

// Blog author sub-schema
const BlogAuthorSchema = new Schema<IBlogAuthor>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  avatar: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  }
});

// SEO sub-schema
const SEOSchema = new Schema({
  metaTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  metaKeywords: [{
    type: String,
    trim: true
  }],
  ogImage: {
    type: String,
    trim: true
  }
});

// Main blog schema
const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-z0-9-]+$/
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['rich-text', 'markdown'],
    default: 'rich-text'
  },
  featuredImage: {
    type: BlogImageSchema,
    required: false
  },
  images: {
    type: [BlogImageSchema],
    default: []
  },
  author: {
    type: BlogAuthorSchema,
    required: true
  },
  categories: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  readingTime: {
    type: Number,
    min: 1
  },
  seo: {
    type: SEOSchema,
    default: () => ({})
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for performance
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ categories: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ viewCount: -1 });
BlogSchema.index({ title: 'text', content: 'text' });

// Pre-save middleware
BlogSchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug && this.title) {
    this.slug = this.generateSlug();
  }
  
  // Calculate reading time
  this.readingTime = this.calculateReadingTime();
  
  // Set published date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Instance methods
BlogSchema.methods.generateSlug = function(): string {
  return this.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

BlogSchema.methods.calculateReadingTime = function(): number {
  const wordsPerMinute = 200;
  const text = this.content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

BlogSchema.methods.publish = async function(): Promise<IBlog> {
  this.status = 'published';
  this.publishedAt = new Date();
  return this.save();
};

BlogSchema.methods.unpublish = async function(): Promise<IBlog> {
  this.status = 'draft';
  return this.save();
};

// Static methods
BlogSchema.statics.findPublished = function() {
  return this.find({ status: 'published' })
    .sort({ publishedAt: -1 });
};

BlogSchema.statics.findBySlug = function(slug: string) {
  return this.findOne({ slug, status: 'published' });
};

BlogSchema.statics.findByCategory = function(category: string) {
  return this.find({ 
    categories: { $in: [category] }, 
    status: 'published' 
  }).sort({ publishedAt: -1 });
};

BlogSchema.statics.findByTag = function(tag: string) {
  return this.find({ 
    tags: { $in: [tag] }, 
    status: 'published' 
  }).sort({ publishedAt: -1 });
};

BlogSchema.statics.getPopularBlogs = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ viewCount: -1 })
    .limit(limit);
};

BlogSchema.statics.getRecentBlogs = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(limit);
};

export const Blog = mongoose.model<IBlog, IBlogModel>('Blog', BlogSchema); 