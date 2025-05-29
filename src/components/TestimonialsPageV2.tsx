import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  MessageSquare, 
  ChevronLeft, 
  Play, 
  Pause, 
  Star, 
  Quote, 
  Heart, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2,
  ArrowRight,
  Filter,
  Building,
  MapPin,
  Calendar,
  Volume2,
  VolumeX,
  Eye
} from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';
import { Testimonial, CustomerMetric } from '../types/testimonials';

interface TestimonialsPageV2Props {
  onBackToHome?: () => void;
}

const TestimonialsPageV2: React.FC<TestimonialsPageV2Props> = ({ onBackToHome }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  // Get all testimonials and customer metrics from backend
  const { 
    testimonials, 
    customerMetrics, 
    filters, 
    loading, 
    error 
  } = useTestimonials({ limit: 50 }); // Get more testimonials for filtering

  // Create industries array from filters or fallback
  const industries = filters?.industries?.map(i => i.label) || [
    'Technology', 'Media & Entertainment', 'Business Services', 'E-commerce', 'Healthcare', 'Marketing Agency'
  ];
  const allIndustries = ['all', ...industries];

  const filteredTestimonials = selectedFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.industry === selectedFilter);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (filteredTestimonials.length > 0) {
        setSelectedTestimonial(prev => (prev + 1) % filteredTestimonials.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [filteredTestimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const VideoTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.button
            className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          >
            {isVideoPlaying ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </motion.button>
        </div>
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <h3 className="text-white font-semibold text-lg mb-1">{testimonial.name}</h3>
          <p className="text-white/80 text-sm">{testimonial.role} at {testimonial.company}</p>
        </div>
        <button
          className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-colors"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <VolumeX size={16} className="text-white" />
          ) : (
            <Volume2 size={16} className="text-white" />
          )}
        </button>
      </div>
    );
  };

  const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
    return (
      <motion.div
        className={`absolute inset-0 transition-all duration-500 ${
          isActive ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-full">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-100"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{testimonial.role}</p>
              <p className="text-primary-600 text-sm font-medium">{testimonial.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <Building size={12} className="mr-1" />
                  {testimonial.industry}
                </span>
                <span className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  {testimonial.location}
                </span>
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative mb-6">
            <Quote size={24} className="text-primary-200 absolute -top-2 -left-2" />
            <p className="text-gray-700 leading-relaxed pl-6">{testimonial.quote}</p>
          </div>
          
          {testimonial.results && testimonial.results.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {testimonial.results.slice(0, 3).map((result, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{result.value}</div>
                  <div className="text-xs text-gray-600">{result.metric}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const InteractiveSuccessCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500 ease-out"
          whileHover={{ 
            y: -8, 
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" 
          }}
          layout
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Main Content */}
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary-100 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute -bottom-1 -right-1 flex space-x-1">
                    {testimonial.verified && (
                      <motion.div 
                        className="bg-green-500 text-white rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <CheckCircle2 size={8} />
                      </motion.div>
                    )}
                    {testimonial.videoUrl && (
                      <motion.div 
                        className="bg-red-500 text-white rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Play size={8} fill="currentColor" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{testimonial.role}</p>
                  <p className="text-sm text-primary-600 font-semibold">{testimonial.company}</p>
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex flex-col space-y-1">
                {testimonial.featured && (
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}
                {testimonial.videoUrl && (
                  <motion.div 
                    className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Play size={10} className="mr-1" />
                    Video
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-current" />
                  </motion.div>
                ))}
                <span className="text-sm font-medium text-gray-600 ml-2">
                  {testimonial.rating}/5
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">{testimonial.industry}</span>
              </div>
            </div>
            
            {/* Quote */}
            <div className="relative mb-4">
              <Quote size={20} className="absolute -top-2 -left-1 text-primary-200" />
              <motion.p
                className={`text-gray-700 leading-relaxed pl-6 transition-all duration-300 ${
                  isExpanded ? '' : 'line-clamp-3'
                }`}
                layout
              >
                "{testimonial.quote}"
              </motion.p>
              
              {/* Expand/Collapse Button */}
              {testimonial.quote.length > 120 && (
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </motion.button>
              )}
            </div>
            
            {/* Results */}
            {testimonial.results && testimonial.results.length > 0 && (
              <motion.div 
                className="mb-4"
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  {testimonial.results.slice(0, 2).map((result, resultIndex) => (
                    <motion.div
                      key={resultIndex}
                      className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: resultIndex * 0.1 }}
                    >
                      <div className="text-lg font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                        {result.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{result.metric}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Tags */}
            {testimonial.tags && testimonial.tags.length > 0 && isExpanded && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {testimonial.tags.slice(0, 3).map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tagIndex * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MapPin size={12} />
                <span>{testimonial.location}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Less details' : 'More details'}
                </motion.button>
                
                {testimonial.videoUrl && (
                  <motion.button
                    className="flex items-center space-x-1 bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs hover:bg-red-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={10} />
                    <span>Watch</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
          
          {/* Hover Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
        
        {/* Floating Action Button */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <button className="bg-white text-primary-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Eye size={16} />
          </button>
        </motion.div>
      </motion.div>
    );
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading testimonials: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <MessageSquare className="text-primary-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">Customer Success Stories</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Heart size={16} className="inline-block mr-2" />
              Loved by {customerMetrics.find(m => m.title === 'Active Users')?.value || '50,000+'} Creators
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stories of Success
              <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                From Real Customers
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how businesses across industries are transforming their content strategy 
              with InfinitiFlow. Real results, real impact, real success.
            </p>
          </motion.div>
        </div>

        {/* Customer Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {customerMetrics.slice(0, 4).map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                {metric.category === 'users' && <Users size={24} className="text-white" />}
                {metric.category === 'content' && <MessageSquare size={24} className="text-white" />}
                {metric.category === 'satisfaction' && <Heart size={24} className="text-white" />}
                {metric.category === 'awards' && <Award size={24} className="text-white" />}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allIndustries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === industry
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {industry === 'all' ? 'All Industries' : industry}
            </button>
          ))}
        </div>

        {/* Featured Video Testimonials */}
        {testimonials.filter(t => t.videoUrl).length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Video Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.filter(t => t.videoUrl).slice(0, 2).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <VideoTestimonial testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Testimonial Carousel */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Customer Testimonials</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96">
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === selectedTestimonial}
                />
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedTestimonial
                        ? 'w-8 bg-primary-500'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {selectedTestimonial + 1} of {filteredTestimonials.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTestimonial(prev => 
                      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
                    )}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedTestimonial(prev => 
                      (prev + 1) % filteredTestimonials.length
                    )}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our customers are achieving remarkable results with InfinitiFlow
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle2 size={16} className="text-green-500 mr-1" />
                {filteredTestimonials.length} success stories
              </span>
              <span>•</span>
              <span className="flex items-center">
                <TrendingUp size={16} className="text-blue-500 mr-1" />
                Verified results
              </span>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTestimonials.map((testimonial, index) => (
              <InteractiveSuccessCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </motion.div>

          {/* Load More Button for Large Datasets */}
          {filteredTestimonials.length >= 9 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Stories
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Start your journey with InfinitiFlow today and become our next success story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPageV2; 