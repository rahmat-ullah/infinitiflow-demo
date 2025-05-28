import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  highlighted?: string[];
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  text, 
  className = '',
  highlighted = [], 
  textSize = 'lg'
}) => {
  const words = text.split(' ');
  
  // Split sentence into words with highlighted words
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08,
      },
    },
  };
  
  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const textSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };
  
  return (
    <motion.div
      className={`${textSizes[textSize]} font-bold tracking-tight ${className}`}
      variants={sentence}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((item, index) => {
        const isHighlighted = highlighted.includes(item);
        return (
          <motion.span
            key={index}
            className={`inline-block mr-2 ${isHighlighted ? 'text-primary-500' : ''}`}
            variants={word}
          >
            {item}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default AnimatedTitle;