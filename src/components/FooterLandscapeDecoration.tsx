import React from 'react';
import AnimatedStars from './AnimatedStars';

const FooterLandscapeDecoration: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#B8E0F5] to-[#FFE5C8] min-h-[600px] pb-20" style={{ marginTop: '-1px' }}>
      {/* Curved transition from peachy section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20" style={{ marginTop: '-1px' }}>
        <svg
          className="relative block w-full h-[120px] md:h-[150px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="#FFBFA9"
          />
        </svg>
      </div>

      {/* Animated Stars Background with gradient overlay */}
      <div className="absolute inset-0 z-10 opacity-20" style={{ marginTop: '100px' }}>
        <AnimatedStars />
      </div>
    </section>
  );
};

export default FooterLandscapeDecoration;


