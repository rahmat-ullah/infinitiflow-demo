import mongoose from 'mongoose';
import { HeroSection } from '../models/HeroSection.js';
import { createLogger } from '../utils/logger.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const logger = createLogger();

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
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinitiflow';
    await mongoose.connect(mongoUri);
    logger.info('✅ Connected to MongoDB for seeding');

    // Check if hero section already exists
    const existingHero = await HeroSection.findOne({ isActive: true });
    
    if (existingHero) {
      logger.info('⚠️ Active hero section already exists. Updating...');
      
      const updatedHero = await HeroSection.findByIdAndUpdate(
        existingHero._id,
        heroSectionData,
        { new: true, runValidators: true }
      );
      
      logger.info(`✅ Hero section updated: ${updatedHero?.title}`);
    } else {
      // Create new hero section
      const newHero = new HeroSection(heroSectionData);
      await newHero.save();
      
      logger.info(`✅ Hero section created: ${newHero.title}`);
    }

    logger.info('🎉 Hero section seeding completed successfully!');
    
  } catch (error) {
    logger.error('❌ Error seeding hero section:', error);
    throw error;
  } finally {
    // Close the connection
    await mongoose.connection.close();
    logger.info('📪 MongoDB connection closed');
  }
}

// Run the seed function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedHeroSection()
    .then(() => {
      logger.info('✅ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('❌ Seeding process failed:', error);
      process.exit(1);
    });
}

export { seedHeroSection }; 