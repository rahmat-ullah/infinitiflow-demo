import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import AnimatedTitle from './ui/AnimatedTitle';
import FeaturesSkeleton from './ui/FeaturesSkeleton';
import FeaturesError from './ui/FeaturesError';
import { useFeatureSection } from '../hooks/useFeatureSection';

interface FeaturesProps {
  onViewAllFeatures?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onViewAllFeatures }) => {
  const { featureData, isLoading, error, refetch } = useFeatureSection();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Show loading skeleton
  if (isLoading) {
    return <FeaturesSkeleton />;
  }

  // Show error state with fallback content
  if (error || !featureData) {
    return (
      <FeaturesError 
        error={error || 'Failed to load features'} 
        onRetry={refetch}
        onViewAllFeatures={onViewAllFeatures}
      />
    );
  }

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Star;
  };

  // Render badge icon
  const renderBadgeIcon = () => {
    if (!featureData.badge?.icon) return null;
    const IconComponent = getIconComponent(featureData.badge.icon);
    return <IconComponent size={16} className="inline-block mr-1" />;
  };

  // Extract highlighted words from title
  const getHighlightedWords = () => {
    if (!featureData.sectionSubtitle) return [];
    return [featureData.sectionSubtitle];
  };

  // Transform backend features to frontend format
  const transformedFeatures = featureData.features.map((feature, index) => ({
    id: index + 1,
    title: feature.title,
    description: feature.description,
    icon: feature.icon
  }));

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Dynamic Badge */}
          {featureData.badge && (
            <motion.span
              className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {renderBadgeIcon()}
              {featureData.badge.text}
            </motion.span>
          )}
          
          {/* Dynamic Title */}
          <AnimatedTitle 
            text={featureData.sectionTitle}
            highlighted={getHighlightedWords()}
            textSize="lg"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          {/* Dynamic Description */}
          {featureData.sectionDescription && (
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {featureData.sectionDescription}
            </motion.p>
          )}
        </div>
        
        {/* Dynamic Features Grid */}
        <div 
          className={`grid gap-8 ${
            featureData.theme?.columns === 1 ? 'grid-cols-1' :
            featureData.theme?.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
            featureData.theme?.columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
            featureData.theme?.columns === 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5' :
            featureData.theme?.columns === 6 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`} 
          ref={ref}
        >
          {transformedFeatures.slice(0, featureData.maxFeatures || 6).map((feature, index) => (
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

export default Features;