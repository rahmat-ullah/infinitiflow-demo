import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';
import { testimonialSeeds } from './testimonialSeeds.js';

const fixCollection = async () => {
  try {
    console.log('🔧 Fixing testimonials collection...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinitiflow';
    console.log('📡 Connecting to:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Drop the entire collection to clear all indexes
    console.log('🗑️ Dropping testimonials collection...');
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection('testimonials').drop().catch(() => {
        console.log('Collection may not exist, continuing...');
      });
    }
    
    // Now create testimonials using the model (this will create proper indexes)
    console.log('📝 Creating testimonials with proper schema...');
    const created = await Testimonial.insertMany(testimonialSeeds);
    console.log(`✅ Successfully created ${created.length} testimonials`);
    
    // Verify the data
    const count = await Testimonial.countDocuments();
    const featured = await Testimonial.countDocuments({ featured: true });
    console.log(`📊 Verification: ${count} total, ${featured} featured`);
    
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    console.log('🎉 Collection fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixCollection(); 