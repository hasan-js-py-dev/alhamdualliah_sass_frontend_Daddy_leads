import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  source: 'g2' | 'chrome_web_store';
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  title,
  company,
  avatar,
  rating,
  review,
  source,
  date
}) => {
  return (
    <div className="flex-shrink-0 w-[380px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-orange-100/50 hover:scale-105">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={avatar} 
          alt={name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-200"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{company}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
        {review}
      </p>
    </div>
  );
};

export default ReviewCard;
