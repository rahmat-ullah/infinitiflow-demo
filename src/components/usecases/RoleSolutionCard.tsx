import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RoleSolution } from '../../types/usecases';

interface RoleSolutionCardProps {
  solution: RoleSolution;
  index: number;
}

const RoleSolutionCard: React.FC<RoleSolutionCardProps> = ({ solution, index }) => {
  const IconComponent = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-secondary-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400">
          <IconComponent size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{solution.title}</h3>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{solution.description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Features:</h4>
          <div className="space-y-2">
            {solution.features.slice(0, 3).map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-green-500 dark:text-success-300 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{feature}</span>
              </div>
            ))}
            {solution.features.length > 3 && (
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                +{solution.features.length - 3} more features
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Common Use Cases:</h4>
          <div className="flex flex-wrap gap-2">
            {solution.useCases.map((useCase, useCaseIndex) => (
              <span
                key={useCaseIndex}
                className="px-3 py-1 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        className="w-full mt-6 flex items-center justify-center space-x-2 py-3 px-4 border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-primary-800 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Explore Solutions for {solution.title}</span>
        <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
};

export default RoleSolutionCard; 