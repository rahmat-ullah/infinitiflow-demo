import React from 'react';
import { motion } from 'framer-motion';
import { Link2Icon } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import { integrationLogos } from '../data/content';

const Integrations: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link2Icon size={16} className="inline-block mr-1" />
            Seamless Integrations
          </motion.span>
          
          <AnimatedTitle 
            text="Works with your favorite tools"
            highlighted={["favorite"]}
            textSize="md"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect with your existing workflow and favorite platforms.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {integrationLogos.map((logo, index) => (
            <motion.div
              key={logo.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: index * 0.1 }}
              className="p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={logo.logoUrl}
                alt={logo.name}
                className="h-12 w-auto mx-auto dark:invert"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations;