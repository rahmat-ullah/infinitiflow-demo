import React from 'react';

const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content skeleton */}
          <div className="text-center lg:text-left">
            <div className="animate-pulse">
              {/* Badge skeleton */}
              <div className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full mb-4 h-6 w-48"></div>
              
              {/* Title skeleton */}
              <div className="space-y-3 mb-6">
                <div className="h-8 md:h-10 lg:h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                <div className="h-8 md:h-10 lg:h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-4/5"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2 mb-8">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              
              {/* Buttons skeleton */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-40"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
              </div>
              
              {/* Additional info skeleton */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto lg:mx-0"></div>
            </div>
          </div>
          
          {/* Hero image skeleton */}
          <div className="relative animate-pulse">
            <div className="relative z-10 bg-gray-200 dark:bg-gray-700 p-4 rounded-xl shadow-2xl">
              <div className="rounded-lg w-full h-64 md:h-80 bg-gray-300 dark:bg-gray-600"></div>
              
              {/* Floating elements skeleton */}
              <div className="absolute -top-6 -right-6 bg-gray-200 dark:bg-gray-700 rounded-lg p-3 shadow-lg w-24 h-12"></div>
              <div className="absolute -bottom-4 -left-4 bg-gray-200 dark:bg-gray-700 rounded-lg p-2 shadow-lg w-28 h-10"></div>
              <div className="absolute top-1/4 -left-10 bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-2 shadow-lg w-20 h-8"></div>
            </div>
            
            {/* Background gradient effects skeleton */}
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gray-200 dark:bg-gray-700 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gray-200 dark:bg-gray-700 rounded-full opacity-15 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton; 