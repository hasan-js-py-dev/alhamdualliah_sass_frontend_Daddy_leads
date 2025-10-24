import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Rocket, Users, Instagram, Twitter, MapPin, Building2, Mail, Sparkles, Search } from 'lucide-react';

const products = [
  { 
    name: 'Apollo Scraper', 
    icon: Rocket,
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    iconBgFrom: '#f093fb',
    iconBgTo: '#f5576c'
  },
  { 
    name: 'ZoomInfo Scraper', 
    icon: Users,
    gradientFrom: '#4facfe',
    gradientTo: '#00f2fe',
    iconBgFrom: '#43e97b',
    iconBgTo: '#38f9d7'
  },
  { 
    name: 'Instagram Scraper', 
    icon: Instagram,
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
    iconBgFrom: '#ff6b6b',
    iconBgTo: '#feca57'
  },
  { 
    name: 'Twitter Scraper', 
    icon: Twitter,
    gradientFrom: '#30cfd0',
    gradientTo: '#330867',
    iconBgFrom: '#a8edea',
    iconBgTo: '#fed6e3'
  },
  { 
    name: 'Map & Directories Scraper', 
    icon: MapPin,
    gradientFrom: '#ff9a56',
    gradientTo: '#ff6a88',
    iconBgFrom: '#ffecd2',
    iconBgTo: '#fcb69f'
  },
  { 
    name: 'Crunchbase', 
    icon: Building2,
    gradientFrom: '#2193b0',
    gradientTo: '#6dd5ed',
    iconBgFrom: '#4facfe',
    iconBgTo: '#00f2fe'
  },
  { 
    name: 'Lemlist', 
    icon: Mail,
    gradientFrom: '#11998e',
    gradientTo: '#38ef7d',
    iconBgFrom: '#56ab2f',
    iconBgTo: '#a8e063'
  },
  { 
    name: 'Success AI', 
    icon: Sparkles,
    gradientFrom: '#ee0979',
    gradientTo: '#ff6a00',
    iconBgFrom: '#f857a6',
    iconBgTo: '#ff5858'
  },
  { 
    name: 'Snovio', 
    icon: Search,
    gradientFrom: '#8e2de2',
    gradientTo: '#4a00e0',
    iconBgFrom: '#c471f5',
    iconBgTo: '#fa71cd'
  },
];

const ScraperMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate products array 3 times for seamless loop
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .marquee-content {
            animation: marquee 25s linear infinite;
          }
          
          .marquee-content.paused {
            animation-play-state: paused;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .marquee-content {
              animation: none;
            }
            .marquee-wrapper {
              overflow-x: auto;
              scroll-snap-type: x mandatory;
            }
            .marquee-content > * {
              scroll-snap-align: start;
            }
          }
        `}
      </style>
      
      <div className="marquee-wrapper">
        <div 
          className={`marquee-content flex gap-6 ${isPaused ? 'paused' : ''}`}
          style={{ width: 'max-content' }}
        >
          {duplicatedProducts.map((product, index) => (
            <ProductCard
              key={`${product.name}-${index}`}
              name={product.name}
              icon={product.icon}
              gradientFrom={product.gradientFrom}
              gradientTo={product.gradientTo}
              iconBgFrom={product.iconBgFrom}
              iconBgTo={product.iconBgTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScraperMarquee;
