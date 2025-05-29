import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Users, BarChart3 } from 'lucide-react';

const EmailMarketingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Email Template */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-48 h-32 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-blue-600" />
          <div className="h-2 bg-gray-200 rounded flex-1"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-full"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="mt-2 bg-blue-600 text-white text-xs px-2 py-1 rounded text-center"
        >
          CTA Button
        </motion.div>
      </motion.div>

      {/* Send Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-8 right-20"
      >
        <Send className="w-6 h-6 text-blue-600" />
      </motion.div>

      {/* Recipients */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-4 space-y-2"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 + i * 0.2, duration: 0.3 }}
            className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-md"
          >
            <Users className="w-3 h-3 text-green-600" />
            <span className="text-xs text-gray-600">User {i}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 w-24"
      >
        <BarChart3 className="w-4 h-4 text-green-600 mb-1" />
        <div className="text-xs text-gray-600">
          <div>Open: 45%</div>
          <div>Click: 12%</div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 50, 100],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${60 + i * 5}%`,
          }}
        />
      ))}
    </div>
  );
};

export default EmailMarketingAnimation; 