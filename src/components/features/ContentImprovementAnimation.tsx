import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Eye, Target, Zap, CheckCircle, BarChart3, Users } from 'lucide-react';

const ContentImprovementAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'suggestions' | 'improving' | 'complete'>('analyzing');
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [showImproved, setShowImproved] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const improvementSuggestions = [
    { 
      id: 'engagement', 
      label: 'Engagement', 
      icon: Users, 
      color: 'bg-pink-500', 
      description: 'Add compelling hooks & questions',
      impact: '+65%',
      before: 42,
      after: 87
    },
    { 
      id: 'clarity', 
      label: 'Clarity', 
      icon: Eye, 
      color: 'bg-blue-500', 
      description: 'Simplify complex sentences',
      impact: '+45%',
      before: 58,
      after: 89
    },
    { 
      id: 'persuasion', 
      label: 'Persuasion', 
      icon: Target, 
      color: 'bg-purple-500', 
      description: 'Strengthen calls-to-action',
      impact: '+70%',
      before: 35,
      after: 92
    },
    { 
      id: 'impact', 
      label: 'Impact', 
      icon: Zap, 
      color: 'bg-orange-500', 
      description: 'Power words & active voice',
      impact: '+55%',
      before: 48,
      after: 85
    }
  ];

  const contentBefore = {
    text: "Our product is good and can help your business. We have features that work well.",
    metrics: {
      engagement: 42,
      clarity: 58,
      persuasion: 35,
      impact: 48,
      overall: 46
    }
  };

  const contentAfter = {
    text: "Transform your business with our game-changing solution! Discover powerful features that drive real results.",
    metrics: {
      engagement: 87,
      clarity: 89,
      persuasion: 92,
      impact: 85,
      overall: 88
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('suggestions'), 2500);
    return () => clearTimeout(timer1);
  }, []);

  const handleImprovementToggle = (id: string) => {
    setSelectedImprovements(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleStartImprovement = () => {
    if (selectedImprovements.length > 0) {
      setCurrentStep('improving');
      setTimeout(() => {
        setCurrentStep('complete');
        setShowImproved(true);
      }, 3000);
    }
  };

  const getDisplayMetrics = () => {
    if (showImproved) {
      return selectedImprovements.length > 0 ? contentAfter.metrics : contentBefore.metrics;
    }
    return contentBefore.metrics;
  };

  const getDisplayContent = () => {
    return showImproved && selectedImprovements.length > 0 ? contentAfter : contentBefore;
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Content Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Content Header */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-semibold text-gray-700">Content Analysis</span>
          </div>
          
          {/* Overall Score */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Overall Score:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <motion.div
                initial={{ width: `${contentBefore.metrics.overall}%` }}
                animate={{ width: `${getDisplayMetrics().overall}%` }}
                transition={{ duration: 1 }}
                className={`h-1.5 rounded-full ${
                  showImproved && selectedImprovements.length > 0 ? 'bg-green-500' : 'bg-orange-400'
                }`}
              />
            </div>
            <span className={`text-xs font-bold ${
              showImproved && selectedImprovements.length > 0 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {getDisplayMetrics().overall}%
            </span>
          </div>
        </div>

        {/* Content Text */}
        <div className="p-3 mb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={showImproved ? 'improved' : 'original'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-gray-700 leading-relaxed"
            >
              "{getDisplayContent().text}"
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Metrics Grid */}
        <div className="p-3 space-y-1">
          {Object.entries(getDisplayMetrics()).filter(([key]) => key !== 'overall').map(([key, value]) => {
            const suggestion = improvementSuggestions.find(s => s.id === key);
            const isSelected = selectedImprovements.includes(key);
            const isHovered = activeMetric === key;
            
            return (
              <motion.div
                key={key}
                className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-all ${
                  isHovered ? 'bg-yellow-50' : ''
                }`}
                onMouseEnter={() => setActiveMetric(key)}
                onMouseLeave={() => setActiveMetric(null)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xs text-gray-600 capitalize w-16">{key}:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: `${contentBefore.metrics[key as keyof typeof contentBefore.metrics]}%` }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-1 rounded-full ${
                      isSelected && showImproved 
                        ? suggestion?.color.replace('bg-', 'bg-') || 'bg-orange-400'
                        : 'bg-orange-400'
                    }`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 w-8">{value}%</span>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle Button */}
        {currentStep === 'complete' && selectedImprovements.length > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowImproved(!showImproved)}
            className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {showImproved ? 'Original' : 'Improved'}
          </motion.button>
        )}
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
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Content Quality...</div>
              <div className="space-y-2 w-36">
                {['Engagement', 'Clarity', 'Persuasion', 'Impact'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.4, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Improvement Suggestions */}
      <AnimatePresence>
        {currentStep === 'suggestions' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">Improvement Suggestions</span>
            </div>

            <div className="space-y-2 mb-4">
              {improvementSuggestions.map((suggestion, i) => {
                const Icon = suggestion.icon;
                const isSelected = selectedImprovements.includes(suggestion.id);
                
                return (
                  <motion.button
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleImprovementToggle(suggestion.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${suggestion.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3 h-3" />
                      <span className="text-xs font-medium">{suggestion.label}</span>
                      <span className="ml-auto text-xs opacity-75">{suggestion.impact}</span>
                    </div>
                    <div className="text-xs opacity-75">{suggestion.description}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs opacity-75">{suggestion.before}%</span>
                      <div className="flex-1 h-1 bg-white/30 rounded-full">
                        <div className={`h-1 rounded-full bg-white/60 w-[${suggestion.before}%]`}></div>
                      </div>
                      <span className="text-xs opacity-75">→ {suggestion.after}%</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleStartImprovement}
              disabled={selectedImprovements.length === 0}
              className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedImprovements.length > 0
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedImprovements.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedImprovements.length > 0 ? { scale: 0.98 } : {}}
            >
              Improve Content ({selectedImprovements.length})
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Improving Animation */}
      <AnimatePresence>
        {currentStep === 'improving' && (
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
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Enhancing Content...</div>
              
              <div className="space-y-2 w-44">
                {selectedImprovements.map((id, i) => {
                  const suggestion = improvementSuggestions.find(opt => opt.id === id);
                  if (!suggestion) return null;
                  
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${suggestion.color}`} />
                      <span className="text-xs text-gray-600">{suggestion.label}</span>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: i * 0.3 + 0.5, duration: 1 }}
                        className="flex-1 bg-gray-200 rounded-full h-1"
                      >
                        <div className={`${suggestion.color} h-1 rounded-full`} />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Results */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">Content Enhanced</span>
              <div className="ml-auto text-xs text-gray-500">
                +{contentAfter.metrics.overall - contentBefore.metrics.overall} points
              </div>
            </div>
            
            <div className="flex gap-4 text-xs">
              <div className="flex-1">
                <div className="text-gray-500 mb-1">Improvements Applied:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedImprovements.map(id => {
                    const suggestion = improvementSuggestions.find(opt => opt.id === id);
                    return (
                      <span key={id} className={`px-2 py-1 rounded-full text-white ${suggestion?.color} text-xs`}>
                        {suggestion?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-gray-500 mb-1">Quality Score:</div>
                <div className="text-lg font-bold text-green-600">
                  {contentBefore.metrics.overall}% → {contentAfter.metrics.overall}%
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Enhancement Particles */}
      {currentStep === 'complete' && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -50, -100],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: `75%`,
              }}
            >
              {i % 2 === 0 ? '✨' : '💫'}
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'suggestions' || currentStep === 'complete' ? 1 : 0, 
          opacity: currentStep === 'suggestions' || currentStep === 'complete' ? 0.4 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-48 w-24 h-12"
        viewBox="0 0 96 48"
      >
        <motion.path
          d="M 0 24 Q 48 8 96 24"
          stroke="url(#improveGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6,6"
        />
        <defs>
          <linearGradient id="improveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default ContentImprovementAnimation; 