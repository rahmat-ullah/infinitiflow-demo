import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { features } from '../data/features';
import PageHeader from './ui/PageHeader';
import PageHero from './ui/PageHero';
import PageCTA from './ui/PageCTA';
import FeatureShowcase from './features/FeatureShowcase';

interface FeaturesPageProps {
  onBackToHome?: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBackToHome }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <PageHeader 
        title="Features Overview"
        icon={Sparkles}
        onBackToHome={onBackToHome}
      />

      {/* Hero Section */}
      <PageHero 
        badge={{
          icon: Zap,
          text: "Powerful AI Features"
        }}
        title="Transform Your Content"
        highlightedTitle="With AI Intelligence"
        description="Discover how our cutting-edge AI features can revolutionize your content creation process, boost productivity, and deliver exceptional results across all your content needs."
      />

      {/* Features Grid */}
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-24"
        >
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <FeatureShowcase
                key={feature.id}
                feature={feature}
                index={index}
                isEven={isEven}
              />
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <PageCTA 
          title="Ready to Experience These Features?"
          description="Join thousands of content creators who are already transforming their workflow with our AI-powered platform."
          primaryButton={{
            text: "Start Free Trial",
            onClick: () => console.log('Start Free Trial clicked')
          }}
          secondaryButton={{
            text: "View Pricing",
            onClick: () => console.log('View Pricing clicked')
          }}
        />
      </div>
    </div>
  );
};

export default FeaturesPage; 