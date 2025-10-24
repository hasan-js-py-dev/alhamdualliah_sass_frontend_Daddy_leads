import React from 'react';
import { motion } from 'framer-motion';

const FooterLandscapeDecoration: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Curved transition from peachy section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[100px] md:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="rgb(255, 191, 169)"
          />
        </svg>
      </div>

      {/* Decorative Landscape */}
      <div className="relative pt-20 pb-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sky gradient background */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#FFE5D9" />
            </linearGradient>
            
            <linearGradient id="hillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD4C4" />
              <stop offset="100%" stopColor="#FFB8A0" />
            </linearGradient>
            
            <linearGradient id="hillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#90EE90" />
              <stop offset="100%" stopColor="#7CCD7C" />
            </linearGradient>

            <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D5F3F" />
              <stop offset="100%" stopColor="#1E4D2B" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="1440" height="400" fill="url(#skyGradient)" />

          {/* Back pink hills */}
          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            d="M0,200 Q200,120 400,180 T800,160 Q1000,140 1200,180 T1440,200 L1440,400 L0,400 Z"
            fill="url(#hillGradient1)"
          />

          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            d="M0,250 Q300,180 600,220 T1200,200 L1440,220 L1440,400 L0,400 Z"
            fill="#FFC4B0"
          />

          {/* Green hills */}
          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            d="M0,280 Q240,220 480,260 T960,240 Q1200,220 1440,260 L1440,400 L0,400 Z"
            fill="url(#hillGradient2)"
          />

          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            d="M0,320 Q360,270 720,300 T1440,290 L1440,400 L0,400 Z"
            fill="#7FBF7F"
          />

          {/* Trees - Left side */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Tree 1 */}
            <ellipse cx="120" cy="280" rx="35" ry="50" fill="url(#treeGradient)" />
            <ellipse cx="120" cy="265" rx="30" ry="40" fill="#3A7D4F" />
            <rect x="115" y="310" width="10" height="30" fill="#8B4513" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Tree 2 */}
            <ellipse cx="220" cy="260" rx="45" ry="60" fill="url(#treeGradient)" />
            <ellipse cx="220" cy="240" rx="38" ry="50" fill="#3A7D4F" />
            <rect x="214" y="300" width="12" height="40" fill="#8B4513" />
          </motion.g>

          {/* Trees - Right side */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Tree 3 */}
            <ellipse cx="1280" cy="265" rx="50" ry="65" fill="url(#treeGradient)" />
            <ellipse cx="1280" cy="245" rx="42" ry="55" fill="#3A7D4F" />
            <rect x="1273" y="310" width="14" height="45" fill="#8B4513" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Tree 4 */}
            <ellipse cx="1360" cy="285" rx="40" ry="55" fill="url(#treeGradient)" />
            <ellipse cx="1360" cy="270" rx="34" ry="45" fill="#3A7D4F" />
            <rect x="1354" y="320" width="12" height="35" fill="#8B4513" />
          </motion.g>

          {/* Colorful rainbow path */}
          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            d="M600,350 Q650,330 700,350 Q750,370 800,350 Q850,330 900,350"
            stroke="url(#rainbowGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="25%" stopColor="#FFD93D" />
              <stop offset="50%" stopColor="#6BCB77" />
              <stop offset="75%" stopColor="#4D96FF" />
              <stop offset="100%" stopColor="#9D4EDD" />
            </linearGradient>
          </defs>

          {/* Flowers */}
          {[
            { x: 350, y: 340 },
            { x: 420, y: 355 },
            { x: 1050, y: 345 },
            { x: 1120, y: 360 },
          ].map((flower, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
            >
              <circle cx={flower.x} cy={flower.y} r="8" fill="#FF6B9D" />
              <circle cx={flower.x} cy={flower.y} r="4" fill="#FFD700" />
            </motion.g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default FooterLandscapeDecoration;
