import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate } from 'lucide-react';

const SmartTemplatesAnimation: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const templates = ['Blog Post', 'Social Media', 'Email', 'Ad Copy'];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTemplate(prev => (prev + 1) % templates.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <LayoutTemplate className="text-green-600" size={20} />
        <span className="text-sm font-medium text-green-600">Smart Templates</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template, index) => (
          <motion.div
            key={template}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              activeTemplate === index
                ? 'border-green-400 bg-green-100 shadow-md'
                : 'border-gray-200 bg-white'
            }`}
            animate={{
              scale: activeTemplate === index ? 1.05 : 1,
              y: activeTemplate === index ? -2 : 0
            }}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                activeTemplate === index ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm font-medium">{template}</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              <div className="h-1 bg-gray-200 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartTemplatesAnimation; 