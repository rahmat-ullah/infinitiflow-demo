import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../models/Testimonial.js';
import CustomerMetric from '../models/CustomerMetric.js';

// Load environment variables
dotenv.config();

// Use console for logging since this is a script
const log = {
  info: console.log,
  error: console.error
};

// Enhanced testimonials data structure (from controller)
const testimonialsData = [
  {
    id: 'sarah-johnson-techgrowth',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechGrowth Inc.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    date: '2023-12-15',
    quote: 'InfinitiFlow has completely transformed our content strategy. The AI-generated content is so natural and engaging that our audience engagement has skyrocketed. We\'ve reduced our content creation time by 85% while maintaining the highest quality standards.',
    longQuote: 'When we first implemented InfinitiFlow, I was skeptical about AI-generated content. But after seeing the results - a 300% increase in content output, 85% time savings, and 250% boost in engagement - I became a true believer. The platform doesn\'t just generate content; it understands our brand voice, our audience, and our goals. It\'s like having a team of expert writers who never sleep.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: true,
    verified: true,
    videoUrl: null,
    results: [
      { metric: 'Content Output', value: '300%', improvement: 'increase', description: 'More content pieces per month' },
      { metric: 'Time Saved', value: '85%', improvement: 'reduction', description: 'In content creation time' },
      { metric: 'Engagement', value: '250%', improvement: 'increase', description: 'Across all social channels' },
      { metric: 'ROI', value: '480%', improvement: 'return', description: 'On InfinitiFlow investment' }
    ],
    tags: ['Content Strategy', 'Marketing Automation', 'ROI'],
    useCase: 'content-marketing',
    companySize: 'Mid-market (100-500 employees)',
    implementation: {
      duration: '2 weeks',
      challenges: ['Content volume', 'Brand consistency', 'Time constraints'],
      solutions: ['AI content generation', 'Brand voice training', 'Automated workflows']
    }
  },
  {
    id: 'david-chen-mediapulse',
    name: 'David Chen',
    role: 'Content Strategist',
    company: 'MediaPulse',
    industry: 'Media & Entertainment',
    location: 'New York, NY',
    date: '2023-11-20',
    quote: 'The ROI has been incredible. We\'ve cut our content production costs by 60% while doubling our engagement metrics across all channels. The multi-language support helped us expand globally with minimal effort.',
    longQuote: 'As a content strategist, I\'ve worked with many tools, but InfinitiFlow stands out for its intelligence and adaptability. The platform learns from our successful content and replicates that success across different formats and channels. The multi-language capabilities opened up markets we never thought we could serve cost-effectively.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: false,
    verified: true,
    videoUrl: 'https://example.com/testimonial-video-1',
    results: [
      { metric: 'Cost Reduction', value: '60%', improvement: 'reduction', description: 'In content production costs' },
      { metric: 'Global Reach', value: '12', improvement: 'new markets', description: 'International markets entered' },
      { metric: 'Content Quality', value: '95%', improvement: 'approval rate', description: 'First-draft approval rate' },
      { metric: 'Revenue Growth', value: '180%', improvement: 'increase', description: 'From content-driven channels' }
    ],
    tags: ['Global Expansion', 'Cost Reduction', 'Multi-language'],
    useCase: 'global-content',
    companySize: 'Enterprise (500+ employees)',
    implementation: {
      duration: '3 weeks',
      challenges: ['Multi-language content', 'Regional compliance', 'Scale'],
      solutions: ['AI translation', 'Regional customization', 'Automated scaling']
    }
  },
  {
    id: 'emma-rodriguez-startup',
    name: 'Emma Rodriguez',
    role: 'CEO',
    company: 'Startup Accelerate',
    industry: 'Business Services',
    location: 'Austin, TX',
    date: '2023-10-10',
    quote: 'As a startup founder, I needed a solution that could scale with us. InfinitiFlow delivers enterprise-quality content without the enterprise price tag. It\'s like having a team of expert writers at a fraction of the cost.',
    longQuote: 'Running a startup means every dollar counts. InfinitiFlow gave us the content capabilities of a much larger company without the overhead. We went from struggling to produce one blog post a week to creating comprehensive content campaigns across multiple channels. The platform grew with us from 5 employees to 50.',
    image: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: true,
    verified: true,
    videoUrl: null,
    results: [
      { metric: 'Team Efficiency', value: '400%', improvement: 'increase', description: 'Content team productivity' },
      { metric: 'Monthly Savings', value: '$15K', improvement: 'cost reduction', description: 'Versus hiring writers' },
      { metric: 'Content Volume', value: '500%', improvement: 'increase', description: 'Pieces produced monthly' },
      { metric: 'Lead Generation', value: '320%', improvement: 'increase', description: 'Qualified leads from content' }
    ],
    tags: ['Startup Growth', 'Cost Efficiency', 'Scalability'],
    useCase: 'startup-growth',
    companySize: 'Small business (1-100 employees)',
    implementation: {
      duration: '1 week',
      challenges: ['Limited budget', 'Small team', 'Need for immediate results'],
      solutions: ['Cost-effective pricing', 'Easy implementation', 'Quick wins']
    }
  },
  {
    id: 'michael-park-ecommerce',
    name: 'Michael Park',
    role: 'Digital Marketing Manager',
    company: 'E-commerce Solutions',
    industry: 'E-commerce',
    location: 'Seattle, WA',
    date: '2023-12-05',
    quote: 'The content repurposing feature is a game-changer. We can now create blog posts, social media content, email campaigns, and product descriptions from a single input. Our workflow has never been more efficient.',
    longQuote: 'E-commerce requires content at scale - product descriptions, category pages, blog posts, social media, emails. InfinitiFlow\'s ability to repurpose content across all these channels while maintaining brand consistency has revolutionized our operations. We\'ve gone from reactive to proactive content marketing.',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: false,
    verified: true,
    videoUrl: null,
    results: [
      { metric: 'Workflow Efficiency', value: '350%', improvement: 'increase', description: 'Content production speed' },
      { metric: 'Channel Coverage', value: '8', improvement: 'platforms', description: 'Content channels managed' },
      { metric: 'Conversion Rate', value: '45%', improvement: 'increase', description: 'Product page conversions' },
      { metric: 'SEO Rankings', value: '200%', improvement: 'increase', description: 'First-page keyword rankings' }
    ],
    tags: ['E-commerce', 'Content Repurposing', 'Multi-channel'],
    useCase: 'ecommerce-content',
    companySize: 'Mid-market (100-500 employees)',
    implementation: {
      duration: '2 weeks',
      challenges: ['Product catalog scale', 'SEO requirements', 'Multiple channels'],
      solutions: ['Bulk content generation', 'SEO optimization', 'Channel-specific formatting']
    }
  },
  {
    id: 'lisa-thompson-healthcare',
    name: 'Lisa Thompson',
    role: 'Head of Content',
    company: 'Healthcare Innovations',
    industry: 'Healthcare',
    location: 'Boston, MA',
    date: '2023-11-15',
    quote: 'The AI understands our industry\'s compliance requirements perfectly. We can generate accurate, professional healthcare content that meets all regulatory standards while being engaging for our patients.',
    longQuote: 'Healthcare content is particularly challenging because it must be accurate, compliant, and engaging. InfinitiFlow\'s understanding of medical terminology and regulatory requirements is impressive. It helps us create patient education materials that are both informative and accessible, while ensuring full compliance with HIPAA and FDA guidelines.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: false,
    verified: true,
    videoUrl: 'https://example.com/testimonial-video-2',
    results: [
      { metric: 'Compliance Score', value: '100%', improvement: 'maintained', description: 'Regulatory compliance rate' },
      { metric: 'Patient Engagement', value: '180%', improvement: 'increase', description: 'With educational content' },
      { metric: 'Content Accuracy', value: '98%', improvement: 'rating', description: 'Medical review approval' },
      { metric: 'Time to Publish', value: '70%', improvement: 'reduction', description: 'Content review and approval' }
    ],
    tags: ['Healthcare', 'Compliance', 'Patient Education'],
    useCase: 'healthcare-content',
    companySize: 'Enterprise (500+ employees)',
    implementation: {
      duration: '4 weeks',
      challenges: ['Regulatory compliance', 'Medical accuracy', 'Patient accessibility'],
      solutions: ['Compliance templates', 'Medical fact-checking', 'Plain language optimization']
    }
  },
  {
    id: 'james-wilson-agency',
    name: 'James Wilson',
    role: 'Founder',
    company: 'Digital Agency Pro',
    industry: 'Marketing Agency',
    location: 'Miami, FL',
    date: '2023-12-01',
    quote: 'We use InfinitiFlow for all our client projects. The quality is consistently high, and the turnaround time is incredible. Our clients are amazed by the results we deliver.',
    longQuote: 'As an agency, our reputation depends on delivering exceptional results for diverse clients across industries. InfinitiFlow has become our secret weapon - it allows us to maintain high quality while scaling rapidly. We\'ve taken on 200% more clients without proportionally increasing our team size.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    featured: true,
    verified: true,
    videoUrl: null,
    results: [
      { metric: 'Client Satisfaction', value: '96%', improvement: 'rating', description: 'Net Promoter Score' },
      { metric: 'Project Delivery', value: '75%', improvement: 'faster', description: 'Average delivery time' },
      { metric: 'Revenue Growth', value: '200%', improvement: 'increase', description: 'Agency annual revenue' },
      { metric: 'Client Retention', value: '94%', improvement: 'rate', description: 'Annual client retention' }
    ],
    tags: ['Agency', 'Client Success', 'Scalability'],
    useCase: 'agency-services',
    companySize: 'Small business (1-100 employees)',
    implementation: {
      duration: '1 week',
      challenges: ['Client diversity', 'Quality consistency', 'Rapid scaling'],
      solutions: ['Multi-industry templates', 'Quality controls', 'Workflow automation']
    }
  }
];

