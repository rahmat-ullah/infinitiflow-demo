import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, Target, Zap } from 'lucide-react';

const ContentStrategyAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Content Calendar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-52 h-36 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-gray-700">Content Calendar</span>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-xs text-gray-500 text-center h-4">
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              className={`w-4 h-4 rounded-sm text-xs flex items-center justify-center ${
                i === 3 || i === 7 || i === 12 
                  ? 'bg-blue-500 text-white' 
                  : i === 5 || i === 9 
                  ? 'bg-green-500 text-white'
                  : i === 1 || i === 11
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>
        
        {/* Content Types Legend */}
        <div className="mt-2 flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Blog</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Social</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Email</span>
          </div>
        </div>
      </motion.div>

      {/* Performance Analytics */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-4 right-4 w-32 h-40 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-gray-700">Analytics</span>
        </div>
        
        {/* Performance Bars */}
        <div className="space-y-2">
          {[
            { label: 'Engagement', value: 85, color: 'bg-blue-500' },
            { label: 'Reach', value: 92, color: 'bg-green-500' },
            { label: 'Conversion', value: 78, color: 'bg-orange-500' },
            { label: 'ROI', value: 95, color: 'bg-purple-500' }
          ].map((metric, i) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-medium">{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
                  className={`h-1.5 rounded-full ${metric.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content Repurposing Flow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-semibold text-gray-700">Content Repurposing</span>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Original Content */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="w-16 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs font-medium"
            >
              Blog Post
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex-1 h-0.5 bg-gray-300 mx-2"
            />
            
            {/* Repurposed Content */}
            <div className="flex gap-1">
              {[
                { label: 'Tweet', color: 'from-blue-400 to-blue-600' },
                { label: 'Email', color: 'from-green-400 to-green-600' },
                { label: 'Post', color: 'from-purple-400 to-purple-600' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 3 + i * 0.2, duration: 0.5 }}
                  className={`w-12 h-8 bg-gradient-to-r ${item.color} rounded flex items-center justify-center text-white text-xs font-medium`}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Strategy Goals */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute top-12 left-64 bg-white rounded-full p-2 shadow-lg"
      >
        <Target className="w-5 h-5 text-red-500" />
      </motion.div>

      {/* Floating productivity indicators */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: i * 0.6,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${20 + i * 25}%`,
            top: `${60 + (i % 2) * 15}%`,
          }}
        >
          {i % 4 === 0 ? '📈' : i % 4 === 1 ? '🎯' : i % 4 === 2 ? '⚡' : '🚀'}
        </motion.div>
      ))}
    </div>
  );
};

export default ContentStrategyAnimation; 