import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroTextSection from './HeroTextSection';
import ContactDemo from './ContactDemo';
import AnimatedLines from './AnimatedLines';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/login');
  };

  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatedLines />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none z-20" />
        
        <div className="relative z-30 grid md:grid-cols-2 gap-12 items-center min-h-[560px]">
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
