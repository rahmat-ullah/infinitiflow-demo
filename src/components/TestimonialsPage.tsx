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
  VolumeX
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
  industry: string;
  location: string;
  date: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  videoUrl?: string;
  featured?: boolean;
}

interface CustomerMetric {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

// Extended testimonials data with more comprehensive information
const extendedTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    quote: "InfinitiFlow has completely transformed our content strategy. The AI-generated content is so natural and engaging that our audience engagement has skyrocketed. We've reduced our content creation time by 85% while maintaining the highest quality standards.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "Technology",
    location: "San Francisco, CA",
    date: "December 2023",
    results: [
      { metric: "Content Output", value: "300%", improvement: "increase" },
      { metric: "Time Saved", value: "85%", improvement: "reduction" },
      { metric: "Engagement", value: "250%", improvement: "increase" }
    ],
    featured: true
  },
  {
    id: 2,
    name: "David Chen",
    role: "Content Strategist",
    company: "MediaPulse",
    quote: "The ROI has been incredible. We've cut our content production costs by 60% while doubling our engagement metrics across all channels. The multi-language support helped us expand globally with minimal effort.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "Media & Entertainment",
    location: "New York, NY",
    date: "November 2023",
    results: [
      { metric: "Cost Reduction", value: "60%", improvement: "reduction" },
      { metric: "Global Reach", value: "12", improvement: "new markets" },
      { metric: "Content Quality", value: "95%", improvement: "approval rate" }
    ],
    videoUrl: "#"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "CEO",
    company: "Startup Accelerate",
    quote: "As a startup founder, I needed a solution that could scale with us. InfinitiFlow delivers enterprise-quality content without the enterprise price tag. It's like having a team of expert writers at a fraction of the cost.",
    image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "Business Services",
    location: "Austin, TX",
    date: "October 2023",
    results: [
      { metric: "Team Efficiency", value: "400%", improvement: "increase" },
      { metric: "Monthly Savings", value: "$15K", improvement: "cost reduction" },
      { metric: "Content Volume", value: "500%", improvement: "increase" }
    ],
    featured: true
  },
  {
    id: 4,
    name: "Michael Park",
    role: "Digital Marketing Manager",
    company: "E-commerce Solutions",
    quote: "The content repurposing feature is a game-changer. We can now create blog posts, social media content, email campaigns, and product descriptions from a single input. Our workflow has never been more efficient.",
    image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "E-commerce",
    location: "Seattle, WA",
    date: "December 2023",
    results: [
      { metric: "Workflow Efficiency", value: "350%", improvement: "increase" },
      { metric: "Channel Coverage", value: "8", improvement: "platforms" },
      { metric: "Conversion Rate", value: "45%", improvement: "increase" }
    ]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Head of Content",
    company: "Healthcare Innovations",
    quote: "The AI understands our industry's compliance requirements perfectly. We can generate accurate, professional healthcare content that meets all regulatory standards while being engaging for our patients.",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "Healthcare",
    location: "Boston, MA",
    date: "November 2023",
    results: [
      { metric: "Compliance Score", value: "100%", improvement: "maintained" },
      { metric: "Patient Engagement", value: "180%", improvement: "increase" },
      { metric: "Content Accuracy", value: "98%", improvement: "rating" }
    ]
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Founder",
    company: "Digital Agency Pro",
    quote: "We use InfinitiFlow for all our client projects. The quality is consistently high, and the turnaround time is incredible. Our clients are amazed by the results we deliver.",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    industry: "Marketing Agency",
    location: "Miami, FL",
    date: "December 2023",
    results: [
      { metric: "Client Satisfaction", value: "96%", improvement: "rating" },
      { metric: "Project Delivery", value: "75%", improvement: "faster" },
      { metric: "Revenue Growth", value: "200%", improvement: "increase" }
    ]
  }
];

const customerMetrics: CustomerMetric[] = [
  {
    id: 1,
    title: "Active Users",
    value: "50,000+",
    description: "Content creators worldwide",
    icon: Users,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Content Generated",
    value: "10M+",
    description: "Pieces of content created",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Customer Satisfaction",
    value: "98%",
    description: "Positive feedback rate",
    icon: Heart,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 4,
    title: "Awards Won",
    value: "15+",
    description: "Industry recognitions",
    icon: Award,
    color: "from-purple-500 to-violet-500"
  }
];

interface TestimonialsPageProps {
  onBackToHome?: () => void;
}

const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onBackToHome }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  const industries = ['all', 'Technology', 'Media & Entertainment', 'Business Services', 'E-commerce', 'Healthcare', 'Marketing Agency'];

  const filteredTestimonials = selectedFilter === 'all' 
    ? extendedTestimonials 
    : extendedTestimonials.filter(t => t.industry === selectedFilter);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedTestimonial(prev => (prev + 1) % filteredTestimonials.length);
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
            className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
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
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl border border-gray-100 dark:border-secondary-700 p-8 h-full">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-100 dark:ring-primary-800"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" /> /* Yellow star should be fine */
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
              <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{testimonial.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
                  {testimonial.date}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative mb-6">
            <Quote size={24} className="text-primary-200 dark:text-primary-700 absolute -top-2 -left-2" />
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed pl-6">{testimonial.quote}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {testimonial.results.map((result, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-secondary-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{result.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{result.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // The return statement for TestimonialsPage starts here.
  // The changes for page background and the inline PageHeader are already applied in previous steps.
  // Now focusing on the Carousel and its navigation.

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-900">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-900 shadow-sm border-b border-gray-100 dark:border-secondary-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <MessageSquare className="text-primary-600 dark:text-primary-400" size={24} />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Customer Testimonials</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Success Stories from Our
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent block">
              Amazing Customers
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover how businesses worldwide are transforming their content strategy with InfinitiFlow. 
            Real results, real impact, real success stories.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center">
              <CheckCircle2 size={16} className="mr-2 text-green-500" />
              50,000+ Happy Customers
            </div>
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-2 text-blue-500" />
              98% Customer Satisfaction
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-2 text-purple-500" />
              15+ Industry Awards
            </div>
          </motion.div>
        </div>

        {/* Customer Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 mt-16"
        >
          {customerMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.id}
                variants={itemVariants}
                className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-secondary-700 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{metric.value}</h3>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{metric.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedFilter(industry)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                selectedFilter === industry
                  ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              <Filter size={14} className="inline-block mr-1" />
              {industry.charAt(0).toUpperCase() + industry.slice(1)}
            </button>
          ))}
        </div>

        {/* Featured Video Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extendedTestimonials.filter(t => t.videoUrl).slice(0, 3).map((testimonial) => (
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

        {/* Interactive Testimonial Carousel */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">Customer Testimonials</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96"> {/* Adjust height as needed */}
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard // This is the inline TestimonialCard, already styled by this diff
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
                        ? 'w-8 bg-primary-500 dark:bg-primary-400'
                        : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTestimonial + 1} of {filteredTestimonials.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTestimonial(prev => 
                      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
                    )}
                    className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedTestimonial(prev => 
                      (prev + 1) % filteredTestimonials.length
                    )}
                    className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-secondary-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">All Success Stories</h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-gray-100 dark:border-secondary-700 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.company}</p>
                </div>
                {testimonial.featured && (
                  <div className="bg-yellow-100 dark:bg-yellow-700 dark:bg-opacity-30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{testimonial.industry}</span>
                <span>{testimonial.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section (already determined to not need changes) */}
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
  );
};

export default TestimonialsPage; 