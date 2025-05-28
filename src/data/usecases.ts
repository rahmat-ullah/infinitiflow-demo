import { UseCase, RoleSolution, IndustrySolution } from '../types/usecases';
import { 
  PenTool, 
  Share2, 
  Mail, 
  Search, 
  Target, 
  FileText,
  TrendingUp,
  Users,
  Megaphone,
  BarChart3,
  Briefcase,
  Calendar,
  ShoppingCart,
  Shield,
  Newspaper,
  Building2
} from 'lucide-react';

export const useCases: UseCase[] = [
  {
    id: 'blog-writing',
    title: 'Blog Writing',
    description: 'Blog writing made better with AI-powered writing, editing, and optimization.',
    icon: PenTool,
    category: 'content',
    benefits: [
      'Generate blog outlines in seconds',
      'Write engaging introductions and conclusions',
      'Optimize content for SEO automatically',
      'Maintain consistent brand voice',
      'Create content 5x faster'
    ],
    examples: [
      'Technical tutorials and how-to guides',
      'Industry insights and thought leadership',
      'Product announcements and updates',
      'Customer success stories'
    ],
    metrics: [
      { label: 'Content Speed', value: '5x faster', description: 'than traditional writing' },
      { label: 'SEO Score', value: '95%+', description: 'average optimization score' },
      { label: 'Engagement', value: '+40%', description: 'increase in reader engagement' }
    ]
  },
  {
    id: 'copywriting',
    title: 'Copywriting',
    description: 'Write copy that converts with InfinitiFlow\'s AI copywriting solutions.',
    icon: Target,
    category: 'marketing',
    benefits: [
      'Create high-converting sales copy',
      'Generate compelling headlines',
      'Write persuasive CTAs',
      'A/B test multiple variations',
      'Optimize for conversion rates'
    ],
    examples: [
      'Landing page copy and headlines',
      'Ad copy for Google and Facebook',
      'Email subject lines and content',
      'Product descriptions that sell'
    ],
    metrics: [
      { label: 'Conversion Rate', value: '+65%', description: 'improvement on average' },
      { label: 'CTR', value: '+45%', description: 'click-through rate increase' },
      { label: 'ROI', value: '8.5x', description: 'return on ad spend' }
    ]
  },
  {
    id: 'seo-content',
    title: 'SEO Content',
    description: 'Boost traffic and conversions with AI-powered content creation and optimization.',
    icon: Search,
    featured: true,
    category: 'marketing',
    benefits: [
      'Keyword research and optimization',
      'Content gap analysis',
      'Meta descriptions and titles',
      'Internal linking suggestions',
      'Featured snippet optimization'
    ],
    examples: [
      'SEO-optimized blog posts',
      'Category and product pages',
      'FAQ sections and knowledge bases',
      'Local SEO content'
    ],
    metrics: [
      { label: 'Organic Traffic', value: '+180%', description: 'increase in 6 months' },
      { label: 'Keywords Ranked', value: '3x more', description: 'first page rankings' },
      { label: 'Search Visibility', value: '+200%', description: 'improvement' }
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'AI-powered social media tools to help you create captions and repurpose content at scale.',
    icon: Share2,
    category: 'marketing',
    benefits: [
      'Generate platform-specific content',
      'Create engaging captions and hashtags',
      'Repurpose long-form content',
      'Schedule and optimize posting times',
      'Maintain brand consistency'
    ],
    examples: [
      'Instagram captions and stories',
      'LinkedIn professional posts',
      'Twitter threads and tweets',
      'Facebook posts and ads'
    ],
    metrics: [
      { label: 'Engagement Rate', value: '+85%', description: 'across all platforms' },
      { label: 'Content Volume', value: '10x more', description: 'posts per week' },
      { label: 'Follower Growth', value: '+120%', description: 'monthly increase' }
    ]
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    description: 'Engage your audiences and increase open rates with AI-powered email marketing.',
    icon: Mail,
    category: 'marketing',
    benefits: [
      'Craft compelling subject lines',
      'Personalize email content at scale',
      'Optimize send times and frequency',
      'Create automated email sequences',
      'A/B test email variations'
    ],
    examples: [
      'Welcome and onboarding sequences',
      'Newsletter content and campaigns',
      'Promotional and sales emails',
      'Re-engagement campaigns'
    ],
    metrics: [
      { label: 'Open Rate', value: '+55%', description: 'improvement' },
      { label: 'Click Rate', value: '+40%', description: 'increase' },
      { label: 'Revenue', value: '+25%', description: 'from email campaigns' }
    ]
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    description: 'Level-up your content strategy with AI-powered content repurposing and optimization.',
    icon: TrendingUp,
    category: 'strategy',
    benefits: [
      'Develop comprehensive content calendars',
      'Identify content gaps and opportunities',
      'Repurpose content across channels',
      'Track content performance',
      'Optimize content distribution'
    ],
    examples: [
      'Content calendar planning',
      'Content audit and optimization',
      'Cross-platform content repurposing',
      'Competitive content analysis'
    ],
    metrics: [
      { label: 'Content Output', value: '4x more', description: 'pieces per month' },
      { label: 'Efficiency', value: '+300%', description: 'team productivity' },
      { label: 'ROI', value: '+150%', description: 'content marketing ROI' }
    ]
  }
];

export const roleSolutions: RoleSolution[] = [
  {
    id: 'product-marketing',
    title: 'Product Marketing',
    description: 'Uplevel product launches, messaging, and enablement, all while empowering your team to achieve 10x results.',
    icon: Briefcase,
    features: [
      'Product launch campaigns',
      'Feature announcement content',
      'Competitive positioning',
      'Sales enablement materials',
      'Go-to-market strategy content'
    ],
    useCases: [
      'Product launch sequences',
      'Feature comparison sheets',
      'Sales battle cards',
      'Customer case studies'
    ]
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    description: 'Drive revenue growth and customer engagement with on-brand, AI-enhanced content that meets the marketing quality bar.',
    icon: FileText,
    features: [
      'Blog content creation',
      'Thought leadership articles',
      'Content calendar planning',
      'SEO optimization',
      'Content performance analytics'
    ],
    useCases: [
      'Editorial calendar management',
      'Long-form content creation',
      'Content repurposing',
      'SEO content optimization'
    ]
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    description: 'Embrace next-gen marketing and get to pipeline targets faster with unprecedented personalization and scale.',
    icon: BarChart3,
    features: [
      'Ad copy generation',
      'Landing page optimization',
      'Email campaign creation',
      'A/B testing content',
      'Conversion optimization'
    ],
    useCases: [
      'PPC ad campaigns',
      'Email marketing automation',
      'Landing page testing',
      'Conversion funnel optimization'
    ]
  },
  {
    id: 'field-marketing',
    title: 'Field Marketing',
    description: 'Deliver personalized and resonant experiences that forge customer connections and accelerate acquisition.',
    icon: Calendar,
    features: [
      'Event marketing content',
      'Local campaign materials',
      'Partnership content',
      'Regional messaging',
      'Event follow-up sequences'
    ],
    useCases: [
      'Conference and event marketing',
      'Local market campaigns',
      'Partner marketing materials',
      'Regional content localization'
    ]
  },
  {
    id: 'brand-marketing',
    title: 'Brand Marketing',
    description: 'Build an army of brand ambassadors with built-in brand guidelines and intuitive brand control center.',
    icon: Megaphone,
    features: [
      'Brand voice consistency',
      'Visual guideline integration',
      'Brand messaging framework',
      'Style guide enforcement',
      'Brand asset management'
    ],
    useCases: [
      'Brand campaign development',
      'Brand voice documentation',
      'Visual brand consistency',
      'Brand messaging alignment'
    ]
  },
  {
    id: 'pr-communications',
    title: 'PR & Communications',
    description: 'Tell your brand story in an impactful and authentic way with specialized workflows for PR and communications.',
    icon: Users,
    features: [
      'Press release creation',
      'Media kit development',
      'Crisis communication planning',
      'Executive communication',
      'Internal communications'
    ],
    useCases: [
      'Press release writing',
      'Media outreach campaigns',
      'Internal announcements',
      'Executive thought leadership'
    ]
  }
];

export const industrySolutions: IndustrySolution[] = [
  {
    id: 'technology',
    title: 'Technology',
    description: 'Accelerate product adoption and technical content creation with AI-powered solutions designed for tech companies.',
    icon: '💻',
    specialFeatures: [
      'Technical documentation generation',
      'API documentation creation',
      'Developer content optimization',
      'Product feature explanations',
      'Technical blog writing'
    ],
    commonUseCases: [
      'Product documentation',
      'Technical blog posts',
      'API guides and tutorials',
      'Feature announcement content'
    ]
  },
  {
    id: 'ecommerce',
    title: 'eCommerce & Retail',
    description: 'Scale product descriptions, marketing campaigns, and customer communications for retail success.',
    icon: '🛍️',
    specialFeatures: [
      'Product description generation',
      'Category page optimization',
      'Seasonal campaign content',
      'Customer review responses',
      'Email marketing automation'
    ],
    commonUseCases: [
      'Product catalog content',
      'Seasonal marketing campaigns',
      'Customer service responses',
      'Email marketing sequences'
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Simplify complex insurance concepts and create compliant content that educates and converts.',
    icon: '🛡️',
    specialFeatures: [
      'Policy explanation content',
      'Compliance-ready materials',
      'Educational content creation',
      'Claims process documentation',
      'Risk assessment content'
    ],
    commonUseCases: [
      'Policy documentation',
      'Educational blog content',
      'Customer communication',
      'Marketing materials'
    ]
  },
  {
    id: 'media-publishing',
    title: 'Media & Publishing',
    description: 'Enhance editorial workflows and content production with AI-powered writing and optimization tools.',
    icon: '📰',
    specialFeatures: [
      'Article generation and editing',
      'Editorial calendar management',
      'Content optimization',
      'Multi-format publishing',
      'Audience engagement content'
    ],
    commonUseCases: [
      'News article writing',
      'Editorial content creation',
      'Content series development',
      'Audience engagement campaigns'
    ]
  }
]; 