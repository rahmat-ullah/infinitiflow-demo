import React from 'react';
import { motion } from 'framer-motion';
import { Target, DollarSign, MousePointer, TrendingUp } from 'lucide-react';

const CopywritingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900 dark:to-red-800 rounded-lg overflow-hidden">
      {/* Sales Copy Document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-48 h-44 bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-red-600 dark:text-error-400" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sales Copy</span>
        </div>
        
        {/* Headline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-3 bg-gradient-to-r from-red-600 to-orange-500 dark:from-error-500 dark:to-orange-600 rounded mb-2"
        />
        
        {/* Body Text */}
        <div className="space-y-1 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90%" }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-2 bg-gray-300 dark:bg-gray-600 rounded"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-2 bg-gray-200 dark:bg-gray-700 rounded"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="h-2 bg-gray-200 dark:bg-gray-700 rounded"
          />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-r from-red-600 to-orange-500 dark:from-error-500 dark:to-orange-600 text-white text-xs px-3 py-2 rounded-lg text-center font-semibold"
        >
          BUY NOW - 50% OFF!
        </motion.div>

        {/* Conversion indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 dark:bg-success-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">✓</span>
        </motion.div>
      </motion.div>

      {/* Conversion Metrics */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-4 right-4 space-y-3"
      >
        {/* Conversion Rate */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3 w-28"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3 h-3 text-green-600 dark:text-success-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">CVR</span>
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-success-400">+65%</div>
        </motion.div>

        {/* Revenue */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3 w-28"
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-3 h-3 text-orange-600 dark:text-warning-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Revenue</span>
          </div>
          <div className="text-lg font-bold text-orange-600 dark:text-warning-400">$125K</div>
        </motion.div>
      </motion.div>

      {/* Click Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, duration: 0.3 }}
        className="absolute bottom-20 left-28"
      >
        <MousePointer className="w-5 h-5 text-red-600 dark:text-error-400" />
      </motion.div>

      {/* A/B Testing Variations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-3">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">A/B Test Variations</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 dark:bg-secondary-700 rounded p-2">
              <div className="text-xs text-gray-600 dark:text-gray-300">Version A</div>
              <div className="text-green-600 dark:text-success-400 font-semibold text-sm">12.5% CVR</div>
            </div>
            <div className="flex-1 bg-red-50 dark:bg-error-700/20 rounded p-2 border border-red-200 dark:border-error-700/30">
              <div className="text-xs text-gray-600 dark:text-gray-300">Version B</div>
              <div className="text-red-600 dark:text-error-400 font-semibold text-sm">20.8% CVR</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating dollar signs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 dark:text-success-400 text-lg font-bold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -40, -80],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${60 + i * 8}%`,
            top: `70%`,
          }}
        >
          $
        </motion.div>
      ))}
    </div>
  );
};

export default CopywritingAnimation; 