import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import Button from './Button';
import { PricingPlan } from '../../types';

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: plan.id === 'starter' ? 0 : plan.id === 'professional' ? 0.1 : 0.2 }}
      className={`rounded-xl overflow-hidden border ${
        plan.popular 
          ? 'bg-white dark:bg-secondary-800 border-primary-500 dark:border-primary-600 shadow-feature' 
          : 'bg-white dark:bg-secondary-900 border-gray-200 dark:border-gray-700 shadow-card'
      }`}
    >
      {plan.popular && (
        <div className="bg-primary-500 dark:bg-primary-600 text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            ${isYearly ? plan.price.yearly / 10 : plan.price.monthly}
          </span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
          {isYearly && (
            <span className="ml-2 text-sm bg-success-50 dark:bg-success-700 dark:bg-opacity-30 text-success-700 dark:text-success-300 px-2 py-1 rounded">
              Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(0)}
            </span>
          )}
        </div>
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckIcon size={18} className="text-success-500 dark:text-success-300 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
        <Button
          variant={plan.popular ? 'primary' : 'outline'}
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;