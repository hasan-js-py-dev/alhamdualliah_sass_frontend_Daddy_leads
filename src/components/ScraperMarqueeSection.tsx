import React from 'react';
import { motion } from 'framer-motion';
import WaveDivider from './WaveDivider';
import ScraperMarquee from './ScraperMarquee';
import AnimatedStars from './AnimatedStars';

const ScraperMarqueeSection: React.FC = () => {
  return (
    <section className="relative -mt-4">
      {/* Black section with curves and stars */}
      <div className="relative bg-black overflow-hidden" style={{ minHeight: '500px', paddingTop: '120px', paddingBottom: '120px' }}>
        {/* Top wave curve - transitioning from gray-50 */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[100px] md:h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>

        {/* Animated Stars Background */}
        <AnimatedStars />
        
        {/* Content */}
        <div className="relative z-10 px-6">
          {/* Title inside black section */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          >
            Try Our{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
              Scraper
            </span>
          </motion.h2>

          {/* Marquee */}
          <div className="flex items-center justify-center">
            <ScraperMarquee />
          </div>
        </div>
        
        {/* Bottom wave curve - transitioning to next section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[100px] md:h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ScraperMarqueeSection;
