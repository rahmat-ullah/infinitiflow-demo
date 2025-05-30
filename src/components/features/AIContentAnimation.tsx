import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const AIContentAnimation: React.FC = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState('');
  const fullText = "AI-powered content creation transforms your ideas into engaging stories...";
  
  useEffect(() => {
    if (isTyping) {
      const timer = setInterval(() => {
        setText(prev => {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1);
          } else {
            setIsTyping(false);
            setTimeout(() => {
              setText('');
              setIsTyping(true);
            }, 2000);
            return prev;
          }
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isTyping, fullText]);

  return (
    <div className="bg-gradient-to-br from-[#e6e3ff] to-blue-50 dark:from-secondary-800 dark:to-blue-900 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-primary-700 dark:text-primary-300" size={20} />
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">AI Writing Assistant</span>
      </div>
      <div className="bg-white dark:bg-secondary-700 rounded-lg p-4 shadow-sm border dark:border-secondary-600">
        <div className="h-32 relative">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {text}
            <span className="animate-pulse text-primary-700 dark:text-primary-300">|</span>
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-t-secondary-600">
          <div className="flex space-x-2">
            <motion.div 
              className="w-2 h-2 bg-primary-700 dark:bg-primary-300 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.div 
              className="w-2 h-2 bg-primary-700 dark:bg-primary-300 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
            />
            <motion.div 
              className="w-2 h-2 bg-primary-700 dark:bg-primary-300 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Writing...</span>
        </div>
      </div>
    </div>
  );
};

export default AIContentAnimation; 