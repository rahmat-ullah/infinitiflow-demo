import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, CheckCircle, Sparkles, ArrowRight, BarChart3, Eye, Users, Zap } from 'lucide-react';

const TextSimplificationAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'selecting' | 'simplifying' | 'complete'>('analyzing');
  const [selectedLevel, setSelectedLevel] = useState<string>('middle-school');
  const [simplificationProgress, setSimplificationProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [readabilityMetrics, setReadabilityMetrics] = useState({
    originalLevel: 16.2,
    simplifiedLevel: 0,
    wordsReduced: 0,
    complexityScore: 0
  });

  const sourceText = "The implementation of advanced artificial intelligence algorithms necessitates comprehensive evaluation of computational complexity and scalability parameters to ensure optimal performance metrics across heterogeneous distributed systems architectures.";

  const readingLevels = [
    { 
      id: 'elementary', 
      label: 'Elementary', 
      grade: '3rd-5th', 
      icon: '🧒',
      color: 'bg-green-400',
      description: 'Simple words & short sentences'
    },
    { 
      id: 'middle-school', 
      label: 'Middle School', 
      grade: '6th-8th', 
      icon: '📚',
      color: 'bg-blue-400',
      description: 'Clear & accessible language'
    },
    { 
      id: 'high-school', 
      label: 'High School', 
      grade: '9th-12th', 
      icon: '🎓',
      color: 'bg-purple-400',
      description: 'Standard vocabulary'
    },
    { 
      id: 'college', 
      label: 'College', 
      grade: '13th-16th', 
      icon: '🏛️',
      color: 'bg-orange-400',
      description: 'Academic but readable'
    }
  ];

  const simplifiedTexts = {
    'elementary': "Smart computer programs need to be tested carefully. This makes sure they work well on different types of computers and systems.",
    'middle-school': "Advanced AI systems need thorough testing to check how well they perform. This ensures they work properly across different computer networks and setups.",
    'high-school': "Advanced artificial intelligence systems require comprehensive testing to evaluate their performance. This ensures optimal functionality across various distributed computer architectures.",
    'college': "Implementation of advanced AI algorithms requires comprehensive evaluation of performance and scalability to ensure optimal metrics across distributed system architectures."
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('selecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('simplifying'), 5000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'simplifying') {
      const interval = setInterval(() => {
        setSimplificationProgress(prev => {
          const newProgress = prev + 2.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const targetLevels = {
        'elementary': 4.2,
        'middle-school': 7.8,
        'high-school': 10.5,
        'college': 13.2
      };

      const originalWords = sourceText.split(' ').length;
      const simplifiedWords = simplifiedTexts[selectedLevel as keyof typeof simplifiedTexts].split(' ').length;

      const metricsInterval = setInterval(() => {
        setReadabilityMetrics(prev => ({
          originalLevel: 16.2,
          simplifiedLevel: Math.min(prev.simplifiedLevel + 0.3, targetLevels[selectedLevel as keyof typeof targetLevels]),
          wordsReduced: Math.min(prev.wordsReduced + 2, Math.round(((originalWords - simplifiedWords) / originalWords) * 100)),
          complexityScore: Math.min(prev.complexityScore + 3, 92)
        }));
      }, 100);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2000);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedLevel]);

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const getLevelByID = (id: string) => {
    return readingLevels.find(level => level.id === id);
  };

  const getComplexityColor = (score: number) => {
    if (score <= 6) return 'text-green-600 bg-green-100';
    if (score <= 10) return 'text-yellow-600 bg-yellow-100';
    if (score <= 14) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-teal-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Source Text Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Complex Text</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
            {sourceText}
          </div>
          
          {/* Original Complexity */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Reading Level:</span>
                <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(16.2)}`}>
                  College+
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Words:</span>
                <span className="text-xs font-medium text-gray-800">{sourceText.split(' ').length}</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Text Analysis Phase */}
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
                <BarChart3 className="w-8 h-8 text-green-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Complexity...</div>
              <div className="space-y-2 w-32">
                {['Vocabulary', 'Sentence Length', 'Readability'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Level Selection */}
      <AnimatePresence>
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">Target Level</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {readingLevels.map((level, i) => {
                const isSelected = selectedLevel === level.id;
                
                return (
                  <motion.button
                    key={level.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleLevelSelect(level.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${level.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{level.icon}</span>
                        <span className="text-xs font-medium">{level.label}</span>
                      </div>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {level.grade}
                      </span>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {level.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplification Progress */}
      <AnimatePresence>
        {currentStep === 'simplifying' && (
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
                <Zap className="w-6 h-6 text-green-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Simplifying to {getLevelByID(selectedLevel)?.label}</div>
                <div className="text-xs text-gray-500">{getLevelByID(selectedLevel)?.icon} {getLevelByID(selectedLevel)?.description}...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{simplificationProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${simplificationProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Simplification Steps */}
              <div className="space-y-2">
                {['Replacing complex words', 'Shortening sentences', 'Improving clarity', 'Maintaining meaning'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: simplificationProgress > i * 25 ? 1 : 0.3,
                      x: simplificationProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {simplificationProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={simplificationProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplification Result */}
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
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Simplified Text</span>
                  <span className="text-sm">{getLevelByID(selectedLevel)?.icon}</span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showComparison ? 'Result' : 'Compare'}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Simplification Content */}
            <div className="p-3 max-h-28 overflow-auto">
              <AnimatePresence mode="wait">
                {!showComparison ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-xs text-gray-700 leading-relaxed mb-3">
                      {simplifiedTexts[selectedLevel as keyof typeof simplifiedTexts]}
                    </div>

                    {/* Readability Metrics */}
                    <div className="grid grid-cols-4 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Reading Level</div>
                        <div className="text-xs font-bold text-green-600">
                          {readabilityMetrics.simplifiedLevel.toFixed(1)}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Words Reduced</div>
                        <div className="text-xs font-bold text-blue-600">
                          {readabilityMetrics.wordsReduced}%
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Clarity Score</div>
                        <div className="text-xs font-bold text-purple-600">
                          {readabilityMetrics.complexityScore}%
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Target</div>
                        <div className="text-xs font-bold text-orange-600">
                          {getLevelByID(selectedLevel)?.grade}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {/* Original */}
                    <div className="bg-red-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Complex</span>
                        <span className="text-xs font-medium text-gray-600">Level {readabilityMetrics.originalLevel}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {sourceText}
                      </div>
                    </div>

                    {/* Simplified */}
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Simple</span>
                        <span className="text-xs font-medium text-green-600">Level {readabilityMetrics.simplifiedLevel.toFixed(1)}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {simplifiedTexts[selectedLevel as keyof typeof simplifiedTexts]}
                      </div>
                    </div>
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
          className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Accessibility Particles */}
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
              {['📖', '✂️', '👥', '🎯', '💡', '✨'][i]}
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
          stroke="url(#simplificationGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="simplificationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default TextSimplificationAnimation; 