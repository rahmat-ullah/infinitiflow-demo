import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, BookOpen, TrendingUp, Tag, ExternalLink, Filter, Sparkles, CheckCircle } from 'lucide-react';

const ContentSuggestionsAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'generating' | 'searching' | 'results'>('analyzing');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [activeResult, setActiveResult] = useState<number | null>(null);
  const [searchProgress, setSearchProgress] = useState(0);

  const searchSources = [
    { name: 'Google', icon: Globe, color: 'bg-blue-500', progress: 0 },
    { name: 'Academic', icon: BookOpen, color: 'bg-green-500', progress: 0 },
    { name: 'News', icon: TrendingUp, color: 'bg-red-500', progress: 0 },
    { name: 'Industry', icon: Search, color: 'bg-purple-500', progress: 0 }
  ];

  const categories = [
    { id: 'all', label: 'All Results', count: 12, color: 'bg-gray-500' },
    { id: 'research', label: 'Research', count: 4, color: 'bg-blue-500' },
    { id: 'trends', label: 'Trends', count: 3, color: 'bg-green-500' },
    { id: 'guides', label: 'Guides', count: 3, color: 'bg-purple-500' },
    { id: 'tools', label: 'Tools', count: 2, color: 'bg-orange-500' }
  ];

  const searchResults = [
    {
      id: 1,
      title: "AI Content Creation Trends 2024",
      source: "TechCrunch",
      category: "trends",
      tags: ["AI", "Content", "Marketing"],
      relevance: 95,
      snippet: "Latest developments in AI-powered content generation..."
    },
    {
      id: 2,
      title: "Complete Guide to Content Strategy",
      source: "HubSpot",
      category: "guides",
      tags: ["Strategy", "Planning", "SEO"],
      relevance: 92,
      snippet: "Comprehensive guide covering content planning methodologies..."
    },
    {
      id: 3,
      title: "Content Marketing Research Study",
      source: "Content Marketing Institute",
      category: "research",
      tags: ["Research", "Statistics", "ROI"],
      relevance: 88,
      snippet: "Annual research revealing key insights about content marketing..."
    },
    {
      id: 4,
      title: "Top Content Creation Tools",
      source: "ProductHunt",
      category: "tools",
      tags: ["Tools", "Software", "Productivity"],
      relevance: 85,
      snippet: "Curated list of the best content creation and management tools..."
    }
  ];

  const generatedQueries = [
    "AI content creation best practices",
    "Content marketing strategy 2024",
    "Automated content generation tools",
    "Content optimization techniques"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('generating'), 2000);
    const timer2 = setTimeout(() => setCurrentStep('searching'), 4000);
    const timer3 = setTimeout(() => setCurrentStep('results'), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'searching') {
      const interval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const withoutAll = prev.filter(id => id !== 'all');
        if (withoutAll.includes(categoryId)) {
          const newSelection = withoutAll.filter(id => id !== categoryId);
          return newSelection.length === 0 ? ['all'] : newSelection;
        } else {
          return [...withoutAll, categoryId];
        }
      });
    }
  };

  const filteredResults = selectedCategories.includes('all') 
    ? searchResults 
    : searchResults.filter(result => selectedCategories.includes(result.category));

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-emerald-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Document Analysis Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-40 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Content Analysis</span>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="text-xs text-gray-600 leading-relaxed">
            "AI-powered content creation for modern marketing strategies..."
          </div>
          
          {/* Key Topics Extracted */}
          <div className="space-y-1">
            <div className="text-xs text-gray-500">Key Topics:</div>
            {['AI Content', 'Marketing', 'Strategy', 'Automation'].map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mr-1"
              >
                {topic}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Analysis Phase */}
      <AnimatePresence>
        {currentStep === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50"
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
              >
                <Sparkles className="w-8 h-8 text-green-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Content...</div>
              <div className="space-y-2 w-32">
                {['Topics', 'Keywords', 'Context'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.4, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Query Generation Phase */}
      <AnimatePresence>
        {currentStep === 'generating' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-44 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">Generated Queries</span>
            </div>

            <div className="space-y-2">
              {generatedQueries.map((query, i) => (
                <motion.div
                  key={query}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <Search className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-700 leading-relaxed">{query}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-Source Searching Phase */}
      <AnimatePresence>
        {currentStep === 'searching' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50"
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Globe className="w-8 h-8 text-green-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Searching Multiple Sources...</div>
              
              <div className="space-y-2 w-48">
                {searchSources.map((source, i) => {
                  const Icon = source.icon;
                  const progress = Math.min(searchProgress - (i * 25), 100);
                  
                  return (
                    <motion.div
                      key={source.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-600 w-16">{source.name}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(0, progress)}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-1.5 rounded-full ${source.color}`}
                        />
                      </div>
                      {progress >= 100 && (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Panel */}
      <AnimatePresence>
        {currentStep === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
          >
            {/* Categories Filter */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-700">Content Suggestions</span>
                <span className="text-xs text-gray-500 ml-auto">{filteredResults.length} results</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {categories.map((category, i) => {
                  const isSelected = selectedCategories.includes(category.id);
                  
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? `${category.color} text-white shadow-lg scale-105`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category.label} ({category.count})
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Results List */}
            <div className="p-3 space-y-2 max-h-32 overflow-y-auto">
              {filteredResults.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeResult === result.id ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onMouseEnter={() => setActiveResult(result.id)}
                  onMouseLeave={() => setActiveResult(null)}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-800 line-clamp-1">
                          {result.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                        <div className="ml-auto flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">{result.relevance}%</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-1">{result.snippet}</div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{result.source}</span>
                        <div className="flex gap-1">
                          {result.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-gray-200 text-gray-600 text-xs px-1 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Research Particles */}
      {currentStep === 'results' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
                x: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 6,
              }}
              style={{
                left: `${30 + i * 10}%`,
                top: `80%`,
              }}
            >
              {['🔍', '📊', '📚', '💡', '🎯', '📈'][i]}
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'results' ? 1 : 0, 
          opacity: currentStep === 'results' ? 0.3 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-28 left-44 w-20 h-16"
        viewBox="0 0 80 64"
      >
        <motion.path
          d="M 0 32 Q 40 16 80 32"
          stroke="url(#suggestGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
        <defs>
          <linearGradient id="suggestGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default ContentSuggestionsAnimation; 