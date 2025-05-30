import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Search, BookOpen, CheckCircle, AlertTriangle, Eye, Target, Zap, FileText, Brain } from 'lucide-react';

const AcronymManagerAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'scanning' | 'detecting' | 'managing' | 'complete'>('scanning');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['technical', 'business', 'medical']);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [selectedAcronym, setSelectedAcronym] = useState<any>(null);
  const [detectedAcronyms, setDetectedAcronyms] = useState<any[]>([]);
  const [acronymMetrics, setAcronymMetrics] = useState({
    totalAcronyms: 0,
    defined: 0,
    undefined: 0,
    consistent: 0,
    inconsistent: 0,
    coverage: 0
  });

  const categories = [
    { 
      id: 'technical', 
      label: 'Technical', 
      icon: Hash,
      color: 'bg-blue-500',
      description: 'IT and technology terms',
      examples: 'API, SDK, UI, UX',
      count: 0
    },
    { 
      id: 'business', 
      label: 'Business', 
      icon: Target,
      color: 'bg-green-500',
      description: 'Business and finance',
      examples: 'ROI, KPI, SLA, CEO',
      count: 0
    },
    { 
      id: 'medical', 
      label: 'Medical', 
      icon: BookOpen,
      color: 'bg-red-500',
      description: 'Healthcare and medical',
      examples: 'FDA, HIPAA, EMR, ICU',
      count: 0
    },
    { 
      id: 'legal', 
      label: 'Legal', 
      icon: FileText,
      color: 'bg-purple-500',
      description: 'Legal and regulatory',
      examples: 'NDA, GDPR, IP, LLC',
      count: 0
    },
    { 
      id: 'academic', 
      label: 'Academic', 
      icon: Brain,
      color: 'bg-orange-500',
      description: 'Research and education',
      examples: 'PhD, MBA, GPA, DOI',
      count: 0
    },
    { 
      id: 'general', 
      label: 'General', 
      icon: Search,
      color: 'bg-indigo-500',
      description: 'Common abbreviations',
      examples: 'FAQ, ASAP, FYI, ETA',
      count: 0
    }
  ];

  const sampleAcronyms = [
    {
      id: 1,
      acronym: 'API',
      definition: 'Application Programming Interface',
      category: 'technical',
      occurrences: 12,
      consistency: 'consistent',
      context: 'Software development integration',
      usage: 'The API allows seamless data exchange between systems',
      status: 'defined'
    },
    {
      id: 2,
      acronym: 'ROI',
      definition: 'Return on Investment',
      category: 'business',
      occurrences: 8,
      consistency: 'consistent',
      context: 'Financial performance metric',
      usage: 'Our marketing campaign achieved 300% ROI',
      status: 'defined'
    },
    {
      id: 3,
      acronym: 'HIPAA',
      definition: 'Health Insurance Portability and Accountability Act',
      category: 'medical',
      occurrences: 5,
      consistency: 'consistent',
      context: 'Healthcare data protection',
      usage: 'All systems must be HIPAA compliant',
      status: 'defined'
    },
    {
      id: 4,
      acronym: 'KPI',
      definition: 'Key Performance Indicator',
      category: 'business',
      occurrences: 15,
      consistency: 'inconsistent',
      context: 'Performance measurement',
      usage: 'Track these KPIs to measure success',
      status: 'defined'
    },
    {
      id: 5,
      acronym: 'SaaS',
      definition: '',
      category: 'technical',
      occurrences: 7,
      consistency: 'undefined',
      context: 'Software delivery model',
      usage: 'Our SaaS platform serves millions of users',
      status: 'undefined'
    },
    {
      id: 6,
      acronym: 'GDPR',
      definition: 'General Data Protection Regulation',
      category: 'legal',
      occurrences: 3,
      consistency: 'consistent',
      context: 'European privacy regulation',
      usage: 'GDPR compliance is mandatory for EU operations',
      status: 'defined'
    },
    {
      id: 7,
      acronym: 'UI/UX',
      definition: 'User Interface/User Experience',
      category: 'technical',
      occurrences: 9,
      consistency: 'inconsistent',
      context: 'Design and usability',
      usage: 'Focus on improving UI/UX design',
      status: 'defined'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('detecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('managing'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'detecting') {
      const interval = setInterval(() => {
        setDetectionProgress(prev => {
          const newProgress = prev + 2.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const filteredAcronyms = sampleAcronyms.filter(acronym => 
        selectedCategories.includes(acronym.category)
      );
      
      setDetectedAcronyms(filteredAcronyms);

      const metricsInterval = setInterval(() => {
        setAcronymMetrics(prev => {
          const totalAcronyms = filteredAcronyms.length;
          const defined = filteredAcronyms.filter(a => a.status === 'defined').length;
          const undefined = filteredAcronyms.filter(a => a.status === 'undefined').length;
          const consistent = filteredAcronyms.filter(a => a.consistency === 'consistent').length;
          const inconsistent = filteredAcronyms.filter(a => a.consistency === 'inconsistent').length;
          const coverage = totalAcronyms > 0 ? Math.round((defined / totalAcronyms) * 100) : 0;
          
          return {
            totalAcronyms: Math.min(prev.totalAcronyms + 1, totalAcronyms),
            defined: Math.min(prev.defined + 1, defined),
            undefined: Math.min(prev.undefined + 1, undefined),
            consistent: Math.min(prev.consistent + 1, consistent),
            inconsistent: Math.min(prev.inconsistent + 1, inconsistent),
            coverage: Math.min(prev.coverage + 3, coverage)
          };
        });
      }, 200);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedCategories]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const getCategoryColor = (category: string) => {
    const cat = getCategoryById(category);
    return cat ? cat.color : 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'defined': return 'text-green-600';
      case 'undefined': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConsistencyIcon = (consistency: string) => {
    switch (consistency) {
      case 'consistent': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'inconsistent': return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
      case 'undefined': return <AlertTriangle className="w-3 h-3 text-red-500" />;
      default: return <CheckCircle className="w-3 h-3 text-green-500" />;
    }
  };

  const getMetricColor = (value: number, type: string) => {
    if (type === 'coverage') {
      if (value >= 90) return 'text-green-600';
      if (value >= 70) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-pink-600';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-900 dark:via-rose-800 dark:to-red-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-400 to-rose-400 dark:from-pink-700 dark:to-rose-700 transform rotate-12 scale-150"></div>
      </div>

      {/* Acronym Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Acronym Manager</span>
          </div>
        </div>

        <div className="p-3">
          {currentStep === 'complete' ? (
            <div className="space-y-2">
              {/* Total Acronyms */}
              <div className="text-center">
                <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                  {acronymMetrics.totalAcronyms}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Acronyms</div>
              </div>

              {/* Status Breakdown */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500 dark:text-success-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Defined</span>
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-success-400">
                    {acronymMetrics.defined}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-500 dark:text-error-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Missing</span>
                  </div>
                  <span className="text-xs font-medium text-red-600 dark:text-error-400">
                    {acronymMetrics.undefined}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-500 dark:text-accent-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Consistent</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-accent-400">
                    {acronymMetrics.consistent}
                  </span>
                </div>
              </div>

              {/* Coverage Score */}
              <div className="pt-2 border-t border-gray-100 dark:border-secondary-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Coverage:</span>
                  {/* getMetricColor needs to be dark mode aware or use Tailwind classes directly */}
                  <span className={`px-1 py-0.5 bg-pink-100 dark:bg-pink-700/30 text-pink-700 dark:text-pink-300 rounded font-medium ${getMetricColor(acronymMetrics.coverage, 'coverage').replace('text-','dark:text-')}`}>
                    {acronymMetrics.coverage}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 mx-auto mb-2"
                >
                  <Hash className="w-full h-full text-pink-500 dark:text-pink-400" />
                </motion.div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Scanning...</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Document Scanning Phase */}
      <AnimatePresence>
        {currentStep === 'scanning' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50"
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
                <Search className="w-8 h-8 text-pink-500 dark:text-pink-400" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Scanning for Acronyms...</div>
              <div className="space-y-2 w-40">
                {['Text analysis', 'Pattern recognition', 'Acronym extraction'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.6, duration: 0.8 }}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-700 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Selection */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-52 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-pink-500 dark:text-pink-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Categories</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">
              {categories.map((category, i) => {
                const isSelected = selectedCategories.includes(category.id);
                const IconComponent = category.icon;
                // Dynamic color handling needs to be careful for dark mode.
                // Assuming category.color is like "bg-blue-500". We need "dark:bg-blue-600" or similar.
                // This simple replace might not cover all cases perfectly if colors are complex.
                const darkColor = category.color.replace('-500', '-600'); 
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${category.color} dark:${darkColor} text-white shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-3 h-3 ${isSelected ? 'text-white' : category.color.replace('bg-','text-').replace('-500', '-600')} dark:${isSelected ? 'text-white' : category.color.replace('bg-','text-').replace('-500', '-400')}`} />
                        <span className="text-xs font-medium">{category.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-secondary-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {category.count}
                        </span>
                        <div className={`w-3 h-3 rounded border-2 ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300 dark:border-gray-500'
                        }`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full bg-current rounded-full"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {category.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detection Progress */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50 w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-pink-500 dark:text-pink-400" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Acronym Detection</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">🔍 Analyzing {selectedCategories.length} categories...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Detection Progress</span>
                <span>{detectionProgress.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${detectionProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Detection Steps */}
              <div className="space-y-2">
                {['Acronym identification', 'Definition lookup', 'Consistency check', 'Usage analysis'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: detectionProgress > i * 25 ? 1 : 0.3,
                      x: detectionProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {detectionProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500 dark:text-success-400" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 dark:border-gray-500 rounded-full" />
                    )}
                    <span className={detectionProgress > i * 25 ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Management Phase */}
      <AnimatePresence>
        {currentStep === 'managing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 h-6 text-pink-500 dark:text-pink-400" />
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Acronym Management</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Organizing and validating definitions</div>
              </div>
            </div>

            {/* Management Preview */}
            <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Detected Acronyms:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-accent-500 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">API → Application Programming Interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 dark:bg-success-500 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">ROI → Return on Investment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 dark:bg-error-500 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">SaaS → [Undefined]</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-primary-500 rounded-full"></div> {/* Assuming purple is primary-like */}
                  <span className="text-xs text-gray-700 dark:text-gray-300">GDPR → General Data Protection Regulation</span>
                </div>
              </div>
            </div>

            {/* Status Preview */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 dark:bg-success-700/20 rounded">
                <div className="text-xs font-bold text-green-600 dark:text-success-300">86%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Defined</div>
              </div>
              <div className="text-center p-2 bg-blue-50 dark:bg-accent-700/20 rounded">
                <div className="text-xs font-bold text-blue-600 dark:text-accent-300">7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Found</div>
              </div>
              <div className="text-center p-2 bg-pink-50 dark:bg-pink-700/20 rounded">
                <div className="text-xs font-bold text-pink-600 dark:text-pink-300">92%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Consistent</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Management Results */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
          >
            {/* Result Controls */}
            <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Acronym Glossary</span>
                  <span className="text-xs px-2 py-1 rounded bg-pink-500 dark:bg-pink-600 text-white">
                    {acronymMetrics.totalAcronyms} terms
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-pink-500 dark:bg-pink-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Glossary
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Category Metrics */}
              <div className="grid grid-cols-6 gap-2">
                {categories.map((category, i) => {
                  const count = detectedAcronyms.filter(a => a.category === category.id).length;
                  const IconComponent = category.icon;
                  // Assuming category.color is like "bg-blue-500". Dark: "dark:text-blue-400"
                  const darkTextColor = category.color.replace('bg-', 'text-').replace('-500', '-400');
                  
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-1">
                        <IconComponent className={`w-3 h-3 ${category.color.replace('bg-', 'text-')} dark:${darkTextColor}`} />
                      </div>
                      <div className={`text-xs font-bold ${category.color.replace('bg-', 'text-')} dark:${darkTextColor}`}>
                        {count}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Acronym Display */}
            <div className="p-3 max-h-24 overflow-auto">
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Document with Managed Acronyms:</div>
                <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-secondary-700 p-2 rounded">
                  Our{' '}
                  <span className="bg-blue-200 dark:bg-accent-700/40 px-1 rounded cursor-pointer hover:bg-blue-300 dark:hover:bg-accent-600/50 transition-colors"
                        onClick={() => setSelectedAcronym(sampleAcronyms[0])}>
                    API
                  </span>
                  {' '}integration provides excellent{' '}
                  <span className="bg-green-200 dark:bg-success-700/40 px-1 rounded cursor-pointer hover:bg-green-300 dark:hover:bg-success-600/50 transition-colors"
                        onClick={() => setSelectedAcronym(sampleAcronyms[1])}>
                    ROI
                  </span>
                  {' '}for businesses. Track important{' '}
                  <span className="bg-green-200 dark:bg-success-700/40 px-1 rounded cursor-pointer hover:bg-green-300 dark:hover:bg-success-600/50 transition-colors"
                        onClick={() => setSelectedAcronym(sampleAcronyms[3])}>
                    KPIs
                  </span>
                  {' '}while ensuring{' '}
                  <span className="bg-red-200 dark:bg-error-700/40 px-1 rounded cursor-pointer hover:bg-red-300 dark:hover:bg-error-600/50 transition-colors"
                        onClick={() => setSelectedAcronym(sampleAcronyms[2])}>
                    HIPAA
                  </span>
                  {' '}compliance. Our{' '}
                  <span className="bg-blue-200 dark:bg-accent-700/40 px-1 rounded cursor-pointer hover:bg-blue-300 dark:hover:bg-accent-600/50 transition-colors"
                        onClick={() => setSelectedAcronym(sampleAcronyms[4])}>
                    SaaS
                  </span>
                  {' '}platform meets{' '}
                  <span className="bg-purple-200 dark:bg-primary-700/40 px-1 rounded cursor-pointer hover:bg-purple-300 dark:hover:bg-primary-600/50 transition-colors" // Assuming purple is primary-like
                        onClick={() => setSelectedAcronym(sampleAcronyms[5])}>
                    GDPR
                  </span>
                  {' '}requirements.
                </div>

                {/* Acronym Detail Panel */}
                <AnimatePresence>
                  {selectedAcronym && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white dark:bg-secondary-700 border border-gray-200 dark:border-secondary-600 rounded-lg p-2 mt-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {/* Dynamic category color needs careful handling for dark text on light bg */}
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(selectedAcronym.category).replace('-500', '-600')} dark:${getCategoryColor(selectedAcronym.category).replace('-500', '-500')} text-white`}>
                            {selectedAcronym.acronym}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedAcronym.category}
                          </span>
                          {getConsistencyIcon(selectedAcronym.consistency)}
                        </div>
                        {/* getStatusColor needs to be dark mode aware */}
                        <span className={`text-xs font-medium ${getStatusColor(selectedAcronym.status).replace('text-','dark:text-')}`}>
                          {selectedAcronym.occurrences} uses
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{selectedAcronym.context}</div>
                      {selectedAcronym.definition && (
                        <div className="text-xs text-blue-700 dark:text-accent-300 bg-blue-50 dark:bg-accent-700/20 p-1 rounded mb-1">
                          📖 {selectedAcronym.definition}
                        </div>
                      )}
                      <div className="text-xs text-green-700 dark:text-success-300 bg-green-50 dark:bg-success-700/20 p-1 rounded">
                        💬 Usage: {selectedAcronym.usage}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Indicator */}
      {currentStep === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-pink-500 dark:bg-pink-600 text-white p-2 rounded-full shadow-lg"
        >
          <Hash className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Acronym Particles */}
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
              {['#️⃣', '📖', '🔍', '✅', '⚠️', '📝'][i]}
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
          stroke="url(#acronymGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="acronymGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default AcronymManagerAnimation; 