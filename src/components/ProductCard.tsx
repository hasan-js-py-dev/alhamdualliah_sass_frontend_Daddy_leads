import React from 'react';

interface ProductCardProps {
  name: string;
  initials: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, initials }) => {
  return (
    <div 
      className="flex-shrink-0 w-[280px] h-[200px] rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 border border-gray-700/50"
      tabIndex={0}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {initials}
      </div>
      <h3 className="text-white font-semibold text-lg text-center px-4">
        {name}
      </h3>
    </div>
  );
};

export default ProductCard;
