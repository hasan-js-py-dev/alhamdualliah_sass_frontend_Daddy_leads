import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import CSVEnrichDemo from './CSVEnrichDemo';

const EnrichSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-[#FFD4C4] via-[#FFE5D9] to-[#FFF5E6]">
      <div className="max-w-7xl mx-auto">
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
              Enrich{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
                Unlimited Number
              </span>{' '}
              Of Emails
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Try enricher don't skip a single contacts.
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
