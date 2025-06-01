import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, Filter, Globe, DollarSign, Clock, MapPin, Target, CheckCircle, ExternalLink, Zap } from 'lucide-react';

const RFPFinderAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'filtering' | 'searching' | 'complete'>('analyzing');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['technology', 'enterprise']);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [foundOpportunities, setFoundOpportunities] = useState<any[]>([]);
  const [searchMetrics, setSearchMetrics] = useState({
    totalOpportunities: 0,
    relevantMatches: 0,
    averageValue: 0,
    avgRelevance: 0
  });

  const sourceDocument = "Request for cloud infrastructure modernization services including container orchestration, microservices architecture, CI/CD pipeline implementation, and 24/7 monitoring solutions for enterprise-grade applications with 99.9% uptime requirements.";

  const filterCategories = [
    { 
      id: 'technology', 
      label: 'Technology', 
      icon: '💻',
      color: 'bg-purple-500',
      description: 'IT & software projects'
    },
    { 
      id: 'enterprise', 
      label: 'Enterprise', 
      icon: '🏢',
      color: 'bg-blue-500',
      description: 'Large-scale implementations'
    },
    { 
      id: 'cloud', 
      label: 'Cloud Services', 
      icon: '☁️',
      color: 'bg-cyan-500',
      description: 'Cloud & infrastructure'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: '🔒',
      color: 'bg-red-500',
      description: 'Cybersecurity projects'
    },
    { 
      id: 'consulting', 
      label: 'Consulting', 
      icon: '🎯',
      color: 'bg-green-500',
      description: 'Professional services'
    },
    { 
      id: 'integration', 
      label: 'Integration', 
      icon: '🔗',
      color: 'bg-orange-500',
      description: 'System integration'
    }
  ];

  const allOpportunities = [
    {
      id: 1,
      title: 'Cloud Infrastructure Modernization',
      organization: 'State Department of Technology',
      value: '$2.5M',
      deadline: '45 days',
      location: 'California, USA',
      relevance: 95,
      type: 'RFP',
      category: 'technology',
      description: 'Comprehensive cloud migration and container orchestration platform'
    },
    {
      id: 2,
      title: 'Enterprise DevOps Implementation',
      organization: 'Global Financial Corp',
      value: '$1.8M',
      deadline: '30 days',
      location: 'New York, USA',
      relevance: 92,
      type: 'RFQ',
      category: 'enterprise',
      description: 'CI/CD pipeline and automated deployment infrastructure'
    },
    {
      id: 3,
      title: 'Microservices Architecture Design',
      organization: 'Healthcare Innovation Ltd',
      value: '$3.2M',
      deadline: '60 days',
      location: 'London, UK',
      relevance: 88,
      type: 'RFP',
      category: 'cloud',
      description: 'Modern application architecture with monitoring solutions'
    },
    {
      id: 4,
      title: 'Digital Transformation Consulting',
      organization: 'Manufacturing Alliance',
      value: '$950K',
      deadline: '21 days',
      location: 'Toronto, Canada',
      relevance: 85,
      type: 'RFP',
      category: 'consulting',
      description: 'Technology strategy and implementation roadmap'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('filtering'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('searching'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9500);

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
          const newProgress = prev + 2.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const filteredOpportunities = allOpportunities.filter(opp => 
        selectedFilters.includes(opp.category)
      );
      
      setFoundOpportunities(filteredOpportunities);

      const metricsInterval = setInterval(() => {
        setSearchMetrics(prev => {
          const totalValue = filteredOpportunities.reduce((sum, opp) => 
            sum + parseFloat(opp.value.replace(/[$MK,]/g, '')) * (opp.value.includes('M') ? 1000000 : 1000), 0
          );
          const avgValue = totalValue / filteredOpportunities.length;
          const avgRelevance = filteredOpportunities.reduce((sum, opp) => sum + opp.relevance, 0) / filteredOpportunities.length;
          
          return {
            totalOpportunities: Math.min(prev.totalOpportunities + 1, filteredOpportunities.length),
            relevantMatches: Math.min(prev.relevantMatches + 1, filteredOpportunities.filter(o => o.relevance >= 90).length),
            averageValue: Math.min(prev.averageValue + 50000, avgValue),
            avgRelevance: Math.min(prev.avgRelevance + 3, avgRelevance)
          };
        });
      }, 300);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedFilters]);

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const getFilterById = (id: string) => {
    return filterCategories.find(filter => filter.id === id);
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'bg-green-500 text-white';
    if (relevance >= 80) return 'bg-blue-500 text-white';
    if (relevance >= 70) return 'bg-yellow-500 text-black';
    return 'bg-gray-500 text-white';
  };

  const getTypeColor = (type: string) => {
    return type === 'RFP' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 to-violet-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Document Analysis Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-gray-700">Source Document</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
            {sourceDocument}
          </div>
          
          {/* Document Stats */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Keywords:</span>
                <span className="text-xs font-medium text-gray-800">12 identified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Match Type:</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                  Technology
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Document Analysis Phase */}
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
                <Search className="w-8 h-8 text-purple-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Requirements...</div>
              <div className="space-y-2 w-32">
                {['Keywords Extraction', 'Industry Classification', 'Value Estimation'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-purple-400 to-violet-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Selection */}
      <AnimatePresence>
        {currentStep === 'filtering' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700">Search Filters</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filterCategories.map((filter, i) => {
                const isSelected = selectedFilters.includes(filter.id);
                
                return (
                  <motion.button
                    key={filter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleFilterToggle(filter.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${filter.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{filter.icon}</span>
                        <span className="text-xs font-medium">{filter.label}</span>
                      </div>
                      <div className={`w-3 h-3 rounded border-2 ${
                        isSelected 
                          ? 'bg-white border-white' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-full h-full text-current" />}
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {filter.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Progress */}
      <AnimatePresence>
        {currentStep === 'searching' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-purple-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Searching Opportunities</div>
                <div className="text-xs text-gray-500">🔍 Scanning {selectedFilters.length} categories across platforms...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{searchProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-violet-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${searchProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Search Sources */}
              <div className="space-y-2">
                {['Government Portals', 'Private Procurement', 'Industry Networks', 'Global Tenders'].map((source, i) => (
                  <motion.div
                    key={source}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: searchProgress > i * 25 ? 1 : 0.3,
                      x: searchProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {searchProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={searchProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {source}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
          >
            {/* Result Controls */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">Opportunities Found</span>
                  <span className="text-xs px-2 py-1 rounded bg-purple-500 text-white">
                    {searchMetrics.totalOpportunities} matches
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowResults(!showResults)}
                    className="bg-purple-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-purple-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showResults ? 'Metrics' : 'Results'}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-3 max-h-28 overflow-auto">
              <AnimatePresence mode="wait">
                {!showResults ? (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Search Metrics */}
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Found</div>
                        <div className="text-xs font-bold text-purple-600">
                          {searchMetrics.totalOpportunities}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">High Match</div>
                        <div className="text-xs font-bold text-green-600">
                          {searchMetrics.relevantMatches}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Avg Value</div>
                        <div className="text-xs font-bold text-blue-600">
                          {formatValue(searchMetrics.averageValue)}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Relevance</div>
                        <div className="text-xs font-bold text-orange-600">
                          {searchMetrics.avgRelevance.toFixed(0)}%
                        </div>
                      </motion.div>
                    </div>

                    {/* Top Opportunities Preview */}
                    <div className="space-y-1">
                      {foundOpportunities.slice(0, 2).map((opp, i) => (
                        <motion.div
                          key={opp.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-purple-50 rounded-lg p-2"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-purple-700">{opp.title}</span>
                            <div className="flex gap-1">
                              <span className={`text-xs px-1 py-0.5 rounded ${getTypeColor(opp.type)}`}>
                                {opp.type}
                              </span>
                              <span className={`text-xs px-1 py-0.5 rounded ${getRelevanceColor(opp.relevance)}`}>
                                {opp.relevance}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-2 h-2" />
                              <span>{opp.value}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-2 h-2" />
                              <span>{opp.deadline}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {foundOpportunities.map((opp, i) => (
                      <motion.div
                        key={opp.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{getFilterById(opp.category)?.icon}</span>
                            <span className="text-xs font-medium text-gray-800">{opp.title}</span>
                          </div>
                          <div className="flex gap-1">
                            <span className={`text-xs px-1 py-0.5 rounded ${getTypeColor(opp.type)}`}>
                              {opp.type}
                            </span>
                            <span className={`text-xs px-1 py-0.5 rounded ${getRelevanceColor(opp.relevance)}`}>
                              {opp.relevance}%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {opp.organization}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-2 h-2" />
                            <span>{opp.value}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-2 h-2" />
                            <span>{opp.deadline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-2 h-2" />
                            <span>{opp.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Indicator */}
      {currentStep === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-lg"
        >
          <Building2 className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Procurement Particles */}
      {currentStep === 'complete' && (
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
                duration: 3.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              style={{
                left: `${25 + i * 10}%`,
                top: `75%`,
              }}
            >
              {['🏢', '📄', '💼', '🎯', '🌐', '💰'][i]}
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'complete' ? 1 : 0, 
          opacity: currentStep === 'complete' ? 0.3 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-28 left-48 w-16 h-12"
        viewBox="0 0 64 48"
      >
        <motion.path
          d="M 0 24 Q 32 12 64 24"
          stroke="url(#rfpGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="rfpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default RFPFinderAnimation; 