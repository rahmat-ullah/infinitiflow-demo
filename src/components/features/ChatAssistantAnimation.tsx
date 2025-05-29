import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Bot, Send } from 'lucide-react';

const ChatAssistantAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Document Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4 w-40 h-48 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="space-y-2">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 bg-gray-200 rounded ${
                i === 2 ? 'w-3/4' : i === 5 ? 'w-1/2' : 'w-full'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-4 right-4 w-48 h-48 bg-white rounded-lg shadow-lg"
      >
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-2 rounded-t-lg flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">AI Assistant</span>
        </div>

        {/* Chat Messages */}
        <div className="p-2 space-y-2 h-32 overflow-hidden">
          {/* User Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-end"
          >
            <div className="bg-blue-100 rounded-lg p-2 max-w-32">
              <div className="flex items-center gap-1 mb-1">
                <User className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-blue-600">You</span>
              </div>
              <div className="text-xs text-gray-700">What's this document about?</div>
            </div>
          </motion.div>

          {/* AI Response */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-2 max-w-32">
              <div className="flex items-center gap-1 mb-1">
                <Bot className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">AI</span>
              </div>
              <div className="text-xs text-gray-700">This document covers AI content generation strategies...</div>
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="border-t p-2 flex items-center gap-2"
        >
          <div className="flex-1 h-6 bg-gray-100 rounded text-xs flex items-center px-2 text-gray-500">
            Ask anything...
          </div>
          <Send className="w-4 h-4 text-blue-600" />
        </motion.div>
      </motion.div>

      {/* Floating question marks */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-500 text-lg font-bold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.5 + 3,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${15 + i * 20}%`,
            top: `70%`,
          }}
        >
          ?
        </motion.div>
      ))}

      {/* Connection lines */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="60" height="20" viewBox="0 0 60 20">
          <motion.path
            d="M 0 10 Q 30 0 60 10"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ChatAssistantAnimation; 