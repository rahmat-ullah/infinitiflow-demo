import { catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

// Sample data structure matching the frontend
const useCases = [
  {
    id: 'blog-writing',
    title: 'Blog Writing',
    description: 'Blog writing made better with AI-powered writing, editing, and optimization.',
    category: 'content',
    featured: false,
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
    ],
    icon: 'PenTool'
  },
  {
    id: 'copywriting',
    title: 'Copywriting',
    description: 'Write copy that converts with InfinitiFlow\'s AI copywriting solutions.',
    category: 'marketing',
    featured: false,
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
    ],
    icon: 'Target'
  },
  {
    id: 'seo-content',
    title: 'SEO Content',
    description: 'Boost traffic and conversions with AI-powered content creation and optimization.',
    category: 'marketing',
    featured: true,
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
    ],
    icon: 'Search'
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'AI-powered social media tools to help you create captions and repurpose content at scale.',
    category: 'marketing',
    featured: false,
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
    ],
    icon: 'Share2'
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    description: 'Engage your audiences and increase open rates with AI-powered email marketing.',
    category: 'marketing',
    featured: false,
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
    ],
    icon: 'Mail'
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    description: 'Level-up your content strategy with AI-powered content repurposing and optimization.',
    category: 'strategy',
    featured: false,
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
    ],
    icon: 'TrendingUp'
  }
];

const roleSolutions = [
  {
    id: 'product-marketing',
    title: 'Product Marketing',
    description: 'Uplevel product launches, messaging, and enablement, all while empowering your team to achieve 10x results.',
    icon: 'Briefcase',
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
    icon: 'FileText',
    features: [
      'Blog post creation and optimization',
      'Content calendar management',
      'SEO content optimization',
      'Content performance analytics',
      'Multi-channel content distribution'
    ],
    useCases: [
      'Blog content series',
      'Content hub development',
      'SEO content strategy',
      'Content repurposing workflows'
    ]
  },
  {
    id: 'growth-marketing',
    title: 'Growth Marketing',
    description: 'Accelerate growth with data-driven content that converts prospects into customers at every stage of the funnel.',
    icon: 'TrendingUp',
    features: [
      'Conversion funnel content',
      'A/B testing frameworks',
      'Lead magnet creation',
      'Growth experiment content',
      'Performance optimization'
    ],
    useCases: [
      'Landing page optimization',
      'Lead generation campaigns',
      'Conversion rate optimization',
      'Growth hack content'
    ]
  }
];

const industrySolutions = [
  {
    id: 'technology',
    title: 'Technology',
    description: 'Accelerate product adoption with technical content that educates and converts.',
    icon: 'Zap',
    features: [
      'Technical documentation',
      'API documentation',
      'Developer tutorials',
      'Product feature explanations'
    ],
    useCases: [
      'Software documentation',
      'Technical blog posts',
      'Developer onboarding',
      'Product announcements'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Create compliant, educational content that builds trust with patients and professionals.',
    icon: 'Heart',
    features: [
      'Patient education materials',
      'Medical content writing',
      'Compliance-ready copy',
      'Healthcare marketing content'
    ],
    useCases: [
      'Patient information guides',
      'Medical blog content',
      'Healthcare newsletters',
      'Treatment explanations'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Drive sales with compelling product descriptions and marketing content that converts.',
    icon: 'ShoppingCart',
    features: [
      'Product descriptions',
      'Category page content',
      'Email marketing campaigns',
      'Social commerce content'
    ],
    useCases: [
      'Product catalog optimization',
      'Sales campaign content',
      'Customer retention emails',
      'Social media advertising'
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Build trust and educate customers with clear, compliant financial content.',
    icon: 'DollarSign',
    features: [
      'Financial education content',
      'Compliance documentation',
      'Investment guides',
      'Financial product explanations'
    ],
    useCases: [
      'Investment newsletters',
      'Financial planning guides',
      'Product comparison content',
      'Regulatory communications'
    ]
  }
];

export const getAllUseCases = catchAsync(async (req, res, next) => {
  const { category, featured } = req.query;
  
  let filteredUseCases = [...useCases];
  
  // Filter by category if specified
  if (category && category !== 'all') {
    filteredUseCases = filteredUseCases.filter(useCase => useCase.category === category);
  }
  
  // Filter by featured if specified
  if (featured === 'true') {
    filteredUseCases = filteredUseCases.filter(useCase => useCase.featured);
  }

  logger.info(`Fetched ${filteredUseCases.length} use cases`, {
    category,
    featured,
    total: useCases.length
  });

  res.status(200).json({
    status: 'success',
    results: filteredUseCases.length,
    data: {
      useCases: filteredUseCases
    }
  });
});

export const getUseCase = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const useCase = useCases.find(uc => uc.id === id);
  
  if (!useCase) {
    return res.status(404).json({
      status: 'error',
      message: 'Use case not found'
    });
  }

  logger.info(`Fetched use case: ${useCase.title}`, { id });

  res.status(200).json({
    status: 'success',
    data: {
      useCase
    }
  });
});

export const getRoleSolutions = catchAsync(async (req, res, next) => {
  logger.info(`Fetched ${roleSolutions.length} role solutions`);

  res.status(200).json({
    status: 'success',
    results: roleSolutions.length,
    data: {
      roleSolutions
    }
  });
});

export const getIndustrySolutions = catchAsync(async (req, res, next) => {
  logger.info(`Fetched ${industrySolutions.length} industry solutions`);

  res.status(200).json({
    status: 'success',
    results: industrySolutions.length,
    data: {
      industrySolutions
    }
  });
});

export const getCategories = catchAsync(async (req, res, next) => {
  const categories = [
    { id: 'all', label: 'All Use Cases' },
    { id: 'content', label: 'Content Creation' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'strategy', label: 'Strategy' }
  ];

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories
    }
  });
});

