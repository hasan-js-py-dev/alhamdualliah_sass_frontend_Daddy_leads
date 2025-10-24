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
      <div className="flex gap-4 justify-center items-center whitespace-nowrap pb-4">
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
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="text-[22px] font-medium text-white">
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
