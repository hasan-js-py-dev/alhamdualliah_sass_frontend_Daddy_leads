import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import AnimatedTitle from './AnimatedTitle';

interface HeroTextSectionProps {
  onCTAClick: () => void;
}

const HeroTextSection = ({ onCTAClick }: HeroTextSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        <AnimatedTitle text="Apify Alternative," />
        <br />
        <AnimatedTitle text="Automate Your B2B Prospecting Effortlessly" />
      </h1>
      <p className="text-xl text-white/80 leading-relaxed">
        Daddy Leads lets you automate your B2B prospecting with powerful
        scraping and enrichment tools.
      </p>
      <motion.div
        animate={{
          rotate: [0, -0.2, 0.2, -0.2, 0],
          y: [0, -0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.2, 1],
          repeatType: "loop",
        }}
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1, ease: [0.4, 0.0, 0.2, 1] }
        }}
        style={{ willChange: 'transform' }}
      >
        <Button
          onClick={onCTAClick}
          className="relative bg-gradient-to-r from-[#5B6FF9] to-[#7C5CFC] text-white text-[18px] px-12 py-7 rounded-xl font-bold shadow-2xl overflow-hidden hover:from-[#6B7FFA] hover:to-[#8C6CFD]"
          style={{
            boxShadow:
              '0 4px 20px rgba(91, 111, 249, 0.4), 0 0 0 1px rgba(124, 92, 252, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
            willChange: 'transform, box-shadow',
          }}
        >
          <span className="relative z-10">Export Your Leads</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroTextSection;
