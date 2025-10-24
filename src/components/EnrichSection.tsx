import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import CSVEnrichDemo from './CSVEnrichDemo';
import AnimatedStars from './AnimatedStars';

const EnrichSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-[#FFD4C4] via-[#FFE5D9] to-[#FFF5E6] overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#FFF5E6]" />
      <AnimatedStars />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - CSV Enrich Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <CSVEnrichDemo />
          </motion.div>

          {/* Right Column - Title, Subtitle, and Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Never Skip{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
                A Single Contact
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Bulk email enrichment from CSV files in seconds.
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
                Try Email Enricher
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnrichSection;
