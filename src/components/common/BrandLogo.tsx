import React from 'react';
import { Landmark } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false
}) => {
  const sizeMap = {
    sm: { img: 'w-6 h-6 text-[10px]', title: 'text-xs', sub: 'text-[9px]' },
    md: { img: 'w-7 h-7 sm:w-8 sm:h-8 text-xs', title: 'text-xs sm:text-sm', sub: 'text-[10px] sm:text-[11px]' },
    lg: { img: 'w-10 h-10 text-sm', title: 'text-sm sm:text-base', sub: 'text-xs' },
    xl: { img: 'w-14 h-14 text-base', title: 'text-base sm:text-lg', sub: 'text-xs sm:text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 select-none shrink-0">
        {/* Rich Gold & Emerald Gradient Monogram Seal */}
        <div
          className={`${currentSize.img} rounded-lg bg-gradient-to-br from-[#15803d] via-[#14532d] to-[#78350f] border border-[#fde047] flex items-center justify-center font-serif font-black text-[#fefae0] shadow-[0_2px_8px_rgba(20,83,45,0.35)]`}
        >
          <span className="tracking-tighter font-bold text-[#fde047] drop-shadow-xs">IS</span>
        </div>
      </div>

      {withText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-black text-[#fefae0] tracking-wide drop-shadow-xs ${currentSize.title}`}>
            Aditya Permana
          </span>
          <span className={`${currentSize.sub} text-[#86efac] font-mono font-semibold flex items-center gap-1`}>
            <Landmark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#fde047] shrink-0" />
            <span className="truncate">Rekayasa Perangkat Lunak</span>
          </span>
        </div>
      )}
    </div>
  );
};


