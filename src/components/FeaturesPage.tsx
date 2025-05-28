import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Sparkles, 
  LayoutTemplate, 
  Globe, 
  Search, 
  Repeat, 
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Zap,
  ArrowRight,
  CheckCircle2,
  Brain,
  Wand2,
  Languages,
  TrendingUp,
  RefreshCw,
  Target
} from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  animation: React.ComponentType<any>;
  benefits: string[];
  color: string;
  gradient: string;
}

// Animated Components for each feature
const AIContentAnimation = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState('');
  const fullText = "AI-powered content creation transforms your ideas into engaging stories...";
  
  useEffect(() => {
    if (isTyping) {
      const timer = setInterval(() => {
        setText(prev => {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1);
          } else {
            setIsTyping(false);
            setTimeout(() => {
              setText('');
              setIsTyping(true);
            }, 2000);
            return prev;
          }
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isTyping, fullText]);

  return (
    <div className="bg-gradient-to-br from-[#e6e3ff] to-blue-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-[#020043]" size={20} />
        <span className="text-sm font-medium text-[#020043]">AI Writing Assistant</span>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="h-32 relative">
          <p className="text-gray-700 text-sm leading-relaxed">
            {text}
            <span className="animate-pulse text-[#020043]">|</span>
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex space-x-2">
            <motion.div 
              className="w-2 h-2 bg-[#020043] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.div 
              className="w-2 h-2 bg-[#020043] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
            />
            <motion.div 
              className="w-2 h-2 bg-[#020043] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
            />
          </div>
          <span className="text-xs text-gray-500">Writing...</span>
        </div>
      </div>
    </div>
  );
};

const SmartTemplatesAnimation = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const templates = ['Blog Post', 'Social Media', 'Email', 'Ad Copy'];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTemplate(prev => (prev + 1) % templates.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <LayoutTemplate className="text-green-600" size={20} />
        <span className="text-sm font-medium text-green-600">Smart Templates</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template, index) => (
          <motion.div
            key={template}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              activeTemplate === index
                ? 'border-green-400 bg-green-100 shadow-md'
                : 'border-gray-200 bg-white'
            }`}
            animate={{
              scale: activeTemplate === index ? 1.05 : 1,
              y: activeTemplate === index ? -2 : 0
            }}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                activeTemplate === index ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm font-medium">{template}</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              <div className="h-1 bg-gray-200 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MultiLanguageAnimation = () => {
  const [currentLang, setCurrentLang] = useState(0);
  const languages = [
    { code: 'EN', text: 'Hello World', flag: '🇺🇸' },
    { code: 'ES', text: 'Hola Mundo', flag: '🇪🇸' },
    { code: 'FR', text: 'Bonjour Monde', flag: '🇫🇷' },
    { code: 'DE', text: 'Hallo Welt', flag: '🇩🇪' },
    { code: 'JP', text: 'こんにちは世界', flag: '🇯🇵' }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLang(prev => (prev + 1) % languages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="text-blue-600" size={20} />
        <span className="text-sm font-medium text-blue-600">Multi-Language Support</span>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <motion.div
            key={currentLang}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="text-3xl mb-2">{languages[currentLang].flag}</div>
            <div className="text-lg font-semibold text-gray-800">
              {languages[currentLang].text}
            </div>
            <div className="text-sm text-gray-500">
              {languages[currentLang].code}
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center space-x-1 mt-4">
          {languages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentLang ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SEOOptimizationAnimation = () => {
  const [score, setScore] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsOptimizing(true);
      setTimeout(() => {
        setScore(prev => {
          const newScore = Math.min(prev + Math.random() * 20, 100);
          if (newScore >= 95) {
            setTimeout(() => {
              setScore(0);
              setIsOptimizing(false);
            }, 2000);
          }
          return newScore;
        });
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Search className="text-yellow-600" size={20} />
        <span className="text-sm font-medium text-yellow-600">SEO Optimization</span>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">SEO Score</span>
          <span className="text-2xl font-bold text-gray-800">{Math.round(score)}%</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.5 }}
          />
          {isOptimizing && (
            <motion.div
              className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-white opacity-50"
              animate={{ x: [-32, 200] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={14} className="text-green-500" />
            <span className="text-xs text-gray-600">Keywords optimized</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={14} className="text-green-500" />
            <span className="text-xs text-gray-600">Meta tags updated</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={14} className="text-green-500" />
            <span className="text-xs text-gray-600">Readability improved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentRepurposingAnimation = () => {
  const [isTransforming, setIsTransforming] = useState(false);
  
  const formats = {
    blog: { icon: '📝', name: 'Blog Post', color: 'bg-[#e6e3ff]' },
    social: { icon: '📱', name: 'Social Media', color: 'bg-pink-100' },
    email: { icon: '📧', name: 'Email', color: 'bg-green-100' },
    video: { icon: '🎥', name: 'Video Script', color: 'bg-[#e6e3ff]' }
  } as const;
  
  type FormatKey = keyof typeof formats;
  const [currentFormat, setCurrentFormat] = useState<FormatKey>('blog');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransforming(true);
      setTimeout(() => {
        const formatKeys = Object.keys(formats) as FormatKey[];
        const currentIndex = formatKeys.indexOf(currentFormat);
        const nextFormat = formatKeys[(currentIndex + 1) % formatKeys.length];
        setCurrentFormat(nextFormat);
        setIsTransforming(false);
      }, 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentFormat]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-[#e6e3ff] p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <RefreshCw className="text-pink-600" size={20} />
        <span className="text-sm font-medium text-pink-600">Content Repurposing</span>
      </div>
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📄</span>
            </div>
            <span className="text-xs font-medium">Original</span>
          </div>
          
          <motion.div
            animate={{ rotate: isTransforming ? 360 : 0 }}
            transition={{ duration: 1 }}
            className="text-pink-500"
          >
            <ArrowRight size={20} />
          </motion.div>
          
          <div className="text-center">
            <motion.div
              className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 ${formats[currentFormat].color}`}
              animate={{ scale: isTransforming ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl">{formats[currentFormat].icon}</span>
            </motion.div>
            <span className="text-xs font-medium">{formats[currentFormat].name}</span>
          </div>
        </div>
        
        {isTransforming && (
          <motion.div
            className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-pink-500"
            >
              <Wand2 size={24} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Content Creation",
    description: "Generate high-quality, engaging content in seconds with our advanced AI algorithms.",
    detailedDescription: "Our AI-powered content creation engine leverages state-of-the-art natural language processing models to understand context, tone, and style preferences. Whether you need blog posts, product descriptions, or creative copy, our AI adapts to your voice and brand guidelines to produce content that resonates with your audience.",
    icon: Brain,
    animation: AIContentAnimation,
    benefits: [
      "Generate content 10x faster than traditional methods",
      "Maintain consistent brand voice across all content",
      "Create content in multiple tones and styles",
      "Built-in fact-checking and accuracy validation",
      "Contextual understanding for better relevance"
    ],
    color: "text-[#020043]",
    gradient: "from-[#020043] to-pink-500"
  },
  {
    id: 2,
    title: "Smart Templates",
    description: "Choose from hundreds of pre-built templates for blogs, ads, social media, and more.",
    detailedDescription: "Our extensive template library covers every content type imaginable, from social media posts to comprehensive white papers. Each template is designed by content experts and powered by AI to ensure optimal performance. The smart template system learns from your preferences and suggests the most effective formats for your specific use cases.",
    icon: LayoutTemplate,
    animation: SmartTemplatesAnimation,
    benefits: [
      "300+ professionally designed templates",
      "Templates optimized for each platform",
      "Custom template creation tools",
      "Performance analytics for each template",
      "Industry-specific template collections"
    ],
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Multi-Language Support",
    description: "Create and translate content in over 50 languages with native-level fluency.",
    detailedDescription: "Break down language barriers with our comprehensive multi-language content creation and translation system. Our AI understands cultural nuances, idioms, and regional preferences to ensure your content feels native in every language. Perfect for global brands looking to scale their content strategy internationally.",
    icon: Languages,
    animation: MultiLanguageAnimation,
    benefits: [
      "Support for 50+ languages",
      "Cultural context awareness",
      "Real-time translation capabilities",
      "Regional dialect variations",
      "Localization for different markets"
    ],
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Automatically optimize your content for search engines with built-in SEO recommendations.",
    detailedDescription: "Maximize your content's visibility with our integrated SEO optimization suite. Our AI analyzes search trends, competitor content, and ranking factors to suggest improvements. From keyword density to meta descriptions, every aspect of your content is optimized for search engines while maintaining readability for humans.",
    icon: Target,
    animation: SEOOptimizationAnimation,
    benefits: [
      "Keyword research and optimization",
      "Competitive analysis insights",
      "Meta tag generation",
      "Content structure recommendations",
      "Performance tracking and analytics"
    ],
    color: "text-[#020043]",
    gradient: "from-[#020043] to-pink-500"
  },
  {
    id: 5,
    title: "Content Repurposing",
    description: "Transform your content across multiple formats and platforms with intelligent adaptation.",
    detailedDescription: "Maximize the value of your existing content by automatically transforming it into multiple formats. Turn a blog post into social media content, email newsletters, video scripts, or infographics. Our intelligent repurposing engine maintains the core message while adapting the format, tone, and structure for each specific platform.",
    icon: Repeat,
    animation: ContentRepurposingAnimation,
    benefits: [
      "One-click format transformation",
      "Platform-specific optimization",
      "Maintain brand consistency",
      "Increase content reach and engagement",
      "Save time and resources"
    ],
    color: "text-orange-600",
    gradient: "from-pink-500 to-[#020043]"
  }
];

interface FeaturesPageProps {
  onBackToHome?: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBackToHome }) => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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
              <Sparkles className="text-primary-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">Features Overview</h1>
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
              <Zap size={16} className="inline-block mr-2" />
              Powerful AI Features
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Content
              <span className="block bg-gradient-to-r from-primary-600 to-[#020043] bg-clip-text text-transparent">
                With AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how our cutting-edge AI features can revolutionize your content creation process, 
              boost productivity, and deliver exceptional results across all your content needs.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-24"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const AnimationComponent = feature.animation;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                {/* Animation Showcase */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl transform scale-105" 
                         style={{ background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', ', ')})` }} />
                    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="p-2">
                        <AnimationComponent />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
                      <p className="text-lg text-gray-600 mt-2">{feature.description}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {feature.detailedDescription}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-lg">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <motion.li
                          key={benefitIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: benefitIndex * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try This Feature
                    <ArrowRight size={16} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-[#020043] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of content creators who are already transforming their workflow with our AI-powered platform.
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
                  View Pricing
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage; 