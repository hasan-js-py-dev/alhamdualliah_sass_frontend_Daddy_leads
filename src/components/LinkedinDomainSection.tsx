import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import LinkedinDomainDemo from './LinkedinDomainDemo';
import AnimatedStars from './AnimatedStars';

const LinkedinDomainSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-[#FFF5E6] via-[#FFE5D9] to-[#FFD4C4] overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF5E6] to-transparent" />
      <AnimatedStars />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Right Column - LinkedIn/Domain Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="flex justify-center lg:order-2"
          >
            <LinkedinDomainDemo />
          </motion.div>

          {/* Left Column - Title, Subtitle, and Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-6 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Go Deeper:{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
                Domain & LinkedIn
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Extract real-time data from domains and LinkedIn URLs instantly.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] text-white hover:shadow-2xl transition-all duration-400 shadow-lg"
                style={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  animation: 'subtle-shake 3s ease-in-out infinite',
                }}
              >
                Domain & LinkedIn Enricher
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LinkedinDomainSection;
