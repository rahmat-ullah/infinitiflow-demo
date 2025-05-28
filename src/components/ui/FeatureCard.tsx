import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { FeatureItem } from '../../types';

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  // @ts-ignore - Dynamically access Lucide icons
  const IconComponent = LucideIcons[feature.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-feature hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="mb-4 bg-primary-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center text-primary-600">
        {IconComponent && <IconComponent size={24} />}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;