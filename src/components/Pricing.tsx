import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import PricingCard from './ui/PricingCard';
import AnimatedTitle from './ui/AnimatedTitle';
import { pricingPlans } from '../data/content';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-secondary-900 dark:to-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CreditCard size={16} className="inline-block mr-1" />
            Simple Pricing
          </motion.span>
          
          <AnimatedTitle 
            text="Choose the perfect plan for your needs"
            highlighted={["perfect"]}
            textSize="lg"
            className="text-center max-w-3xl mx-auto mb-6"
          />
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No hidden fees or complicated pricing structures. Just simple, transparent plans.
          </motion.p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isYearly ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)} 
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-secondary-800 ${
                isYearly ? 'bg-primary-500 dark:bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle billing frequency</span>
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`} 
              />
            </button>
            <span className={`ml-3 ${isYearly ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly <span className="text-sm text-success-500 dark:text-success-300 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isYearly={isYearly}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Pricing;