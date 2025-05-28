import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import TestimonialCard from './ui/TestimonialCard';
import AnimatedTitle from './ui/AnimatedTitle';
import { testimonials } from '../data/content';

interface TestimonialsProps {
  onViewAllTestimonials?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onViewAllTestimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4"
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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                  key={testimonial.id}
                  testimonial={testimonial}
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
                        ? 'w-8 bg-primary-500' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllTestimonials}
          >
            <span>View All Success Stories</span>
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-sm text-gray-500 mt-3">
            Discover detailed customer journeys and video testimonials
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;