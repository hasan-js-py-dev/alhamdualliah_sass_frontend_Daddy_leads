import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProductCardProps {
  name: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconBgFrom: string;
  iconBgTo: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  name, 
  icon: Icon, 
  gradientFrom, 
  gradientTo,
  iconBgFrom,
  iconBgTo 
}) => {
  return (
    <div 
      className="flex-shrink-0 w-[280px] h-[200px] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 border border-white/10 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
      }}
      tabIndex={0}
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${iconBgFrom}, ${iconBgTo})`
        }}
      >
        <Icon size={32} strokeWidth={2} />
      </div>
      <h3 className="text-white font-semibold text-lg text-center px-4 drop-shadow-lg">
        {name}
      </h3>
    </div>
  );
};

export default ProductCard;
