import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight, Wand2 } from 'lucide-react';

const ContentRepurposingAnimation: React.FC = () => {
  const [isTransforming, setIsTransforming] = useState(false);
  
  const formats = {
    blog: { icon: '📝', name: 'Blog Post', color: 'bg-blue-100' },
    social: { icon: '📱', name: 'Social Media', color: 'bg-pink-100' },
    email: { icon: '📧', name: 'Email', color: 'bg-green-100' },
    video: { icon: '🎥', name: 'Video Script', color: 'bg-purple-100' }
  } as const;
  
  type FormatKey = keyof typeof formats;
  const [currentFormat, setCurrentFormat] = useState<FormatKey>('blog');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransforming(true);
      setTimeout(() => {
        const formatKeys = Object.keys(formats) as FormatKey[];
        const currentIndex = formatKeys.indexOf(currentFormat);
        const nextFormat = formatKeys[(currentIndex + 1) % formatKeys.length];
        setCurrentFormat(nextFormat);
        setIsTransforming(false);
      }, 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentFormat]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <RefreshCw className="text-pink-600" size={20} />
        <span className="text-sm font-medium text-pink-600">Content Repurposing</span>
      </div>
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📄</span>
            </div>
            <span className="text-xs font-medium">Original</span>
          </div>
          
          <motion.div
            animate={{ rotate: isTransforming ? 360 : 0 }}
            transition={{ duration: 1 }}
            className="text-pink-500"
          >
            <ArrowRight size={20} />
          </motion.div>
          
          <div className="text-center">
            <motion.div
              className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 ${formats[currentFormat].color}`}
              animate={{ scale: isTransforming ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl">{formats[currentFormat].icon}</span>
            </motion.div>
            <span className="text-xs font-medium">{formats[currentFormat].name}</span>
          </div>
        </div>
        
        {isTransforming && (
          <motion.div
            className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-pink-500"
            >
              <Wand2 size={24} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentRepurposingAnimation; 