import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Wand2, CheckCircle, BarChart3, AlignLeft, Eye, Zap } from 'lucide-react';

const DocumentRefinementAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'options' | 'refining' | 'complete'>('analyzing');
  const [selectedRefinements, setSelectedRefinements] = useState<string[]>([]);
  const [showBefore, setShowBefore] = useState(true);

  const refinementOptions = [
    { 
      id: 'structure', 
      label: 'Structure', 
      icon: BarChart3, 
      color: 'bg-blue-500', 
      description: 'Improve document organization',
      improvement: '+40%'
    },
    { 
      id: 'flow', 
      label: 'Flow', 
      icon: Zap, 
      color: 'bg-green-500', 
      description: 'Enhance content flow',
      improvement: '+35%'
    },
    { 
      id: 'readability', 
      label: 'Readability', 
      icon: Eye, 
      color: 'bg-purple-500', 
      description: 'Boost clarity & readability',
      improvement: '+50%'
    },
    { 
      id: 'formatting', 
      label: 'Formatting', 
      icon: AlignLeft, 
      color: 'bg-orange-500', 
      description: 'Professional formatting',
      improvement: '+30%'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('options'), 2000);
    return () => clearTimeout(timer1);
  }, []);

  const handleRefinementToggle = (id: string) => {
    setSelectedRefinements(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleStartRefinement = () => {
    if (selectedRefinements.length > 0) {
      setCurrentStep('refining');
      setTimeout(() => setCurrentStep('complete'), 3000);
    }
  };

  const documentBefore = {
    title: "Quarterly Business Report",
    issues: [
      "Poor heading hierarchy",
      "Inconsistent formatting", 
      "Unclear structure",
      "Dense paragraphs"
    ],
    score: 45
  };

  const documentAfter = {
    title: "Q4 2024 Business Performance Report",
    improvements: [
      "Clear heading structure",
      "Professional formatting",
      "Logical content flow", 
      "Readable paragraphs"
    ],
    score: 92
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Document Preview */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-48 h-44 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Document Header */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">
              {showBefore ? documentBefore.title : documentAfter.title}
            </span>
          </div>
          
          {/* Quality Score */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Quality Score:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <motion.div
                initial={{ width: `${documentBefore.score}%` }}
                animate={{ width: `${showBefore ? documentBefore.score : documentAfter.score}%` }}
                transition={{ duration: 1 }}
                className={`h-1.5 rounded-full ${
                  showBefore ? 'bg-red-400' : 'bg-green-500'
                }`}
              />
            </div>
            <span className={`text-xs font-bold ${
              showBefore ? 'text-red-600' : 'text-green-600'
            }`}>
              {showBefore ? documentBefore.score : documentAfter.score}%
            </span>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-3 space-y-2">
          <AnimatePresence mode="wait">
            {showBefore ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-1"
              >
                {documentBefore.issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-red-600">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    {issue}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-1"
              >
                {documentAfter.improvements.map((improvement, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    {improvement}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        {currentStep === 'complete' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowBefore(!showBefore)}
            className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showBefore ? 'After' : 'Before'}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wand2 className="w-8 h-8 text-blue-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Document...</div>
              <div className="space-y-2 w-32">
                {['Structure', 'Flow', 'Readability'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1"
                  >
                    <div className="bg-blue-500 h-1 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refinement Options */}
      <AnimatePresence>
        {currentStep === 'options' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-44 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">Refinement Options</span>
            </div>

            <div className="space-y-2 mb-4">
              {refinementOptions.map((option, i) => {
                const Icon = option.icon;
                const isSelected = selectedRefinements.includes(option.id);
                
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleRefinementToggle(option.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${option.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3 h-3" />
                      <span className="text-xs font-medium">{option.label}</span>
                      <span className="ml-auto text-xs opacity-75">{option.improvement}</span>
                    </div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleStartRefinement}
              disabled={selectedRefinements.length === 0}
              className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedRefinements.length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedRefinements.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedRefinements.length > 0 ? { scale: 0.98 } : {}}
            >
              Refine Document ({selectedRefinements.length})
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refining Animation */}
      <AnimatePresence>
        {currentStep === 'refining' && (
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
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Wand2 className="w-8 h-8 text-blue-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Refining Document...</div>
              
              <div className="space-y-2 w-40">
                {selectedRefinements.map((id, i) => {
                  const option = refinementOptions.find(opt => opt.id === id);
                  if (!option) return null;
                  
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${option.color}`} />
                      <span className="text-xs text-gray-600">{option.label}</span>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: i * 0.3 + 0.5, duration: 1 }}
                        className="flex-1 bg-gray-200 rounded-full h-1"
                      >
                        <div className={`${option.color} h-1 rounded-full`} />
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
              <span className="text-sm font-semibold text-gray-700">Refinement Complete</span>
              <div className="ml-auto text-xs text-gray-500">+47 quality points</div>
            </div>
            
            <div className="flex gap-4 text-xs">
              <div className="flex-1">
                <div className="text-gray-500 mb-1">Improvements Applied:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedRefinements.map(id => {
                    const option = refinementOptions.find(opt => opt.id === id);
                    return (
                      <span key={id} className={`px-2 py-1 rounded-full text-white ${option?.color} text-xs`}>
                        {option?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-gray-500 mb-1">Overall Score:</div>
                <div className="text-lg font-bold text-green-600">
                  {documentBefore.score}% → {documentAfter.score}%
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Enhancement Particles */}
      {currentStep === 'complete' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -40, -80],
                x: [0, Math.random() * 30 - 15],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              style={{
                left: `${25 + i * 12}%`,
                top: `70%`,
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'options' || currentStep === 'complete' ? 1 : 0, 
          opacity: currentStep === 'options' || currentStep === 'complete' ? 0.3 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-24 left-52 w-20 h-8"
        viewBox="0 0 80 32"
      >
        <motion.path
          d="M 0 16 Q 40 0 80 16"
          stroke="url(#refineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="refineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default DocumentRefinementAnimation; 