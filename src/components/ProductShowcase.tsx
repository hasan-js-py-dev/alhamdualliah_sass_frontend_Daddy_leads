import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import ContactRowDemo from './ContactRowDemo';
import AnimatedStars from './AnimatedStars';

const ProductShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-[#FFF5E6] via-[#FFE5D9] to-[#FFD4C4] overflow-hidden">
      <AnimatedStars />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title and Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Build Your Leads List With{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
              Daddy Leads
            </span>{' '}
            10x Cheaper & Faster
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Daddy Leads extract emails crawling thousands of sources.
          </p>
        </motion.div>

        {/* Two Column Layout - Text and Contact Demo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title, Subtitle, and Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Try Advanced{' '}
              <span className="bg-gradient-to-r from-[#0077B5] via-[#00A0DC] to-[#0077B5] bg-clip-text text-transparent">
                LinkedIn Sales Nav
              </span>{' '}
              Scraper
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Export leads from Sales Nav, bypass 2500 limitation without restricted account.
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
                Sales Nav Scraper
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Row Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            <ContactRowDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
