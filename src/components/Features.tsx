import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, ArrowRight } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import AnimatedTitle from './ui/AnimatedTitle';
import { features } from '../data/content';

interface FeaturesProps {
  onViewAllFeatures?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onViewAllFeatures }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={16} className="inline-block mr-1" />
            Supercharge Your Content
          </motion.span>
          
          <AnimatedTitle 
            text="Powerful features to transform your content workflow"
            highlighted={["transform"]}
            textSize="lg"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI-powered platform helps you create, optimize, and manage content at scale.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* View All Features Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllFeatures}
          >
            <span>Explore All Features in Detail</span>
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-sm text-gray-500 mt-3">
            See interactive demos and detailed explanations of each feature
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;