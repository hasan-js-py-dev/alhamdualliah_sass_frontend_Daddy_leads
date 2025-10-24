import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface FeaturePillsProps {
  features: Feature[];
  activeIndex: number;
}

const FeaturePills = ({ features, activeIndex }: FeaturePillsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="overflow-x-auto scrollbar-hide"
    >
      <div className="flex gap-3 justify-center items-center whitespace-nowrap pb-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              animate={{
                scale: activeIndex === index ? 1.05 : 1,
                opacity: activeIndex === index ? 1 : 0.85,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            >
              <Icon className="w-5 h-5 bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent animate-rainbow" />
              <span className="text-[20px] font-semibold bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent animate-rainbow">
                {feature.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FeaturePills;
