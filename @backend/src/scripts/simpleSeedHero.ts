import mongoose from 'mongoose';
import { HeroSection } from '../models/HeroSection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const heroSectionData = {
  title: "Discover Amazing Tools That Transform Your Workflow",
  subtitle: "Your Ultimate Tools Directory",
  description: "Explore our curated collection of powerful tools designed to boost productivity, enhance creativity, and streamline your work processes. From design utilities to development frameworks, find everything you need in one place.",
  primaryCTA: {
    text: "Explore Tools",
    url: "/tools",
    style: "primary" as const
  },
  secondaryCTA: {
    text: "Get Started",
    url: "/auth/register",
    style: "outline" as const
  },
  backgroundImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  stats: [
    {
      label: "Tools Available",
      value: "500+",
      description: "Curated tools across all categories"
    },
    {
      label: "Happy Users",
      value: "10K+",
      description: "Professionals using our platform"
    },
    {
      label: "Categories",
      value: "15+",
      description: "Different tool categories"
    },
    {
      label: "Updated Weekly",
      value: "24/7",
      description: "Fresh tools added regularly"
    }
  ],
  features: [
    {
      icon: "search",
      title: "Smart Discovery",
      description: "Find the perfect tool with our intelligent search and filtering system."
    },
    {
      icon: "bookmark",
      title: "Save Favorites",
      description: "Bookmark your favorite tools for quick access anytime."
    },
    {
      icon: "trending-up",
      title: "Trending Tools",
      description: "Stay updated with the latest and most popular tools in the market."
    },
    {
      icon: "users",
      title: "Community Driven",
      description: "Discover tools recommended by professionals like you."
    }
  ],
  isActive: true,
  version: "1.0.0"
};

async function seedHeroSection() {
  try {
    console.log('🔄 Starting hero section seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinitiflow';
    console.log('📡 Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully');

    // Check if hero section already exists
    console.log('🔍 Checking for existing hero sections...');
    const existingHero = await HeroSection.findOne({ isActive: true });
    
    if (existingHero) {
      console.log('⚠️ Active hero section already exists. Updating...');
      console.log('Existing hero title:', existingHero.title);
      
      const updatedHero = await HeroSection.findByIdAndUpdate(
        existingHero._id,
        heroSectionData,
        { new: true, runValidators: true }
      );
      
      console.log('✅ Hero section updated:', updatedHero?.title);
    } else {
      console.log('📝 Creating new hero section...');
      
      // Create new hero section
      const newHero = new HeroSection(heroSectionData);
      await newHero.save();
      
      console.log('✅ Hero section created:', newHero.title);
      console.log('📄 Hero ID:', newHero._id);
    }

    // Verify the data was saved
    console.log('🔍 Verifying saved data...');
    const allHeroSections = await HeroSection.find({});
    console.log('📊 Total hero sections in database:', allHeroSections.length);
    
    const activeHero = await HeroSection.findOne({ isActive: true });
    console.log('🎯 Active hero section:', activeHero ? activeHero.title : 'None found');

    console.log('🎉 Hero section seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding hero section:', error);
    throw error;
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('📪 MongoDB connection closed');
  }
}

// Run the seed function
seedHeroSection()
  .then(() => {
    console.log('✅ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  }); 