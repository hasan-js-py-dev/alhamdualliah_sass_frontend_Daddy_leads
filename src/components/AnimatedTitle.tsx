import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className = '' }: AnimatedTitleProps) => {
  const gradients = [
    'from-[#14F195] via-[#00D4FF] to-[#9945FF]',
    'from-[#FF6B9D] via-[#FFA500] to-[#FFD700]',
    'from-[#9945FF] via-[#FF6B9D] to-[#00D4FF]',
    'from-[#00D4FF] via-[#14F195] to-[#9945FF]',
  ];

  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [gradients.length]);

  return (
    <motion.span
      animate={{
        rotate: [0, -1, 1, -1, 0],
        y: [0, -2, 0, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`inline-block bg-gradient-to-r ${gradients[currentGradient]} bg-clip-text text-transparent transition-all duration-1000 ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 4s ease infinite',
      }}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedTitle;
