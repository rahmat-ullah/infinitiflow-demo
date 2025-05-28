import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  badge: {
    icon: LucideIcon;
    text: string;
  };
  title: string;
  highlightedTitle: string;
  description: string;
}

const PageHero: React.FC<PageHeroProps> = ({ badge, title, highlightedTitle, description }) => {
  const BadgeIcon = badge.icon;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <BadgeIcon size={16} className="inline-block mr-2" />
            {badge.text}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {title}
            <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {highlightedTitle}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero; 