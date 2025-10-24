import React from 'react';
import { motion } from 'framer-motion';
import footerLandscape from '@/assets/footer-landscape.png';

const FooterLandscape: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img 
          src={footerLandscape} 
          alt="Decorative landscape" 
          className="w-full h-auto object-cover"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </motion.div>
    </section>
  );
};

export default FooterLandscape;
