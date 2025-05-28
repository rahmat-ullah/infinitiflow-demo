import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ROICalculator: React.FC = () => {
  const [contentVolume, setContentVolume] = useState<number>(10);
  const [contentCreators, setContentCreators] = useState<number>(2);
  const [avgCreatorSalary, setAvgCreatorSalary] = useState<number>(60000);
  const [results, setResults] = useState({
    currentCost: 0,
    newCost: 0,
    savings: 0,
    timesSaved: 0,
  });

  // Calculate ROI based on inputs
  useEffect(() => {
    // Assume each content piece takes 4 hours to create manually
    const hoursPerPiece = 4;
    const hoursPerMonth = contentVolume * hoursPerPiece;
    const hourlyRate = avgCreatorSalary / 2080; // 2080 = annual work hours
    
    // Current cost calculation
    const currentCost = hoursPerMonth * hourlyRate * contentCreators;
    
    // New cost with AI tool (10x faster, but still need human review)
    const newTimePerPiece = hoursPerPiece / 10;
    const newHoursPerMonth = contentVolume * newTimePerPiece;
    const newCost = (newHoursPerMonth * hourlyRate * contentCreators) + 79; // Adding Pro plan cost
    
    // Calculate savings and time multiplier
    const savings = currentCost - newCost;
    const timesSaved = hoursPerMonth / newHoursPerMonth;

    setResults({
      currentCost: Math.round(currentCost),
      newCost: Math.round(newCost),
      savings: Math.round(savings),
      timesSaved: Math.round(timesSaved),
    });
  }, [contentVolume, contentCreators, avgCreatorSalary]);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-card p-6 border border-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Calculate Your ROI</h3>
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly content pieces
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={contentVolume}
            onChange={(e) => setContentVolume(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">1</span>
            <span className="text-sm font-medium">{contentVolume}</span>
            <span className="text-xs text-gray-500">100</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of content creators
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={contentCreators}
            onChange={(e) => setContentCreators(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">1</span>
            <span className="text-sm font-medium">{contentCreators}</span>
            <span className="text-xs text-gray-500">10</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average salary per creator ($)
          </label>
          <input
            type="range"
            min="30000"
            max="120000"
            step="5000"
            value={avgCreatorSalary}
            onChange={(e) => setAvgCreatorSalary(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">$30k</span>
            <span className="text-sm font-medium">${(avgCreatorSalary / 1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-500">$120k</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Current Monthly Cost</p>
          <p className="text-2xl font-bold text-error-600">${results.currentCost}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">New Monthly Cost</p>
          <p className="text-2xl font-bold text-success-600">${results.newCost}</p>
        </div>
        <div className="text-center col-span-2">
          <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
          <p className="text-3xl font-bold text-primary-600">${results.savings}</p>
        </div>
        <div className="text-center col-span-2 bg-primary-50 p-3 rounded-lg">
          <p className="text-sm text-primary-700 mb-1">Production Speed Increase</p>
          <p className="text-2xl font-bold text-primary-700">{results.timesSaved}x faster</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ROICalculator;