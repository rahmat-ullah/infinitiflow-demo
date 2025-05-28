import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { UseCase } from '../../types/usecases';

interface UseCaseCardProps {
  useCase: UseCase;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (useCase: UseCase) => void;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, isHovered, onHover, onClick }) => {
  const IconComponent = useCase.icon;

  return (
    <motion.div
      className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
        useCase.featured 
          ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-blue-50' 
          : 'border-gray-200 bg-white hover:border-primary-200'
      } ${isHovered ? 'shadow-xl scale-105' : 'shadow-lg hover:shadow-xl'}`}
      whileHover={{ y: -4 }}
      onMouseEnter={() => onHover(useCase.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(useCase)}
    >
      {useCase.featured && (
        <div className="absolute -top-3 left-6">
          <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <div className="flex items-start space-x-4 mb-4">
        <div className={`p-3 rounded-lg ${
          useCase.featured 
            ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white' 
            : 'bg-primary-100 text-primary-600'
        }`}>
          <IconComponent size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {useCase.metrics.slice(0, 3).map((metric, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-lg font-bold text-gray-900">{metric.value}</span>
            </div>
            <span className="text-xs text-gray-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Benefits Preview */}
      <div className="space-y-2 mb-4">
        {useCase.benefits.slice(0, 2).map((benefit, index) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
        {useCase.benefits.length > 2 && (
          <span className="text-sm text-primary-600 font-medium">
            +{useCase.benefits.length - 2} more benefits
          </span>
        )}
      </div>

      <motion.button
        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Explore {useCase.title}</span>
        <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
};

export default UseCaseCard; 