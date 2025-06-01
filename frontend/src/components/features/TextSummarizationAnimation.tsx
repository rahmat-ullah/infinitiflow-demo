import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, Clock, ChevronDown, Sparkles } from 'lucide-react';

const TextSummarizationAnimation: React.FC = () => {
  const [selectedLength, setSelectedLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const summaryOptions = [
    { key: 'short', label: 'Short', description: '1-2 sentences', color: 'bg-green-500', percentage: 25 },
    { key: 'medium', label: 'Medium', description: '3-5 sentences', color: 'bg-blue-500', percentage: 50 },
    { key: 'long', label: 'Long', description: '6-8 sentences', color: 'bg-purple-500', percentage: 75 }
  ];

  const summaryTexts = {
    short: "AI-powered content creation revolutionizes marketing efficiency.",
    medium: "AI-powered content creation revolutionizes marketing efficiency by automating writing processes. This technology enables businesses to scale content production while maintaining quality.",
    long: "AI-powered content creation revolutionizes marketing efficiency by automating writing processes and enhancing creativity. This technology enables businesses to scale content production while maintaining quality and consistency. Modern AI tools understand context, tone, and brand voice to generate compelling content that resonates with target audiences."
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowSummary(true);
      }, 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedLength]);

  const handleLengthChange = (length: 'short' | 'medium' | 'long') => {
    setSelectedLength(length);
    setShowSummary(false);
    setIsProcessing(false);
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Original Document */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
      >
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-gray-700">Original Document</span>
          <div className="ml-auto text-xs text-gray-500">1,247 words</div>
        </div>
        
        <div className="space-y-1 text-xs text-gray-600 leading-relaxed">
          <div className="animate-pulse">
            In today's digital landscape, artificial intelligence has become a cornerstone of modern content creation...
          </div>
          <div className="h-1 bg-gray-200 rounded w-full"></div>
          <div className="h-1 bg-gray-200 rounded w-5/6"></div>
          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
          <div className="h-1 bg-gray-200 rounded w-full"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
          <div className="h-1 bg-gray-200 rounded w-5/6"></div>
          <div className="h-1 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Reading progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 3 }}
          className="absolute bottom-3 left-3 right-3 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70"
        />
      </motion.div>

      {/* Interactive Summary Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-4 right-4 w-40 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-semibold text-gray-700">Summary Length</span>
        </div>

        <div className="space-y-2">
          {summaryOptions.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => handleLengthChange(option.key as any)}
              className={`w-full p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedLength === option.key
                  ? `${option.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: selectedLength === option.key ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                <span className="text-xs opacity-75">{option.percentage}%</span>
              </div>
              <div className="text-xs opacity-75 mt-1">{option.description}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50"
          >
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-purple-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">AI Summarizing...</div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Result */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-3 h-3 rounded-full ${summaryOptions.find(opt => opt.key === selectedLength)?.color}`}
              />
              <span className="text-sm font-semibold text-gray-700">
                {summaryOptions.find(opt => opt.key === selectedLength)?.label} Summary
              </span>
              <div className="ml-auto flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">0.3s</span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs text-gray-700 leading-relaxed"
            >
              {summaryTexts[selectedLength]}
            </motion.div>

            {/* Word count indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${summaryOptions.find(opt => opt.key === selectedLength)?.percentage}%` }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-3 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Compression: {100 - (summaryOptions.find(opt => opt.key === selectedLength)?.percentage || 50)}%</span>
              <span>{summaryTexts[selectedLength].split(' ').length} words</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Enhancement Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, Math.random() * 40 - 20],
            y: [0, -Math.random() * 60 - 20],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3 + 3.5,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${30 + i * 8}%`,
            top: `70%`,
          }}
        />
      ))}

      {/* Connection Line */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute top-20 left-48 w-16 h-8"
        viewBox="0 0 64 32"
      >
        <motion.path
          d="M 0 16 Q 32 0 64 16"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default TextSummarizationAnimation; 