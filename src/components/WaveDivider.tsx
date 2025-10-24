import React from 'react';

interface WaveDividerProps {
  position: 'top' | 'bottom';
  fillColor?: string;
  backgroundColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ 
  position, 
  fillColor = '#000000',
  backgroundColor = 'transparent'
}) => {
  const isTop = position === 'top';
  
  return (
    <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 w-full overflow-hidden leading-none ${isTop ? 'z-20' : 'z-10'}`}>
      <svg
        className="relative block w-full h-[80px] md:h-[100px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform: isTop ? 'rotate(180deg)' : 'none' }}
      >
        <path
          d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