// Customer metrics data
const customerMetricsData = [
  {
    id: 'active-users',
    title: 'Active Users',
    value: '50,000+',
    description: 'Content creators worldwide',
    category: 'users',
    order: 1
  },
  {
    id: 'content-generated',
    title: 'Content Generated',
    value: '10M+',
    description: 'Pieces of content created',
    category: 'content',
    order: 2
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    value: '98%',
    description: 'Positive feedback rate',
    category: 'satisfaction',
    order: 3
  },
  {
    id: 'awards-won',
    title: 'Awards Won',
    value: '15+',
    description: 'Industry recognitions',
    category: 'awards',
    order: 4
  },
  {
    id: 'countries-served',
    title: 'Countries Served',
    value: '45+',
    description: 'Global presence',
    category: 'global',
    order: 5
  },
  {
    id: 'average-roi',
    title: 'Average ROI',
    value: '340%',
    description: 'Return on investment',
    category: 'roi',
    order: 6
  }
];

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinitiflow';
    console.log('🔗 Connecting to MongoDB:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected for seeding');
    log.info('MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    log.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed testimonials
const seedTestimonials = async () => {
  try {
    log.info('Starting testimonials seeding...');
    
    // Clear existing testimonials
    await Testimonial.deleteMany({});
    log.info('Cleared existing testimonials');
    
    // Convert date strings to Date objects
    const testimonialsWithDates = testimonialsData.map(testimonial => ({
      ...testimonial,
      date: new Date(testimonial.date)
    }));
    
    // Insert testimonials
    const createdTestimonials = await Testimonial.insertMany(testimonialsWithDates);
    log.info(`Created ${createdTestimonials.length} testimonials`);
    
    return createdTestimonials;
  } catch (error) {
    log.error('Error seeding testimonials:', error);
    throw error;
  }
};

// Seed customer metrics
const seedCustomerMetrics = async () => {
  try {
    log.info('Starting customer metrics seeding...');
    
    // Clear existing metrics
    await CustomerMetric.deleteMany({});
    log.info('Cleared existing customer metrics');
    
    // Insert metrics
    const createdMetrics = await CustomerMetric.insertMany(customerMetricsData);
    log.info(`Created ${createdMetrics.length} customer metrics`);
    
    return createdMetrics;
  } catch (error) {
    log.error('Error seeding customer metrics:', error);
    throw error;
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    const testimonials = await seedTestimonials();
    const metrics = await seedCustomerMetrics();
    
    log.info('Database seeding completed successfully!');
    log.info(`Total testimonials: ${testimonials.length}`);
    log.info(`Total metrics: ${metrics.length}`);
    
    // Display sample data
    console.log('\n=== Sample Testimonials ===');
    testimonials.slice(0, 2).forEach(t => {
      console.log(`${t.name} (${t.company}) - ${t.industry} - Rating: ${t.rating}${t.featured ? ' [FEATURED]' : ''}`);
    });
    
    console.log('\n=== Customer Metrics ===');
    metrics.forEach(m => {
      console.log(`${m.title}: ${m.value} - ${m.description}`);
    });
    
  } catch (error) {
    log.error('Database seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    log.info('Database connection closed');
    process.exit(0);
  }
};

// Run seeding if this file is executed directly
console.log('📋 Script started, checking execution context...');
console.log('🔍 import.meta.url:', import.meta.url);
console.log('🔍 process.argv[1]:', process.argv[1]);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('✅ Running as main script, starting seeding...');
  seedDatabase();
} else {
  console.log('ℹ️  Imported as module, not running seeding');
}

// Also run immediately for testing
console.log('🏃 Running seeding immediately...');
seedDatabase().catch(console.error);

export { seedDatabase, seedTestimonials, seedCustomerMetrics }; 