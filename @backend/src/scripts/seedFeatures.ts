import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { FeatureSection } from '../models/FeatureSection.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger();

// Features data based on current frontend content.ts
const featuresData = {
  sectionTitle: "Powerful features to transform your content workflow",
  sectionSubtitle: "transform",
  sectionDescription: "Our AI-powered platform helps you create, optimize, and manage content at scale.",
  badge: {
    text: "Supercharge Your Content",
    icon: "Zap"
  },
  features: [
    {
      title: "AI-Powered Content Creation",
      description: "Generate high-quality, engaging content in seconds with our advanced AI algorithms trained on diverse writing styles.",
      icon: "Sparkles",
      isVisible: true,
      order: 0
    },
    {
      title: "Smart Templates",
      description: "Choose from hundreds of pre-built templates for blogs, ads, social media, and more, or create your own custom templates.",
      icon: "LayoutTemplate",
      isVisible: true,
      order: 1
    },
    {
      title: "Multi-Language Support",
      description: "Create and translate content in over 50 languages, ensuring your message reaches a global audience effortlessly.",
      icon: "Globe",
      isVisible: true,
      order: 2
    },
    {
      title: "SEO Optimization",
      description: "Built-in SEO tools analyze and enhance your content for better search engine rankings and organic visibility.",
      icon: "Search",
      isVisible: true,
      order: 3
    },
    {
      title: "Content Repurposing",
      description: "Transform existing content into different formats and styles to maximize your content strategy efficiency.",
      icon: "Repeat",
      isVisible: true,
      order: 4
    }
  ],
  isActive: true,
  version: "1.0.0",
  maxFeatures: 6,
  displayMode: "grid" as const,
  theme: {
    showIcons: true,
    cardStyle: "default" as const,
    columns: 3
  }
};

async function seedFeatures() {
  try {
    logger.info('🌱 Starting Features Section seeding...');

    // Connect to database
    await connectDatabase();

    // Check if features section already exists
    const existingFeatures = await FeatureSection.findOne();
    
    if (existingFeatures) {
      logger.info('✅ Features section already exists. Skipping seed.');
      logger.info(`   Existing section: "${existingFeatures.sectionTitle}" (v${existingFeatures.version})`);
      logger.info(`   Features count: ${existingFeatures.features.length}`);
      logger.info(`   Active: ${existingFeatures.isActive}`);
      return;
    }

    // Create new features section
    const featuresSection = new FeatureSection(featuresData);
    await featuresSection.save();

    logger.info('🎉 Features section seeded successfully!');
    logger.info(`   Section: "${featuresSection.sectionTitle}"`);
    logger.info(`   Version: ${featuresSection.version}`);
    logger.info(`   Features: ${featuresSection.features.length} items`);
    logger.info(`   Display Mode: ${featuresSection.displayMode}`);
    logger.info(`   Active: ${featuresSection.isActive}`);
    logger.info('');
    logger.info('📋 Seeded Features:');
    featuresSection.features.forEach((feature, index) => {
      logger.info(`   ${index + 1}. ${feature.title} (${feature.icon})`);
    });

  } catch (error) {
    logger.error('❌ Features seeding failed:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    logger.info('📦 Database connection closed');
  }
}

// Handle different execution contexts
if (import.meta.url === `file://${process.argv[1]}`) {
  // Direct execution
  seedFeatures()
    .then(() => {
      logger.info('✅ Features seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('❌ Features seeding failed:', error);
      process.exit(1);
    });
}

export { seedFeatures, featuresData }; 