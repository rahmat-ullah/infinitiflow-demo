import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DefaultFeatureAnimationProps {
  icon: LucideIcon;
  title: string;
  bgGradient?: string;
  iconColor?: string;
}

const DefaultFeatureAnimation: React.FC<DefaultFeatureAnimationProps> = ({ 
  icon: Icon, 
  title, 
  bgGradient = "from-gray-50 to-blue-100",
  iconColor = "text-blue-600" 
}) => {
  return (
    <div className={`relative w-full h-64 bg-gradient-to-br ${bgGradient} rounded-lg overflow-hidden`}>
      {/* Central Feature Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white rounded-full p-8 shadow-xl">
          <Icon className={`w-16 h-16 ${iconColor}`} />
        </div>
      </motion.div>

      {/* Feature Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-white rounded-lg shadow-lg px-4 py-2">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
      </motion.div>

      {/* Orbiting Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white rounded-full shadow-md opacity-70"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3 + 1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            left: `${50 + 30 * Math.cos((i * Math.PI) / 3)}%`,
            top: `${50 + 30 * Math.sin((i * Math.PI) / 3)}%`,
          }}
        />
      ))}

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.3, rotate: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-4 right-4"
      >
        <Icon className={`w-8 h-8 ${iconColor} opacity-30`} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 0.3, rotate: 0 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute bottom-4 left-4"
      >
        <Icon className={`w-6 h-6 ${iconColor} opacity-30`} />
      </motion.div>

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${iconColor.replace('text-', 'bg-')} rounded-full opacity-60`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 20, 40],
            y: [0, -15, -30],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5 + 2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${70 + (i % 2) * 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default DefaultFeatureAnimation; 