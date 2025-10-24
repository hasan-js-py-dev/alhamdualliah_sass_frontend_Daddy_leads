import React from 'react';

const WaveTransition = () => (
  <div className="absolute inset-x-0 bottom-0 z-30 pointer-events-none">
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full h-24 md:h-32"
    >
      <path
        d="M0,64 C240,100 480,100 720,64 C960,28 1200,28 1440,64 L1440,120 L0,120 Z"
        fill="#FFFFFF"
      />
    </svg>
  </div>
);

export default WaveTransition;
