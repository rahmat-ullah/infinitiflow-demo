import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { LineChart, TrendingUp } from 'lucide-react';
import { stats } from '../data/content';

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-primary-500 text-white dark:bg-secondary-800 dark:text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white bg-opacity-20 dark:bg-secondary-700 dark:bg-opacity-50 px-4 py-2 rounded-full mb-4 text-white dark:text-gray-200"
          >
            <LineChart size={18} />
            <span className="font-medium">The Numbers Don't Lie</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-gray-100"
          >
            Transforming content creation with AI
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white text-opacity-80 dark:text-gray-300 dark:text-opacity-100 max-w-2xl mx-auto"
          >
            See the impact our platform has on businesses around the world.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white bg-opacity-10 dark:bg-secondary-700 dark:bg-opacity-40 rounded-xl p-6 backdrop-blur-sm hover:bg-opacity-15 dark:hover:bg-opacity-60 transition-all"
            >
              <div className="text-4xl font-bold flex items-end text-white dark:text-gray-100">
                <CountUp 
                  end={stat.value} 
                  duration={2.5}
                  enableScrollSpy 
                  scrollSpyOnce
                />
                <span className="text-primary-200 dark:text-primary-400 ml-1">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-white text-opacity-80 dark:text-gray-300 dark:text-opacity-100">{stat.label}</p>
              <div className="mt-4 flex items-center text-primary-200 dark:text-primary-400">
                <TrendingUp size={16} />
                <span className="ml-1 text-sm">Proven Results</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;