// CRUD Operations for Use Cases
export const createUseCase = async (req, res) => {
  try {
    const { title, description, category, featured, icon, benefits, examples, metrics } = req.body;
    
    // Generate ID from title if not provided
    const id = req.body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check if use case with this ID already exists
    const existingUseCase = useCases.find(uc => uc.id === id);
    if (existingUseCase) {
      return res.status(400).json({ error: 'Use case with this ID already exists' });
    }
    
    const newUseCase = {
      id,
      title,
      description,
      category,
      featured: featured || false,
      icon,
      benefits: benefits || [],
      examples: examples || [],
      metrics: metrics || []
    };
    
    useCases.push(newUseCase);
    
    res.status(201).json(newUseCase);
  } catch (error) {
    console.error('Error creating use case:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUseCase = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const index = useCases.findIndex(uc => uc.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Use case not found' });
    }
    
    // Update the use case
    useCases[index] = { ...useCases[index], ...updates, id }; // Preserve ID
    
    res.json(useCases[index]);
  } catch (error) {
    console.error('Error updating use case:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUseCase = async (req, res) => {
  try {
    const { id } = req.params;
    
    const index = useCases.findIndex(uc => uc.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Use case not found' });
    }
    
    const deletedUseCase = useCases.splice(index, 1)[0];
    
    res.json({ message: 'Use case deleted successfully', useCase: deletedUseCase });
  } catch (error) {
    console.error('Error deleting use case:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// CRUD Operations for Role Solutions
export const createRoleSolution = async (req, res) => {
  try {
    const { title, description, icon, features, useCases } = req.body;
    
    const id = req.body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const existingRole = roleSolutions.find(rs => rs.id === id);
    if (existingRole) {
      return res.status(400).json({ error: 'Role solution with this ID already exists' });
    }
    
    const newRoleSolution = {
      id,
      title,
      description,
      icon,
      features: features || [],
      useCases: useCases || []
    };
    
    roleSolutions.push(newRoleSolution);
    
    res.status(201).json(newRoleSolution);
  } catch (error) {
    console.error('Error creating role solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRoleSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const index = roleSolutions.findIndex(rs => rs.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Role solution not found' });
    }
    
    roleSolutions[index] = { ...roleSolutions[index], ...updates, id };
    
    res.json(roleSolutions[index]);
  } catch (error) {
    console.error('Error updating role solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteRoleSolution = async (req, res) => {
  try {
    const { id } = req.params;
    
    const index = roleSolutions.findIndex(rs => rs.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Role solution not found' });
    }
    
    const deletedRoleSolution = roleSolutions.splice(index, 1)[0];
    
    res.json({ message: 'Role solution deleted successfully', roleSolution: deletedRoleSolution });
  } catch (error) {
    console.error('Error deleting role solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// CRUD Operations for Industry Solutions
export const createIndustrySolution = async (req, res) => {
  try {
    const { title, description, icon, features, useCases } = req.body;
    
    const id = req.body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const existingIndustry = industrySolutions.find(is => is.id === id);
    if (existingIndustry) {
      return res.status(400).json({ error: 'Industry solution with this ID already exists' });
    }
    
    const newIndustrySolution = {
      id,
      title,
      description,
      icon,
      features: features || [],
      useCases: useCases || []
    };
    
    industrySolutions.push(newIndustrySolution);
    
    res.status(201).json(newIndustrySolution);
  } catch (error) {
    console.error('Error creating industry solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateIndustrySolution = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const index = industrySolutions.findIndex(is => is.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Industry solution not found' });
    }
    
    industrySolutions[index] = { ...industrySolutions[index], ...updates, id };
    
    res.json(industrySolutions[index]);
  } catch (error) {
    console.error('Error updating industry solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteIndustrySolution = async (req, res) => {
  try {
    const { id } = req.params;
    
    const index = industrySolutions.findIndex(is => is.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Industry solution not found' });
    }
    
    const deletedIndustrySolution = industrySolutions.splice(index, 1)[0];
    
    res.json({ message: 'Industry solution deleted successfully', industrySolution: deletedIndustrySolution });
  } catch (error) {
    console.error('Error deleting industry solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 