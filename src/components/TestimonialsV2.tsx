import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, Star, Play, Quote, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import { useFeaturedTestimonials } from '../hooks/useTestimonials';
import { Testimonial } from '../types/testimonials';

interface TestimonialsV2Props {
  onViewAllTestimonials?: () => void;
}

const TestimonialsV2: React.FC<TestimonialsV2Props> = ({ onViewAllTestimonials }) => {
  const { testimonials, loading, error } = useFeaturedTestimonials(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate testimonials (pause on hover)
  useEffect(() => {
    if (testimonials.length === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
            <p className="text-gray-600">Loading customer stories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Unable to load customer stories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.span
              className="inline-flex items-center bg-gradient-to-r from-primary-100 to-purple-100 text-primary-800 text-sm font-medium px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare size={16} className="mr-2" />
              Customer Stories
              <span className="ml-2 bg-primary-200 text-primary-900 text-xs px-2 py-1 rounded-full">
                {testimonials.length} Featured
              </span>
            </motion.span>
            
            <AnimatedTitle 
              text="Loved by creators worldwide"
              highlighted={["Loved"]}
              textSize="lg"
              className="text-center max-w-4xl mx-auto mb-6"
            />
            
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See how businesses across industries are transforming their content strategy with real results and measurable impact.
            </motion.p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-3">
                <TrendingUp size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">340%</div>
              <div className="text-sm text-gray-600">Avg ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-3">
                <Clock size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
          </motion.div>
        </div>
        
        {/* Main Testimonial Display */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Testimonial Cards */}
          <div className="relative min-h-[500px]">
            {testimonials.map((testimonial, idx) => (
              <ModernTestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={idx === activeIndex}
                index={idx}
              />
            ))}
          </div>
          
          {/* Enhanced Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Progress Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((testimonial, idx) => (
                <button
                  key={idx}
                  className={`group relative transition-all duration-300 ${
                    idx === activeIndex ? 'w-12' : 'w-3'
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className={`h-3 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500' 
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  }`} />
                  {idx === activeIndex && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
                      {testimonial.name}
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex space-x-2">
              <motion.button 
                onClick={handlePrev}
                className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
              </motion.button>
              <motion.button 
                onClick={handleNext}
                className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} className="text-gray-600 group-hover:text-gray-900" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllTestimonials}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">View All Success Stories</span>
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform relative" />
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">
            Join thousands of satisfied customers • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Modern Testimonial Card Component
interface ModernTestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  index: number;
}

const ModernTestimonialCard: React.FC<ModernTestimonialCardProps> = ({ testimonial, isActive, index }) => {
  return (
    <motion.div
      className={`absolute inset-0 transition-all duration-700 ease-out ${
        isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        y: isActive ? 0 : 50,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 h-full relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 opacity-60" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-primary-100 shadow-lg">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Status Badges */}
              <div className="absolute -bottom-2 -right-2 flex space-x-1">
                {testimonial.verified && (
                  <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                    <CheckCircle size={12} />
                  </div>
                )}
                {testimonial.videoUrl && (
                  <div className="bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                    <Play size={12} fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                  <p className="text-gray-600 font-medium">{testimonial.role}</p>
                  <p className="text-primary-600 font-semibold">{testimonial.company}</p>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-2 rounded-lg">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-1">5.0</span>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">{testimonial.industry}</span>
                <span>•</span>
                <span>{testimonial.location}</span>
                {testimonial.featured && (
                  <>
                    <span>•</span>
                    <span className="text-yellow-600 font-medium">⭐ Featured Story</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Quote */}
          <div className="relative mb-8">
            <Quote size={32} className="absolute -top-4 -left-2 text-primary-200" />
            <blockquote className="text-gray-700 text-lg leading-relaxed pl-8 font-medium italic">
              "{testimonial.quote}"
            </blockquote>
          </div>
          
          {/* Results Grid */}
          {testimonial.results && testimonial.results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {testimonial.results.slice(0, 3).map((result, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl text-center border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    {result.value}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{result.metric}</div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          {testimonial.tags && testimonial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {testimonial.tags.slice(0, 4).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsV2; 