import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import TestimonialCard from './ui/TestimonialCard';
import AnimatedTitle from './ui/AnimatedTitle';
import { testimonialsApi, type Testimonial } from '../services/testimonialsApi';

interface TestimonialsProps {
  onViewAllTestimonials?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onViewAllTestimonials }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('🔍 Fetching testimonials from API...');
        
        // First, test the backend connection
        try {
          const healthResponse = await fetch('http://localhost:3001/health');
          const healthData = await healthResponse.json();
          console.log('🏥 Backend health check:', healthData);
        } catch (healthError) {
          console.error('💔 Backend health check failed:', healthError);
        }
        
        setLoading(true);
        const response = await testimonialsApi.getFeaturedTestimonials(6); // Get more for rotation
        console.log('📡 API Response:', response);
        if (response.success) {
          console.log('✅ Testimonials loaded:', response.data.length);
          setTestimonials(response.data);
        } else {
          console.error('❌ API returned success: false');
          setError('Failed to load testimonials');
        }
      } catch (err) {
        console.error('💥 Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Convert API testimonial to component format
  const convertTestimonial = (testimonial: Testimonial, index: number) => ({
    id: index + 1, // Use index as numeric id
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    quote: testimonial.quote,
    image: testimonial.image
  });

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {error || 'No testimonials available at the moment.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-secondary-800 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare size={16} className="inline-block mr-1" />
            Customer Stories
          </motion.span>
          
          <AnimatedTitle 
            text="Trusted by content creators worldwide"
            highlighted={["Trusted"]}
            textSize="lg"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See how our AI content platform is helping businesses transform their content strategy.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="relative h-80 sm:h-64">
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={convertTestimonial(testimonial, idx)}
                  isActive={idx === activeIndex}
                />
              ))}
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'w-8 bg-primary-500 dark:bg-primary-400' 
                        : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Testimonials Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-500 dark:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllTestimonials}
          >
            <span>View All Success Stories</span>
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Discover detailed customer journeys and video testimonials
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;