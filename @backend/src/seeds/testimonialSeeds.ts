import { Testimonial } from '../models/Testimonial.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger();

export const testimonialSeeds = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    quote: "This AI content tool has revolutionized our content creation process. We've increased our output by 300% while maintaining high quality and relevance. Our team can now focus on strategy while the AI handles the heavy lifting.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "San Francisco, CA",
    industry: "Technology",
    companySize: "51-200",
    featured: true,
    active: true,
    displayOrder: 1,
    tags: ["productivity", "marketing", "automation"]
  },
  {
    name: "David Chen",
    role: "Content Strategist",
    company: "MediaPulse",
    quote: "The ROI has been incredible. We've cut our content production costs by 60% while doubling our engagement metrics across all channels. The AI understands our brand voice perfectly.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "New York, NY",
    industry: "Media & Entertainment",
    companySize: "11-50",
    featured: true,
    active: true,
    displayOrder: 2,
    tags: ["ROI", "cost-reduction", "engagement"]
  },
  {
    name: "Emma Rodriguez",
    role: "CEO",
    company: "Startup Accelerate",
    quote: "As a startup founder, I needed a solution that could scale with us. This platform delivers enterprise-quality content without the enterprise price tag. It's been a game-changer for our growth.",
    image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Austin, TX",
    industry: "Business Services",
    companySize: "1-10",
    featured: true,
    active: true,
    displayOrder: 3,
    tags: ["startup", "scalability", "growth"]
  },
  {
    name: "Michael Thompson",
    role: "Digital Marketing Manager",
    company: "E-Commerce Solutions Ltd",
    quote: "The multilingual support has opened up new markets for us. We can now create compelling product descriptions in 15+ languages, increasing our international sales by 400%.",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "London, UK",
    industry: "E-commerce",
    companySize: "201-1000",
    featured: false,
    active: true,
    displayOrder: 4,
    tags: ["multilingual", "international", "sales"]
  },
  {
    name: "Priya Patel",
    role: "Content Marketing Lead",
    company: "HealthTech Innovations",
    quote: "The AI's ability to adapt to our medical content requirements while maintaining accuracy is impressive. It helps us create educational content that's both engaging and compliant.",
    image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Boston, MA",
    industry: "Healthcare",
    companySize: "51-200",
    featured: false,
    active: true,
    displayOrder: 5,
    tags: ["healthcare", "compliance", "education"]
  },
  {
    name: "James Wilson",
    role: "Brand Manager",
    company: "Fashion Forward Co",
    quote: "Creating seasonal campaigns used to take weeks. Now we can generate fresh, on-brand content for every collection launch. The creative possibilities are endless.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    location: "Los Angeles, CA",
    industry: "Fashion & Retail",
    companySize: "11-50",
    featured: false,
    active: true,
    displayOrder: 6,
    tags: ["creative", "campaigns", "fashion"]
  },
  {
    name: "Lisa Garcia",
    role: "Communications Director",
    company: "GreenEnergy Corp",
    quote: "Explaining complex sustainability concepts in simple terms was always a challenge. This AI helps us create compelling environmental content that resonates with all audiences.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Seattle, WA",
    industry: "Clean Energy",
    companySize: "201-1000",
    featured: false,
    active: true,
    displayOrder: 7,
    tags: ["sustainability", "education", "environment"]
  },
  {
    name: "Robert Kim",
    role: "Product Marketing Manager",
    company: "FinTech Solutions",
    quote: "The AI understands financial regulations and helps us create compliant yet engaging content. Our conversion rates have improved by 150% since implementing this tool.",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Chicago, IL",
    industry: "Financial Services",
    companySize: "1000+",
    featured: false,
    active: true,
    displayOrder: 8,
    tags: ["fintech", "compliance", "conversion"]
  },
  {
    name: "Anna Kowalski",
    role: "Social Media Manager",
    company: "Travel Dreams Agency",
    quote: "From destination guides to social posts, the AI captures the wanderlust perfectly. Our engagement on social media has tripled, and booking inquiries have surged.",
    image: "https://images.pexels.com/photos/1181721/pexels-photo-1181721.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    location: "Miami, FL",
    industry: "Travel & Tourism",
    companySize: "11-50",
    featured: false,
    active: true,
    displayOrder: 9,
    tags: ["travel", "social-media", "engagement"]
  },
  {
    name: "Carlos Martinez",
    role: "Growth Marketing Director",
    company: "EdTech Pioneer",
    quote: "Creating educational content at scale was our biggest challenge. This platform helps us develop courses, tutorials, and assessments that truly engage learners.",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Portland, OR",
    industry: "Education Technology",
    companySize: "51-200",
    featured: false,
    active: true,
    displayOrder: 10,
    tags: ["education", "learning", "scale"]
  },
  {
    name: "Jennifer Park",
    role: "VP of Marketing",
    company: "FoodTech Innovations",
    quote: "Recipe descriptions, nutritional content, and marketing copy - the AI handles it all. We've launched 5 new product lines this year, each with compelling stories.",
    image: "https://images.pexels.com/photos/1181522/pexels-photo-1181522.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    location: "San Diego, CA",
    industry: "Food & Beverage",
    companySize: "201-1000",
    featured: false,
    active: true,
    displayOrder: 11,
    tags: ["food", "product-launch", "storytelling"]
  },
  {
    name: "Ahmed Hassan",
    role: "Content Operations Manager",
    company: "Sports Analytics Pro",
    quote: "Game recaps, player analyses, and fan content - the AI understands sports terminology and creates content that resonates with our passionate fanbase.",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Atlanta, GA",
    industry: "Sports & Entertainment",
    companySize: "11-50",
    featured: false,
    active: true,
    displayOrder: 12,
    tags: ["sports", "analytics", "fan-engagement"]
  },
  {
    name: "Rachel Foster",
    role: "Creative Director",
    company: "Design Studio Collective",
    quote: "The AI doesn't replace creativity - it amplifies it. We can now explore more concepts, test different messaging, and deliver better results for our clients.",
    image: "https://images.pexels.com/photos/1181460/pexels-photo-1181460.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
    location: "Denver, CO",
    industry: "Design & Creative",
    companySize: "1-10",
    featured: false,
    active: true,
    displayOrder: 13,
    tags: ["creativity", "design", "client-work"]
  },
  {
    name: "Thomas Anderson",
    role: "Head of Content",
    company: "Enterprise Software Corp",
    quote: "Technical documentation, user guides, and marketing materials - the AI adapts to different audiences perfectly. Our support tickets have decreased by 30%.",
    image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Redmond, WA",
    industry: "Enterprise Software",
    companySize: "1000+",
    featured: false,
    active: true,
    displayOrder: 14,
    tags: ["technical-writing", "documentation", "support"]
  },
  {
    name: "Maria Santos",
    role: "Digital Strategy Lead",
    company: "Non-Profit Alliance",
    quote: "Creating compelling fundraising content and volunteer communications has never been easier. We've increased donations by 80% and volunteer sign-ups by 120%.",
    image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    location: "Washington, DC",
    industry: "Non-Profit",
    companySize: "51-200",
    featured: false,
    active: true,
    displayOrder: 15,
    tags: ["non-profit", "fundraising", "volunteers"]
  }
];

