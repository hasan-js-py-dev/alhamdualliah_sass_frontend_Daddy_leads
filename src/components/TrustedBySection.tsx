import React from 'react';
import { motion } from 'framer-motion';

interface TrustedBySectionProps {
  activeIndex: number;
}

const TrustedBySection = ({ activeIndex }: TrustedBySectionProps) => {
  const logos = [
    { name: 'Clay', url: 'https://clay.earth' },
    { name: 'ContactOut', url: 'https://contactout.com' },
    { name: 'Skrapp', url: 'https://skrapp.io' },
    { name: 'MillionVerifier', url: 'https://millionverifier.com' },
    { name: 'ZeroBounce', url: 'https://zerobounce.net' },
    { name: 'Apollo', url: 'https://apollo.io' },
    { name: 'ZoomInfo', url: 'https://zoominfo.com' },
    { name: 'Clearout', url: 'https://clearout.io' },
  ];

  const brandGradients: Record<string, string> = {
    Clay: 'from-emerald-400 to-teal-300',
    ContactOut: 'from-sky-400 to-cyan-300',
    Skrapp: 'from-fuchsia-400 to-violet-400',
    MillionVerifier: 'from-amber-300 to-orange-400',
    ZeroBounce: 'from-rose-400 to-red-400',
    Apollo: 'from-indigo-400 to-blue-400',
    ZoomInfo: 'from-lime-300 to-emerald-400',
    Clearout: 'from-purple-400 to-pink-400',
  };

  return (
    <section className="relative px-6 md:px-12 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center uppercase tracking-wide text-white/70 text-xs mb-3"
        >
          Trusted by
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-3 justify-center items-center whitespace-nowrap pb-2">
            {logos.map((logo, index) => {
              const gradient = brandGradients[logo.name] ?? 'from-white to-white';
              return (
                <motion.a
                  key={logo.name}
                  href={logo.url}
                  aria-label={`${logo.name} website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{
                    scale: activeIndex === index ? 1.05 : 1,
                    opacity: activeIndex === index ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center justify-center px-4 py-1.5 rounded-lg whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r ${gradient} hover:scale-[1.04] transition-transform duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-white/70`}
                >
                  <span className="text-sm font-semibold tracking-tight">
                    {logo.name}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
