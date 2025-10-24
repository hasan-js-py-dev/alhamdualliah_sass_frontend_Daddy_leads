import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <motion.div
        className="absolute inset-y-0 right-0 left-1/2"
        initial={{ y: -30, opacity: 0.3 }}
        animate={{ y: 30, opacity: 0.5 }}
        transition={{ duration: 50, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 10px),' +
            'repeating-linear-gradient(60deg, rgba(59,130,246,0.04) 0px, rgba(59,130,246,0.04) 2px, transparent 2px, transparent 12px),' +
            'repeating-linear-gradient(-60deg, rgba(124,58,237,0.04) 0px, rgba(124,58,237,0.04) 2px, transparent 2px, transparent 12px)',
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  );
};

export default AnimatedLines;
