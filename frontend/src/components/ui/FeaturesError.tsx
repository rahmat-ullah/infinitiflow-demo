import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, RefreshCw, XCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';
import AnimatedTitle from './AnimatedTitle';
import { features } from '../../data/content';
import Button from './Button';

interface FeaturesErrorProps {
  error: string;
  onRetry: () => void;
  onViewAllFeatures?: () => void;
}

const FeaturesError: React.FC<FeaturesErrorProps> = ({ error, onRetry, onViewAllFeatures }) => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300 text-sm font-medium px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <XCircle size={16} className="inline-block mr-1" />
            Content Loading Error
          </motion.span>
          
          <AnimatedTitle 
            text="Powerful features to transform your content workflow"
            highlighted={["transform"]}
            textSize="lg"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI-powered platform helps you create, optimize, and manage content at scale.
          </motion.p>

          {/* Error message and retry */}
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-red-400 dark:bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  Failed to load dynamic features
                </p>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  {error}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                leftIcon={<RefreshCw size={16} />}
                className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                Retry Loading
              </Button>
            </div>
          </div>
        </div>
        
        {/* Fallback features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-500 dark:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllFeatures}
          >
            <span>Explore All Features in Detail</span>
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            See interactive demos and detailed explanations of each feature
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesError; 