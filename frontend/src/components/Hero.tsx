import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { useThemeStore } from '../store/themeStore';
import type { Engine } from 'tsparticles-engine';
import Button from './ui/Button';
import HeroSkeleton from './ui/HeroSkeleton';
import HeroError from './ui/HeroError';
import { useHeroSection } from '../hooks/useHeroSection';

const Hero: React.FC = () => {
  const { heroData, isLoading, error, refetch } = useHeroSection();
  const { theme } = useThemeStore();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: theme === 'dark' ? "#9871D6" : "#6B46C1",
      },
      links: {
        color: theme === 'dark' ? "#9871D6" : "#6B46C1",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <HeroSkeleton />;
  }

  // Show error component if API fails
  if (error || !heroData) {
    return <HeroError error={error || 'Failed to load hero section'} onRetry={refetch} />;
  }

  // Helper function to get icon component
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'ChevronRightIcon':
        return <ChevronRightIcon size={18} />;
      default:
        return null;
    }
  };

  // Helper function to get floating element color classes
  const getFloatingElementClasses = (element: any) => {
    const baseClasses = "absolute rounded-lg p-3 shadow-lg";
    const colorClasses = {
      primary: "bg-primary-50 dark:bg-primary-900",
      success: "bg-white dark:bg-secondary-700 border border-gray-100 dark:border-secondary-600",
      accent: "bg-accent-50 dark:bg-accent-900"
    };
    
    const positionClasses = {
      'top-right': "-top-6 -right-6",
      'bottom-left': "-bottom-4 -left-4",
      'center-left': "top-1/4 -left-10"
    };

    return `${baseClasses} ${colorClasses[element.color as keyof typeof colorClasses] || colorClasses.primary} ${positionClasses[element.position as keyof typeof positionClasses] || ''}`;
  };

  // Helper function to get floating element animations
  const getFloatingElementAnimation = (position: string) => {
    switch (position) {
      case 'top-right':
        return { y: [-5, 5, -5], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
      case 'bottom-left':
        return { y: [5, -5, 5], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } };
      case 'center-left':
        return { x: [-5, 5, -5], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
      default:
        return { y: [-5, 5, -5], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Conditional particle background */}
      {heroData.theme?.particles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0 z-0"
        />
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dynamic hero content */}
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Dynamic badge */}
              {heroData.badge && (
                <span className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {heroData.badge}
                </span>
              )}
              
              {/* Dynamic title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                {heroData.title}
                {heroData.titleHighlight && (
                  <span className="text-primary-500 dark:text-primary-400"> {heroData.titleHighlight}</span>
                )}
                {heroData.subtitle && ` ${heroData.subtitle}`}
              </h1>
              
              {/* Dynamic description */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                {heroData.description}
              </p>
              
              {/* Dynamic CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg"
                  variant={heroData.primaryCTA.style}
                  rightIcon={getIconComponent(heroData.primaryCTA.icon)}
                  onClick={() => window.location.href = heroData.primaryCTA.url}
                >
                  {heroData.primaryCTA.text}
                </Button>
                
                {heroData.secondaryCTA && (
                  <Button 
                    variant={heroData.secondaryCTA.style}
                    size="lg"
                    rightIcon={getIconComponent(heroData.secondaryCTA.icon)}
                    onClick={() => window.location.href = heroData.secondaryCTA!.url}
                  >
                    {heroData.secondaryCTA.text}
                  </Button>
                )}
              </div>
              
              {/* Dynamic additional info */}
              {heroData.additionalInfo && (
                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                  {heroData.additionalInfo}
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Dynamic hero image/animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div 
              className="relative z-10 bg-white dark:bg-secondary-800 p-4 rounded-xl shadow-2xl"
              animate={heroData.theme?.animations ? { y: [0, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {heroData.heroImage && (
                <img 
                  src={heroData.heroImage}
                  alt="AI Content Generation"
                  className="rounded-lg w-full shadow-sm"
                />
              )}
              
              {/* Dynamic floating elements */}
              {heroData.floatingElements?.map((element, index) => (
                <motion.div 
                  key={element._id || index}
                  className={getFloatingElementClasses(element)}
                  animate={heroData.theme?.animations ? getFloatingElementAnimation(element.position) : {}}
                >
                  {element.type === 'badge' && (
                    <div className="flex items-center space-x-2">
                      {element.icon === 'circle' && (
                        <div className={`w-3 h-3 rounded-full ${
                          element.color === 'primary' ? 'bg-primary-400 dark:bg-primary-500' :
                          element.color === 'success' ? 'bg-success-500 dark:bg-success-600' :
                          'bg-accent-400 dark:bg-accent-500'
                        }`}></div>
                      )}
                      <span className={`text-sm font-medium ${
                        element.color === 'primary' ? 'text-primary-800 dark:text-primary-300' :
                        element.color === 'success' ? 'text-gray-800 dark:text-gray-200' :
                        'text-accent-800 dark:text-accent-300'
                      }`}>
                        {element.text}
                      </span>
                    </div>
                  )}
                  
                  {element.type === 'indicator' && (
                    <div className="flex items-center space-x-2">
                      {element.icon === 'circle' && (
                        <div className={`w-2 h-2 rounded-full ${
                          element.color === 'success' ? 'bg-success-500 dark:bg-success-600' :
                          'bg-primary-400 dark:bg-primary-500'
                        }`}></div>
                      )}
                      <span className={`text-xs font-medium ${
                        element.color === 'success' ? 'text-gray-800 dark:text-gray-200' :
                        'text-primary-800 dark:text-primary-300'
                      }`}>
                        {element.text}
                      </span>
                    </div>
                  )}
                  
                  {element.type === 'feature' && (
                    <span className={`text-xs font-medium ${
                      element.color === 'accent' ? 'text-accent-800 dark:text-accent-300' :
                      'text-primary-800 dark:text-primary-300'
                    }`}>
                      {element.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Dynamic gradient effects */}
            {heroData.theme?.gradientEffects && (
              <>
                <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-accent-200 dark:bg-accent-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse-slow"></div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;