import React from 'react';
import { motion } from 'framer-motion';

export const FarmDecorations: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 z-20 pointer-events-none overflow-hidden select-none">
      {/* Left Decoration: Red Barn & Silo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-1 sm:left-6 md:left-10 bottom-1 sm:bottom-3 pointer-events-auto cursor-pointer group scale-[0.62] sm:scale-[0.85] md:scale-100 origin-bottom-left"
      >
        <motion.div
          animate={{ rotate: [-0.5, 0.8, -0.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute bottom-2 left-6 w-36 h-8 bg-[#14532d]/40 rounded-full blur-[3px]" />

          {/* Red Barn with Silo & Weather Vane SVG */}
          <svg width="155" height="150" viewBox="0 0 155 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Silo on left */}
            <rect x="8" y="48" width="28" height="92" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
            <path d="M8 48 C8 32 36 32 36 48 Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
            <line x1="8" y1="72" x2="36" y2="72" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="8" y1="96" x2="36" y2="96" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="8" y1="120" x2="36" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Red Barn Body */}
            <path
              d="M32 60 L85 24 L138 60 L138 140 L32 140 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="2.5"
            />

            {/* Gambrel Barn Roof */}
            <path
              d="M26 62 L50 36 L85 20 L120 36 L144 62 Z"
              fill="#991B1B"
              stroke="#7F1D1D"
              strokeWidth="2.5"
            />

            {/* Barn Loft Window */}
            <polygon points="85,38 72,54 98,54" fill="#FEF3C7" stroke="#991B1B" strokeWidth="1.5" />
            <line x1="85" y1="38" x2="85" y2="54" stroke="#991B1B" strokeWidth="1.2" />

            {/* Big Barn Doors with X-bracing */}
            <rect x="62" y="86" width="46" height="54" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
            <line x1="62" y1="86" x2="108" y2="140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="108" y1="86" x2="62" y2="140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="85" y1="86" x2="85" y2="140" stroke="#7F1D1D" strokeWidth="1.8" />

            {/* Weather Vane Rooster on top */}
            <line x1="85" y1="20" x2="85" y2="8" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
            <line x1="77" y1="12" x2="93" y2="12" stroke="#1C1917" strokeWidth="1.8" />
            <path d="M83 6 C83 2 87 2 87 5 C90 4 92 6 90 8 C86 9 84 8 83 6 Z" fill="#F59E0B" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Center Decoration: Wooden Fence & Sunflower Patch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-14 md:bottom-20 pointer-events-auto flex-col items-center group cursor-pointer scale-[0.58] sm:scale-[0.78] md:scale-100 origin-bottom"
      >
        <div className="relative">
          <div className="absolute bottom-2 left-6 w-96 h-10 bg-[#14532d]/40 rounded-full blur-[3px]" />

          {/* Wooden Ranch Fence with Sunflowers SVG */}
          <svg width="380" height="110" viewBox="0 0 380 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
            {/* Horizontal Fence Rails */}
            <rect x="20" y="42" width="340" height="10" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.8" />
            <rect x="20" y="68" width="340" height="10" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.8" />

            {/* Vertical Fence Posts */}
            {[40, 110, 190, 270, 340].map((postX, idx) => (
              <g key={idx}>
                <path
                  d={`M${postX - 7} 30 L${postX} 18 L${postX + 7} 30 L${postX + 7} 100 L${postX - 7} 100 Z`}
                  fill="#D97706"
                  stroke="#78350F"
                  strokeWidth="2"
                />
                <circle cx={postX} cy="47" r="1.5" fill="#451A03" />
                <circle cx={postX} cy="73" r="1.5" fill="#451A03" />
              </g>
            ))}

            {/* Sunflowers Growing Along Fence */}
            {[75, 150, 230, 305].map((sX, idx) => (
              <g key={idx}>
                {/* Stem */}
                <path d={`M${sX} 98 Q${sX + (idx % 2 === 0 ? 5 : -5)} 60 ${sX} 36`} stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
                {/* Leaves */}
                <path d={`M${sX} 68 Q${sX - 14} 62 ${sX - 16} 56 Q${sX - 6} 64 ${sX} 68`} fill="#22C55E" />
                <path d={`M${sX} 54 Q${sX + 14} 48 ${sX + 16} 42 Q${sX + 6} 50 ${sX} 54`} fill="#22C55E" />
                {/* Sunflower Petals */}
                <circle cx={sX} cy="32" r="14" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
                {/* Sunflower Center Seed Core */}
                <circle cx={sX} cy="32" r="7" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />
              </g>
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Right Decoration: Hay Bales, Wooden Cart Wheel & Fresh Carrot Garden */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-1 sm:right-6 md:right-12 bottom-1 sm:bottom-3 pointer-events-auto flex items-end gap-1.5 sm:gap-2.5 md:gap-3 scale-[0.62] sm:scale-[0.85] md:scale-100 origin-bottom-right"
      >
        {/* Carrot Garden Patch */}
        <motion.div
          whileHover={{ scale: 1.08, y: -2 }}
          className="cursor-pointer select-none relative"
        >
          <div className="w-24 h-4 bg-[#14532d]/40 rounded-full blur-[2px] translate-y-1" />
          <svg width="90" height="54" viewBox="0 0 90 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Mound Soil */}
            <ellipse cx="45" cy="40" rx="40" ry="12" fill="#78350F" stroke="#451A03" strokeWidth="1.8" />

            {/* 3 Carrots in Soil */}
            {[22, 45, 68].map((cX, idx) => (
              <g key={idx}>
                {/* Carrot Top */}
                <path d={`M${cX - 4} 34 L${cX} 44 L${cX + 4} 34 Z`} fill="#EA580C" stroke="#C2410C" strokeWidth="1.2" />
                {/* Carrot Green Foliage Leaves */}
                <path d={`M${cX} 34 Q${cX - 8} 18 ${cX - 12} 12 Q${cX - 4} 24 ${cX} 34`} fill="#22C55E" />
                <path d={`M${cX} 34 Q${cX} 14 ${cX} 8 Q${cX + 2} 22 ${cX} 34`} fill="#16A34A" />
                <path d={`M${cX} 34 Q${cX + 8} 18 ${cX + 12} 12 Q${cX + 4} 24 ${cX} 34`} fill="#22C55E" />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Golden Hay Bales with Wagon Wheel */}
        <motion.div
          whileHover={{ rotate: 3, scale: 1.05 }}
          className="cursor-pointer select-none relative"
        >
          <div className="absolute -bottom-1 left-2 w-32 h-6 bg-[#14532d]/40 rounded-full blur-[2px]" />
          <svg width="120" height="85" viewBox="0 0 120 85" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Hay Bale Bottom */}
            <rect x="10" y="44" width="60" height="34" rx="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <line x1="25" y1="44" x2="25" y2="78" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="50" y1="44" x2="50" y2="78" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Hay Bale Top Stacked */}
            <rect x="25" y="16" width="55" height="30" rx="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <line x1="40" y1="16" x2="40" y2="46" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="62" y1="16" x2="62" y2="46" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Rustic Wagon Wheel on Right */}
            <g transform="translate(82, 45)">
              <circle cx="16" cy="16" r="15" fill="#FDFBF7" stroke="#78350F" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="4" fill="#78350F" />
              <line x1="16" y1="1" x2="16" y2="31" stroke="#78350F" strokeWidth="1.8" />
              <line x1="1" y1="16" x2="31" y2="16" stroke="#78350F" strokeWidth="1.8" />
              <line x1="5" y1="5" x2="27" y2="27" stroke="#78350F" strokeWidth="1.8" />
              <line x1="5" y1="27" x2="27" y2="5" stroke="#78350F" strokeWidth="1.8" />
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
