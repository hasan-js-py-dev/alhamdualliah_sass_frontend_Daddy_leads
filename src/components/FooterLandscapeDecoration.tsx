import React from 'react';
import { motion } from 'framer-motion';
import AnimatedStars from './AnimatedStars';

const FooterLandscapeDecoration: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Curved transition from peachy section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
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

      {/* Animated Stars Background */}
      <AnimatedStars />

      {/* Decorative Landscape */}
      <div className="relative pt-32 pb-0 z-10">
        <svg
          className="w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hillGradient1Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A1E6B" />
              <stop offset="100%" stopColor="#2D1347" />
            </linearGradient>
            
            <linearGradient id="hillGradient2Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>

            <linearGradient id="hillGradient3Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A5F" />
              <stop offset="100%" stopColor="#0F2847" />
            </linearGradient>

            <linearGradient id="treeGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E4D2B" />
              <stop offset="100%" stopColor="#0F2818" />
            </linearGradient>

            <linearGradient id="rainbowGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="25%" stopColor="#FFD93D" />
              <stop offset="50%" stopColor="#6BCB77" />
              <stop offset="75%" stopColor="#4D96FF" />
              <stop offset="100%" stopColor="#9D4EDD" />
            </linearGradient>
          </defs>

          {/* Back purple hills */}
          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            d="M0,200 Q200,120 400,180 T800,160 Q1000,140 1200,180 T1440,200 L1440,400 L0,400 Z"
            fill="url(#hillGradient1Dark)"
          />

          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            d="M0,250 Q300,180 600,220 T1200,200 L1440,220 L1440,400 L0,400 Z"
            fill="url(#hillGradient2Dark)"
          />

          {/* Blue-tinted hills */}
          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            d="M0,280 Q240,220 480,260 T960,240 Q1200,220 1440,260 L1440,400 L0,400 Z"
            fill="url(#hillGradient3Dark)"
          />

          <motion.path
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            d="M0,320 Q360,270 720,300 T1440,290 L1440,400 L0,400 Z"
            fill="#1A3250"
          />

          {/* Trees - Left side */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Tree 1 */}
            <ellipse cx="120" cy="280" rx="35" ry="50" fill="url(#treeGradientDark)" opacity="0.9" />
            <ellipse cx="120" cy="265" rx="30" ry="40" fill="#2D5F3F" opacity="0.8" />
            <rect x="115" y="310" width="10" height="30" fill="#3D2817" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Tree 2 */}
            <ellipse cx="220" cy="260" rx="45" ry="60" fill="url(#treeGradientDark)" opacity="0.9" />
            <ellipse cx="220" cy="240" rx="38" ry="50" fill="#2D5F3F" opacity="0.8" />
            <rect x="214" y="300" width="12" height="40" fill="#3D2817" />
          </motion.g>

          {/* Trees - Right side */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Tree 3 */}
            <ellipse cx="1280" cy="265" rx="50" ry="65" fill="url(#treeGradientDark)" opacity="0.9" />
            <ellipse cx="1280" cy="245" rx="42" ry="55" fill="#2D5F3F" opacity="0.8" />
            <rect x="1273" y="310" width="14" height="45" fill="#3D2817" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Tree 4 */}
            <ellipse cx="1360" cy="285" rx="40" ry="55" fill="url(#treeGradientDark)" opacity="0.9" />
            <ellipse cx="1360" cy="270" rx="34" ry="45" fill="#2D5F3F" opacity="0.8" />
            <rect x="1354" y="320" width="12" height="35" fill="#3D2817" />
          </motion.g>

          {/* Colorful rainbow path - glowing effect */}
          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            d="M600,350 Q650,330 700,350 Q750,370 800,350 Q850,330 900,350"
            stroke="url(#rainbowGradientDark)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Glowing flowers */}
          {[
            { x: 350, y: 340, color: '#FF6B9D' },
            { x: 420, y: 355, color: '#FFD93D' },
            { x: 1050, y: 345, color: '#9D4EDD' },
            { x: 1120, y: 360, color: '#4D96FF' },
          ].map((flower, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
            >
              <circle cx={flower.x} cy={flower.y} r="8" fill={flower.color} opacity="0.9" filter="url(#glow)" />
              <circle cx={flower.x} cy={flower.y} r="4" fill="#FFD700" opacity="0.8" />
            </motion.g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default FooterLandscapeDecoration;

