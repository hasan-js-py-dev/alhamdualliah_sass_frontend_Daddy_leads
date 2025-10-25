import React from 'react';
import { motion } from 'framer-motion';
import HeroTextSection from './HeroTextSection';
import ContactDemo from './ContactDemo';
import AnimatedLines from './AnimatedLines';
import AnimatedBackground from './AnimatedBackground';
import { SIGNUP_URL } from '@/config/domains';

const HeroSection = () => {
  const handleCTAClick = () => {
    window.location.href = SIGNUP_URL;
  };

  return (
    <section className="relative pt-32 pb-16 px-6 md:px-12 min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedBackground />
        <AnimatedLines />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none z-20" />
        
        <div className="relative z-30 grid md:grid-cols-2 gap-12 items-center min-h-[480px]">
          <HeroTextSection onCTAClick={handleCTAClick} />
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
