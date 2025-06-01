import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  icon: LucideIcon;
  onBackToHome?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon: Icon, onBackToHome }) => {
  return (
    <div className="bg-white dark:bg-secondary-900 shadow-sm border-b border-gray-100 dark:border-secondary-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Home
          </button>
          <div className="flex items-center space-x-2">
            <Icon className="text-primary-600 dark:text-primary-400" size={24} />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader; 