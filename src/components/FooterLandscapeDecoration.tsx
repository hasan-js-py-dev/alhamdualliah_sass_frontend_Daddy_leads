import React from 'react';
import AnimatedStars from './AnimatedStars';

const FooterLandscapeDecoration: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFBFA9] min-h-[600px] pb-20" style={{ marginTop: '-1px' }}>
      {/* Curved transition from peachy section - positioned right after cookie section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ marginTop: '0px' }}>
        <svg
          className="relative block w-full h-[120px] md:h-[150px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Animated Stars Background - positioned behind the curve */}
      <div className="absolute inset-0 z-10 bg-black" style={{ marginTop: '100px' }}>
        <AnimatedStars />
      </div>
    </section>
  );
};

export default FooterLandscapeDecoration;


