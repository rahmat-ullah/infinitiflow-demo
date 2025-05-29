import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Check, X, ArrowRight } from 'lucide-react';

const AIEditAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg overflow-hidden">
      {/* Original Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-32 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Edit3 className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-semibold text-gray-700">Original</span>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-gray-600">
            <span className="bg-yellow-200">The document is very important</span> and it should be reviewed carefully.
          </div>
          <div className="text-xs text-gray-600">
            <span className="bg-yellow-200">We need to make sure everything is good</span> before submission.
          </div>
        </div>

        {/* Selection indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-20 left-52"
      >
        <ArrowRight className="w-6 h-6 text-green-600" />
      </motion.div>

      {/* Improved Text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute top-4 right-4 w-44 h-32 bg-white rounded-lg shadow-lg p-3 border-2 border-green-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <Edit3 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-gray-700">AI Improved</span>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-gray-600">
            <span className="bg-green-200">This document is critically important</span> and requires thorough review.
          </div>
          <div className="text-xs text-gray-600">
            <span className="bg-green-200">We must ensure comprehensive quality checks</span> before submission.
          </div>
        </div>

        {/* AI badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">AI</span>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 shadow-lg"
        >
          <Check className="w-3 h-3" />
          Accept
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 shadow-lg"
        >
          <X className="w-3 h-3" />
          Reject
        </motion.button>
      </motion.div>

      {/* Improvement indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2"
      >
        <div className="text-xs text-green-600 font-medium">Improvements:</div>
        <div className="text-xs text-gray-600">
          <div>• Clarity +25%</div>
          <div>• Impact +40%</div>
          <div>• Readability +30%</div>
        </div>
      </motion.div>

      {/* Floating edit icons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8 + 4,
            repeat: Infinity,
            repeatDelay: 5,
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + (i % 2) * 20}%`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default AIEditAnimation; 