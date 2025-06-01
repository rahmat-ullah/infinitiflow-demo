import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2 } from 'lucide-react';

const SEOOptimizationAnimation: React.FC = () => {
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

export default SEOOptimizationAnimation; 