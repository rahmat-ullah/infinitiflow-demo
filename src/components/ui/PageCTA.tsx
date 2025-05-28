import React from 'react';
import { motion } from 'framer-motion';

interface PageCTAProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick?: () => void;
  };
  secondaryButton: {
    text: string;
    onClick?: () => void;
  };
}

const PageCTA: React.FC<PageCTAProps> = ({ title, description, primaryButton, secondaryButton }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-24 text-center"
    >
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={primaryButton.onClick}
            >
              {primaryButton.text}
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={secondaryButton.onClick}
            >
              {secondaryButton.text}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageCTA; 