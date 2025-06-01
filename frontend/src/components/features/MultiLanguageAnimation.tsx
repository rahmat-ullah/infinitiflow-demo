import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const MultiLanguageAnimation: React.FC = () => {
  const [currentLang, setCurrentLang] = useState(0);
  const languages = [
    { code: 'EN', text: 'Hello World', flag: '🇺🇸' },
    { code: 'ES', text: 'Hola Mundo', flag: '🇪🇸' },
    { code: 'FR', text: 'Bonjour Monde', flag: '🇫🇷' },
    { code: 'DE', text: 'Hallo Welt', flag: '🇩🇪' },
    { code: 'JP', text: 'こんにちは世界', flag: '🇯🇵' }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLang(prev => (prev + 1) % languages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="text-blue-600" size={20} />
        <span className="text-sm font-medium text-blue-600">Multi-Language Support</span>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="text-center">
          <motion.div
            key={currentLang}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="text-3xl mb-2">{languages[currentLang].flag}</div>
            <div className="text-lg font-semibold text-gray-800">
              {languages[currentLang].text}
            </div>
            <div className="text-sm text-gray-500">
              {languages[currentLang].code}
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center space-x-1 mt-4">
          {languages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentLang ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageAnimation; 