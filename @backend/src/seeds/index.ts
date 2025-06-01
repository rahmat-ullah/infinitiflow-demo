import { connectDatabase } from '../config/database.js';
import { seedTestimonials } from './testimonialSeeds.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger();

export const runSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    logger.info('🌱 Starting database seeding...');

    // Connect to database
    console.log('📡 Connecting to database...');
    logger.info('📡 Connecting to database...');
    await connectDatabase();
    console.log('✅ Database connected for seeding');
    logger.info('✅ Database connected for seeding');

    // Run testimonial seeding
    console.log('📝 Running testimonial seeding...');
    logger.info('📝 Running testimonial seeding...');
    const result = await seedTestimonials();
    console.log(`✅ Testimonial seeding completed. Created ${result.length} testimonials`);
    logger.info(`✅ Testimonial seeding completed. Created ${result.length} testimonials`);

    console.log('🎉 All seeders completed successfully');
    logger.info('🎉 All seeders completed successfully');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    logger.error('❌ Error running seeders:', error);
    throw error;
  }
};

// Run seeders if this file is executed directly
console.log('🔍 Checking if running directly...');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Running seeders...');
  runSeeders()
    .then(() => {
      console.log('🏁 Seeding completed. Exiting...');
      logger.info('🏁 Seeding completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      logger.error('💥 Seeding failed:', error);
      process.exit(1);
    });
} else {
  console.log('⏭️ Not running directly, skipping seeder execution');
} 