import React from 'react';
import { motion } from 'framer-motion';
import WaveDivider from './WaveDivider';
import ScraperMarquee from './ScraperMarquee';

const ScraperMarqueeSection: React.FC = () => {
  return (
    <section className="relative">
      {/* Title above the black section */}
      <div className="relative bg-gray-50 pt-16 pb-24 px-6 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8"
        >
          Try Our{' '}
          <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
            Scraper
          </span>
        </motion.h2>
      </div>

      {/* Black section with curves */}
      <div className="relative bg-black" style={{ height: '400px' }}>
        {/* Top wave curve */}
        <WaveDivider position="top" fillColor="#000000" />
        
        {/* Marquee content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <ScraperMarquee />
        </div>
        
        {/* Bottom wave curve */}
        <WaveDivider position="bottom" fillColor="#000000" />
      </div>
    </section>
  );
};

export default ScraperMarqueeSection;
