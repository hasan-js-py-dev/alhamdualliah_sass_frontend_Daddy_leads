import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import EmailVerifyDemo from './EmailVerifyDemo';
import AnimatedStars from './AnimatedStars';

const EmailVerifySection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 px-6 md:px-12 pb-24 bg-gradient-to-b from-[#FFD4C4] via-[#FFE5D9] to-[#FFF5E6] overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFD4C4] to-transparent" />
      <AnimatedStars />
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Email Verify Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="flex justify-center"
          >
            <EmailVerifyDemo />
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
              Verify Emails{' '}
              <span className="bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent">
                Instantly
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Eliminate bounces and protect your sender reputation with real-time email verification.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className="text-white hover:shadow-2xl transition-all duration-400 shadow-lg"
                style={{
                  background: '#ff9c6f',
                  transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  animation: 'subtle-shake 3s ease-in-out infinite',
                }}
              >
                Verify Email for Better Deliverability
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20" style={{ transform: 'translateY(1px)' }}>
        <svg className="relative block w-full h-[80px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z" 
                fill="#f9fafb"></path>
        </svg>
      </div>
    </section>
  );
};

export default EmailVerifySection;
