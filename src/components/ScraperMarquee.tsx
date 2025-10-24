import React, { useState } from 'react';
import ProductCard from './ProductCard';

const products = [
  { name: 'Apollo Scraper', initials: 'AP' },
  { name: 'ZoomInfo Scraper', initials: 'ZI' },
  { name: 'Instagram Scraper', initials: 'IG' },
  { name: 'Twitter Scraper', initials: 'TW' },
  { name: 'Map & Directories Scraper', initials: 'MD' },
  { name: 'Crunchbase', initials: 'CB' },
  { name: 'Lemlist', initials: 'LL' },
  { name: 'Success AI', initials: 'SA' },
  { name: 'Snovio', initials: 'SN' },
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
              initials={product.initials}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScraperMarquee;
