export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface BlogAuthor {
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface BlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  contentType: 'rich-text' | 'markdown';
  featuredImage?: BlogImage;
  images: BlogImage[];
  author: BlogAuthor;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  viewCount: number;
  readingTime?: number;
  seo?: BlogSEO;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogApiResponse {
  success: boolean;
  data: Blog;
  error?: string;
  details?: string[];
  message?: string;
}

export interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    pagination: {
      current: number;
      total: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  error?: string;
}

export interface BlogStatsResponse {
  success: boolean;
  data: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    archivedBlogs: number;
    totalViews: number;
    topCategories: Array<{
      _id: string;
      count: number;
    }>;
  };
  error?: string;
}

export interface BlogCategory {
  name: string;
  count: number;
}

export interface BlogTag {
  name: string;
  count: number;
}

export interface UploadedImage {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

export interface ImageUploadResponse {
  success: boolean;
  data: UploadedImage | { images: UploadedImage[]; count: number };
  error?: string;
} 