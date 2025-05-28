import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Feature } from '../../types/features';

interface FeatureShowcaseProps {
  feature: Feature;
  index: number;
  isEven: boolean;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ feature, index, isEven }) => {
  const IconComponent = feature.icon;
  const AnimationComponent = feature.animation;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
    >
      {/* Animation Showcase */}
      <div className="w-full lg:w-1/2">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl transform scale-105" 
               style={{ background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', ', ')})` }} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-2">
              <AnimationComponent />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
            <IconComponent size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
            <p className="text-lg text-gray-600 mt-2">{feature.description}</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          {feature.detailedDescription}
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-lg">Key Benefits:</h4>
          <ul className="space-y-2">
            {feature.benefits.map((benefit, benefitIndex) => (
              <motion.li
                key={benefitIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: benefitIndex * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try This Feature
          <ArrowRight size={16} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeatureShowcase; 