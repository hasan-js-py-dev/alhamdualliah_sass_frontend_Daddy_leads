import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

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
        <span className="bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent animate-gradient">
          Apify Alternative,
        </span>
        <br />
        <span
          className="text-white"
          style={{ textShadow: '0 1px 1px rgba(0,0,0,0.45)' }}
        >
          Automate Your B2B Prospecting Effortlessly
        </span>
      </h1>
      <p className="text-xl text-white/80 leading-relaxed">
        Daddy Leads lets you automate your B2B prospecting with powerful
        scraping and enrichment tools.
      </p>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={onCTAClick}
          className="relative bg-gradient-to-r from-[#5B6FF9] to-[#7C5CFC] text-white text-[18px] px-12 py-7 rounded-xl font-bold shadow-2xl transition-all duration-300 overflow-hidden hover:from-[#6B7FFA] hover:to-[#8C6CFD]"
          style={{
            boxShadow:
              '0 4px 20px rgba(91, 111, 249, 0.4), 0 0 0 1px rgba(124, 92, 252, 0.1)',
          }}
        >
          <span className="relative z-10">Export Your Leads</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroTextSection;
