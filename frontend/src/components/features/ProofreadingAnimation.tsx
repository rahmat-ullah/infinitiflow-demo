import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';

const ProofreadingAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-red-50 to-pink-100 rounded-lg overflow-hidden">
      {/* Document with errors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-52 h-44 bg-white rounded-lg shadow-lg p-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-red-600" />
          <span className="text-xs font-semibold text-gray-700">Document Review</span>
        </div>
        
        <div className="space-y-2 text-xs text-gray-700">
          <div>
            The company <span className="bg-red-200 text-red-800">recieved</span> many applications.
          </div>
          <div>
            We need to <span className="bg-yellow-200 text-yellow-800">analize</span> the data carefully.
          </div>
          <div>
            <span className="bg-blue-200 text-blue-800">Their</span> going to the meeting tomorrow.
          </div>
          <div>
            The project was <span className="bg-green-200 text-green-800">very successful</span>.
          </div>
        </div>

        {/* Scanning effect */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 200, opacity: 1 }}
          transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1 h-full bg-red-500 opacity-50"
        />
      </motion.div>

      {/* Error indicators */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-4 right-4 space-y-3"
      >
        {/* Spelling Error */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-2 w-32"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3 h-3 text-red-600" />
            <span className="text-xs font-medium text-red-600">Spelling</span>
          </div>
          <div className="text-xs text-gray-600">
            "recieved" → "received"
          </div>
        </motion.div>

        {/* Grammar Error */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-2 w-32"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3 h-3 text-yellow-600" />
            <span className="text-xs font-medium text-yellow-600">Grammar</span>
          </div>
          <div className="text-xs text-gray-600">
            "Their" → "They're"
          </div>
        </motion.div>

        {/* Style Suggestion */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-2 w-32"
        >
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Style</span>
          </div>
          <div className="text-xs text-gray-600">
            Consider "extremely successful"
          </div>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div className="bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Proofreading Progress</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ delay: 4, duration: 1.5 }}
              className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>4 issues found</span>
            <span>85% complete</span>
          </div>
        </div>
      </motion.div>

      {/* Error count badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="absolute top-12 left-60 flex gap-1"
      >
        <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          2
        </div>
        <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          1
        </div>
        <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          1
        </div>
      </motion.div>

      {/* Floating correction marks */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4 + 5,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${15 + i * 18}%`,
            top: `75%`,
          }}
        >
          {i % 3 === 0 ? '✓' : i % 3 === 1 ? '⚠️' : '💡'}
        </motion.div>
      ))}
    </div>
  );
};

export default ProofreadingAnimation; 