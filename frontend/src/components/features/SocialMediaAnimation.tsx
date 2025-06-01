import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Hash } from 'lucide-react';

const SocialMediaAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg overflow-hidden">
      {/* Social Media Posts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-52 h-40 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div>
            <div className="h-2 bg-gray-300 rounded w-16 mb-1"></div>
            <div className="h-1 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="h-2 bg-gray-300 rounded w-full"></div>
          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
          <div className="flex gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <div className="h-2 bg-blue-200 rounded w-12"></div>
            <Hash className="w-3 h-3 text-blue-500" />
            <div className="h-2 bg-blue-200 rounded w-16"></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="flex items-center gap-1 text-red-500"
          >
            <Heart className="w-4 h-4" />
            <span className="text-xs">124</span>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="flex items-center gap-1 text-blue-500"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">23</span>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 0.3 }}
            className="flex items-center gap-1 text-green-500"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs">12</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Platform Icons */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-6 right-6 space-y-3"
      >
        {['📘', '📷', '🐦', '💼'].map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-lg"
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>

      {/* Content Generation Flow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">AI Content Generator</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
          <div className="flex gap-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ delay: 3, duration: 1 }}
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "15%" }}
              transition={{ delay: 3.5, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating engagement indicators */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          style={{
            left: `${15 + (i % 4) * 20}%`,
            top: `${50 + (i % 2) * 20}%`,
          }}
        >
          {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '👍' : '🔥'}
        </motion.div>
      ))}
    </div>
  );
};

export default SocialMediaAnimation; 