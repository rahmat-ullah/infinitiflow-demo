import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react'; // Keep ChevronRightIcon
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { useThemeStore } from '../store/themeStore'; // Import theme store
import type { Engine } from 'tsparticles-engine';
import Button from './ui/Button';

const Hero: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const { theme } = useThemeStore(); // Get current theme

  const particleOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: theme === 'dark' ? "#9871D6" : "#6B46C1", // primary-400 for dark, primary-500 for light
      },
      links: {
        color: theme === 'dark' ? "#9871D6" : "#6B46C1", // primary-400 for dark, primary-500 for light
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
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
  }; // End of particleOptions

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Particle background needs to be outside the main container for full width */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute inset-0 z-0"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
                AI-Powered Content Generation
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                Create <span className="text-primary-500 dark:text-primary-400">exceptional content</span> in seconds
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Leverage AI to produce high-quality, engaging content 10x faster than traditional methods.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg"
                  rightIcon={<ChevronRightIcon size={18} />}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                No credit card required • Free 14-day trial
              </div>
            </motion.div>
          </div>
          
          {/* Hero image/animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div 
              className="relative z-10 bg-white dark:bg-secondary-800 p-4 rounded-xl shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <img 
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="AI Content Generation"
                className="rounded-lg w-full shadow-sm"
              />
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-primary-50 dark:bg-primary-900 rounded-lg p-3 shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary-400 dark:bg-primary-500"></div>
                  <span className="text-sm font-medium text-primary-800 dark:text-primary-300">AI Writing</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white dark:bg-secondary-700 rounded-lg p-2 shadow-lg border border-gray-100 dark:border-secondary-600"
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success-500 dark:bg-success-600"></div>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Smart Templates</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/4 -left-10 bg-accent-50 dark:bg-accent-900 rounded-lg px-3 py-2 shadow-lg"
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <span className="text-xs font-medium text-accent-800 dark:text-accent-300">SEO Optimizer</span>
              </motion.div>
            </motion.div>
            
            {/* Background gradient effects */}
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-accent-200 dark:bg-accent-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15 animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;