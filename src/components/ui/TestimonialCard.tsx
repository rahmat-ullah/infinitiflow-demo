import React from 'react';
import { motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`bg-white p-6 md:p-8 rounded-xl shadow-card transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <QuoteIcon size={32} className="absolute -top-2 -left-2 text-primary-200" />
        <p className="text-gray-700 text-lg italic pt-6 mb-6 relative z-10">{testimonial.quote}</p>
        <div className="flex items-center">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;