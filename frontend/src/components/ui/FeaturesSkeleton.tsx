import React from 'react';

const FeaturesSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge skeleton */}
          <div className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full mb-4 h-6 w-48 animate-pulse"></div>
          
          {/* Title skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-8 md:h-10 lg:h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mx-auto animate-pulse"></div>
            <div className="h-8 md:h-10 lg:h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mx-auto animate-pulse"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-16">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        </div>
        
        {/* Features grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-secondary-700 animate-pulse"
            >
              {/* Icon skeleton */}
              <div className="mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-12 h-12"></div>
              
              {/* Title skeleton */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Features Button skeleton */}
        <div className="text-center mt-16 animate-pulse">
          <div className="inline-flex h-14 bg-gray-200 dark:bg-gray-700 rounded-xl w-64"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mt-3"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSkeleton; 