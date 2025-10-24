import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className = '' }: AnimatedTitleProps) => {
  const colors = [
    'from-[#14F195] to-[#00D4FF]',
    'from-[#00D4FF] to-[#9945FF]',
    'from-[#9945FF] to-[#FF6B9D]',
    'from-[#FF6B9D] to-[#FFA500]',
    'from-[#FFA500] to-[#14F195]',
    'from-[#14F195] to-[#9945FF]',
    'from-[#9945FF] to-[#00D4FF]',
    'from-[#00D4FF] to-[#FF6B9D]',
  ];

  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, index) => {
        const colorClass = colors[index % colors.length];
        
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 2,
            }}
            className={`inline-block bg-gradient-to-r ${colorClass} bg-clip-text text-transparent animate-rainbow`}
            style={{
              animation: `letter-glow ${2 + (index % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        );
      })}
    </span>
  );
};

export default AnimatedTitle;
