import mongoose from 'mongoose';
import { HeroSection } from '../models/HeroSection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const frontendHeroData = {
  badge: "AI-Powered Content Generation",
  title: "Create",
  titleHighlight: "exceptional content",
  subtitle: "in seconds",
  description: "Leverage AI to produce high-quality, engaging content 10x faster than traditional methods.",
  primaryCTA: {
    text: "Start Free Trial",
    url: "/auth/register",
    style: "primary" as const,
    icon: "ChevronRightIcon"
  },
  secondaryCTA: {
    text: "Watch Demo",
    url: "/demo",
    style: "outline" as const
  },
  additionalInfo: "No credit card required • Free 14-day trial",
  heroImage: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  floatingElements: [
    {
      text: "AI Writing",
      type: "badge" as const,
      position: "top-right",
      color: "primary",
      icon: "circle"
    },
    {
      text: "Smart Templates",
      type: "indicator" as const,
      position: "bottom-left", 
      color: "success",
      icon: "circle"
    },
    {
      text: "SEO Optimizer",
      type: "feature" as const,
      position: "center-left",
      color: "accent"
    }
  ],
  stats: [
    {
      label: "Content Creation Time",
      value: "10x",
      description: "faster than traditional methods"
    },
    {
      label: "Cost Reduction",
      value: "60%",
      description: "compared to traditional content creation"
    },
    {
      label: "Content Output",
      value: "300%",
      description: "increase in content production"
    },
    {
      label: "Happy Customers",
      value: "1000+",
      description: "satisfied content creators"
    }
  ],
  features: [
    {
      icon: "Sparkles",
      title: "AI-Powered Content Creation",
      description: "Generate high-quality, engaging content in seconds with our advanced AI algorithms."
    },
    {
      icon: "LayoutTemplate",
      title: "Smart Templates",
      description: "Choose from hundreds of pre-built templates for blogs, ads, social media, and more."
    },
    {
      icon: "Search",
      title: "SEO Optimization",
      description: "Built-in SEO tools analyze and enhance your content for better search engine rankings."
    },
    {
      icon: "Globe",
      title: "Multi-Language Support",
      description: "Create and translate content in over 50 languages for global reach."
    }
  ],
  theme: {
    particles: true,
    animations: true,
    gradientEffects: true
  },
  isActive: true,
  version: "2.0.0"
};

async function seedFrontendHeroSection() {
  try {
    console.log('🔄 Starting frontend hero section seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinitiflow';
    console.log('📡 Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully');

    // Deactivate any existing hero sections
    console.log('⏳ Deactivating existing hero sections...');
    await HeroSection.updateMany({}, { $set: { isActive: false } });

    // Create the new frontend-based hero section
    console.log('📝 Creating new frontend-based hero section...');
    const newHero = new HeroSection(frontendHeroData);
    await newHero.save();
    
    console.log('✅ Frontend hero section created:', newHero.title, newHero.titleHighlight, newHero.subtitle);
    console.log('📄 Hero ID:', newHero._id);
    console.log('🏷️ Badge:', newHero.badge);
    console.log('🔗 Primary CTA:', newHero.primaryCTA.text);
    console.log('🔗 Secondary CTA:', newHero.secondaryCTA?.text);
    console.log('ℹ️ Additional Info:', newHero.additionalInfo);
    console.log('🖼️ Hero Image:', newHero.heroImage);
    console.log('✨ Floating Elements:', newHero.floatingElements?.length || 0);
    console.log('📊 Stats:', newHero.stats?.length || 0);
    console.log('🎯 Features:', newHero.features?.length || 0);
    console.log('🎨 Theme enabled:', newHero.theme);

    // Verify the data was saved
    console.log('🔍 Verifying saved data...');
    const activeHero = await HeroSection.findOne({ isActive: true });
    console.log('🎯 Active hero section:', activeHero ? `${activeHero.title} ${activeHero.titleHighlight} ${activeHero.subtitle}` : 'None found');

    console.log('🎉 Frontend hero section seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding frontend hero section:', error);
    throw error;
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('📪 MongoDB connection closed');
  }
}

// Run the seed function
seedFrontendHeroSection()
  .then(() => {
    console.log('✅ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  }); 