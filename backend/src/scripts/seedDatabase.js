import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Template from '../models/Template.js';
import Content from '../models/Content.js';
import Subscription from '../models/Subscription.js';
import { logger } from '../utils/logger.js';

// Load environment variables
dotenv.config();

const seedUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'admin',
    isEmailVerified: true,
    company: {
      name: 'InfinitiFlow Inc.',
      position: 'CEO',
      size: '51-200',
      industry: 'Technology'
    }
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
    company: {
      name: 'Marketing Pro',
      position: 'Marketing Manager',
      size: '11-50',
      industry: 'Marketing'
    }
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true
  }
];

const seedTemplates = [
  {
    name: 'Blog Post Generator',
    description: 'Create engaging blog posts on any topic with proper structure and SEO optimization.',
    prompt: 'Write a comprehensive blog post about {{topic}}. The post should be {{tone}} in tone, targeted at {{audience}}, and approximately {{wordCount}} words. Include an engaging introduction, well-structured main points, and a compelling conclusion. Focus on {{keywords}} for SEO optimization.',
    category: 'blog-writing',
    type: 'blog-post',
    fields: [
      {
        name: 'topic',
        label: 'Blog Topic',
        type: 'text',
        placeholder: 'Enter the main topic for your blog post',
        required: true,
        order: 1
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['professional', 'casual', 'friendly', 'informative', 'persuasive'],
        defaultValue: 'professional',
        required: true,
        order: 2
      },
      {
        name: 'audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'e.g., small business owners, tech enthusiasts',
        required: true,
        order: 3
      },
      {
        name: 'wordCount',
        label: 'Word Count',
        type: 'select',
        options: ['500-800', '800-1200', '1200-1500', '1500+'],
        defaultValue: '800-1200',
        order: 4
      },
      {
        name: 'keywords',
        label: 'SEO Keywords',
        type: 'text',
        placeholder: 'Enter comma-separated keywords',
        order: 5
      }
    ],
    tags: ['blog', 'seo', 'content-marketing'],
    isPublic: true,
    isFeatured: true,
    icon: 'FileText',
    color: '#3b82f6',
    estimatedTime: 45,
    difficulty: 'beginner'
  },
  {
    name: 'Social Media Post',
    description: 'Generate engaging social media posts for various platforms with hashtags and emojis.',
    prompt: 'Create a {{platform}} post about {{topic}}. The post should be {{tone}} and include relevant hashtags and emojis. Target audience: {{audience}}. Call to action: {{cta}}',
    category: 'social-media',
    type: 'social-media-post',
    fields: [
      {
        name: 'platform',
        label: 'Platform',
        type: 'select',
        options: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok'],
        required: true,
        order: 1
      },
      {
        name: 'topic',
        label: 'Post Topic',
        type: 'text',
        placeholder: 'What is your post about?',
        required: true,
        order: 2
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['casual', 'professional', 'humorous', 'inspirational', 'educational'],
        defaultValue: 'casual',
        order: 3
      },
      {
        name: 'audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'Who are you targeting?',
        order: 4
      },
      {
        name: 'cta',
        label: 'Call to Action',
        type: 'text',
        placeholder: 'What action should users take?',
        order: 5
      }
    ],
    tags: ['social-media', 'marketing', 'engagement'],
    isPublic: true,
    isFeatured: true,
    icon: 'Share2',
    color: '#8b5cf6',
    estimatedTime: 15,
    difficulty: 'beginner'
  },
  {
    name: 'Email Marketing Campaign',
    description: 'Create compelling email marketing campaigns that drive conversions.',
    prompt: 'Write an email marketing campaign for {{product}}. Subject line should be attention-grabbing. Email should be {{tone}}, targeted at {{audience}}, and include a clear call-to-action for {{goal}}. Keep it under {{length}} words.',
    category: 'email-marketing',
    type: 'email',
    fields: [
      {
        name: 'product',
        label: 'Product/Service',
        type: 'text',
        placeholder: 'What are you promoting?',
        required: true,
        order: 1
      },
      {
        name: 'tone',
        label: 'Email Tone',
        type: 'select',
        options: ['friendly', 'professional', 'urgent', 'casual', 'formal'],
        defaultValue: 'friendly',
        order: 2
      },
      {
        name: 'audience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'Describe your email recipients',
        required: true,
        order: 3
      },
      {
        name: 'goal',
        label: 'Campaign Goal',
        type: 'select',
        options: ['Purchase', 'Sign up', 'Download', 'Learn more', 'Book appointment'],
        required: true,
        order: 4
      },
      {
        name: 'length',
        label: 'Email Length',
        type: 'select',
        options: ['150', '250', '400', '600'],
        defaultValue: '250',
        order: 5
      }
    ],
    tags: ['email', 'marketing', 'conversion'],
    isPublic: true,
    icon: 'Mail',
    color: '#ef4444',
    estimatedTime: 30,
    difficulty: 'intermediate',
    requiredPlan: 'basic'
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB connected for seeding');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    logger.info('Clearing existing data...');
    await User.deleteMany({});
    await Template.deleteMany({});
    await Content.deleteMany({});
    await Subscription.deleteMany({});

    logger.info('Creating users...');
    const users = await User.create(seedUsers);
    logger.info(`Created ${users.length} users`);

    // Create subscriptions for users
    logger.info('Creating subscriptions...');
    const subscriptions = await Promise.all(
      users.map((user, index) => {
        const plans = ['free', 'basic', 'premium'];
        return Subscription.create({
          user: user._id,
          plan: plans[index] || 'free'
        });
      })
    );
    logger.info(`Created ${subscriptions.length} subscriptions`);

    // Create templates
    logger.info('Creating templates...');
    const templatesWithCreator = seedTemplates.map(template => ({
      ...template,
      creator: users[0]._id // Admin user as creator
    }));
    
    const templates = await Template.create(templatesWithCreator);
    logger.info(`Created ${templates.length} templates`);

    // Create sample content
    logger.info('Creating sample content...');
    const sampleContent = [
      {
        title: 'Getting Started with AI Content Generation',
        content: 'Artificial Intelligence has revolutionized the way we create content. From blog posts to social media updates, AI tools can help you generate high-quality content in minutes rather than hours...',
        type: 'blog-post',
        category: 'content',
        user: users[1]._id,
        template: templates[0]._id,
        prompt: 'Write about AI content generation',
        tags: ['ai', 'content', 'productivity'],
        status: 'published',
        isPublic: true
      },
      {
        title: '🚀 Boost Your Productivity with InfinitiFlow',
        content: 'Ready to 10x your content creation? InfinitiFlow makes it easier than ever to generate high-quality content for your business. Try it free today! #productivity #AI #contentcreation',
        type: 'social-media-post',
        category: 'social-media',
        platform: 'twitter',
        user: users[1]._id,
        template: templates[1]._id,
        prompt: 'Create a Twitter post about InfinitiFlow',
        tags: ['social-media', 'promotion'],
        status: 'published'
      },
      {
        title: 'Welcome to Our Premium Features!',
        content: 'Subject: Unlock the full potential of AI content creation\n\nHi there!\n\nWe\'re excited to introduce you to our premium features that will take your content creation to the next level...',
        type: 'email',
        category: 'email-marketing',
        user: users[2]._id,
        template: templates[2]._id,
        prompt: 'Create a welcome email for premium users',
        tags: ['email', 'welcome', 'premium'],
        status: 'draft'
      }
    ];

    const content = await Content.create(sampleContent);
    logger.info(`Created ${content.length} content pieces`);

    // Update template usage stats
    await Promise.all(templates.map(template => {
      template.usageStats.totalUses = Math.floor(Math.random() * 100) + 10;
      template.usageStats.averageRating = Math.random() * 2 + 3; // 3-5 star rating
      template.usageStats.totalRatings = Math.floor(Math.random() * 50) + 5;
      template.usageStats.lastUsed = new Date();
      return template.save();
    }));

    logger.info('✅ Database seeded successfully!');
    logger.info(`Created:
    - ${users.length} users
    - ${subscriptions.length} subscriptions  
    - ${templates.length} templates
    - ${content.length} content pieces`);

  } catch (error) {
    logger.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    logger.info('Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
if (process.argv[2] === '--seed') {
  seedDatabase();
} else {
  logger.info('Use --seed flag to run the seeder: npm run seed -- --seed');
}