export const seedTestimonials = async () => {
  try {
    console.log('🌱 Starting testimonial seeding...');
    logger.info('Starting testimonial seeding...');

    // Clear existing testimonials
    console.log('🧹 Clearing existing testimonials...');
    await Testimonial.deleteMany({});
    console.log('✅ Cleared existing testimonials');
    logger.info('Cleared existing testimonials');

    // Insert seed data
    console.log(`📝 Inserting ${testimonialSeeds.length} testimonials...`);
    const createdTestimonials = await Testimonial.insertMany(testimonialSeeds);
    console.log(`✅ Created ${createdTestimonials.length} testimonials`);
    logger.info(`Created ${createdTestimonials.length} testimonials`);

    // Log statistics
    const stats = await Testimonial.getStats();
    console.log('📊 Testimonial seed statistics:', {
      total: stats.total,
      active: stats.active,
      featured: stats.featured,
      avgRating: stats.avgRating?.toFixed(1),
      industries: stats.byIndustry.length
    });
    logger.info('Testimonial seed statistics:', {
      total: stats.total,
      active: stats.active,
      featured: stats.featured,
      avgRating: stats.avgRating?.toFixed(1),
      industries: stats.byIndustry.length
    });

    console.log('🎉 Testimonial seeding completed successfully');
    logger.info('Testimonial seeding completed successfully');
    return createdTestimonials;
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    logger.error('Error seeding testimonials:', error);
    throw error;
  }
}; 