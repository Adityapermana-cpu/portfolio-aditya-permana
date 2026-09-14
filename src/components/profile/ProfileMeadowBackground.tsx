import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileMeadowBackgroundProps {
  isHarvesting: boolean;
}

export const ProfileMeadowBackground: React.FC<ProfileMeadowBackgroundProps> = ({ isHarvesting }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Terraced Farmland Gradient Waves */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-70"
        >
          <path
            d="M-100,80 Q420,220 880,100 T1540,180 L1540,900 L-100,900 Z"
            fill="#dcfce7"
          />
          <path
            d="M-100,280 Q520,420 1020,260 T1540,380 L1540,900 L-100,900 Z"
            fill={isHarvesting ? '#bbf7d0' : '#d1fae5'}
            opacity="0.85"
          />
          <path
            d="M-100,520 Q360,660 920,480 T1540,620 L1540,900 L-100,900 Z"
            fill={isHarvesting ? '#86efac' : '#a7f3d0'}
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Crop Furrows & Irrigation Contour Lines */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <path
          d="M0,140 Q460,250 940,160 T1440,240"
          stroke="#15803d"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,340 Q560,460 1040,320 T1440,420"
          stroke="#166534"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,580 Q400,680 960,540 T1440,640"
          stroke="#14532d"
          strokeWidth="1.5"
        />
      </svg>

      {/* Harvest celebration irrigation water patches */}
      {isHarvesting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full">
            <g stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" opacity="0.65">
              <path d="M120,680 Q180,695 240,670 T320,710" />
              <path d="M720,720 Q800,750 880,715 T960,760" />
              <path d="M450,780 Q520,810 590,790" />
            </g>

            {/* Fresh Irrigation Water Ponds */}
            <ellipse cx="380" cy="540" rx="160" ry="40" fill="#38bdf8" opacity="0.3" />
            <ellipse cx="960" cy="610" rx="210" ry="45" fill="#22c55e" opacity="0.25" />
            <ellipse cx="200" cy="730" rx="125" ry="30" fill="#38bdf8" opacity="0.35" />
            <ellipse cx="720" cy="780" rx="140" ry="32" fill="#22c55e" opacity="0.2" />
          </svg>
        </motion.div>
      )}

      {/* Grain Silo & Golden Hay Stack Decoration */}
      <div className="absolute bottom-16 right-10 sm:right-28 opacity-90 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isHarvesting ? (
            <motion.div
              key="silo-intact"
              initial={{ scale: 0.8, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <svg width="110" height="95" viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <ellipse cx="55" cy="85" rx="50" ry="9" fill="#15803d" opacity="0.3" />
                {/* Hay Stacks */}
                <rect x="22" y="46" width="66" height="34" rx="4" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
                <line x1="44" y1="46" x2="44" y2="80" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="66" y1="46" x2="66" y2="80" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Mini Silo Tower */}
                <rect x="16" y="24" width="24" height="56" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
                <path d="M16 24 C16 12 40 12 40 24 Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
                {/* Pumpkin on right */}
                <circle cx="82" cy="72" r="12" fill="#F97316" stroke="#EA580C" strokeWidth="1.8" />
                <ellipse cx="82" cy="72" rx="7" ry="12" fill="#FB923C" stroke="#EA580C" strokeWidth="1.2" />
                <path d="M82 60 L84 56" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="harvest-bounty-baskets"
              initial={{ scale: 0.8, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            >
              <svg width="110" height="95" viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <ellipse cx="55" cy="82" rx="52" ry="12" fill="#15803d" opacity="0.4" />
                {/* Overflowing Wooden Fruit Crate */}
                <rect x="25" y="44" width="60" height="38" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
                <line x1="25" y1="56" x2="85" y2="56" stroke="#78350F" strokeWidth="2" />
                <line x1="25" y1="68" x2="85" y2="68" stroke="#78350F" strokeWidth="2" />
                {/* Apples and Golden Corn in Crate */}
                <circle cx="40" cy="40" r="7" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                <circle cx="55" cy="38" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="70" cy="41" r="7" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sunflower Fluttering on Left */}
      <motion.div
        animate={isHarvesting ? { rotate: 45, x: 20, y: 25 } : { rotate: [-4, 4, -4], x: 0, y: [0, -3, 0] }}
        transition={{ repeat: isHarvesting ? 0 : Infinity, duration: isHarvesting ? 0.6 : 5, ease: 'easeInOut' }}
        className="absolute top-24 left-8 sm:left-20 opacity-80"
      >
        <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <circle cx="22" cy="22" r="16" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="8" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Buzzing Honeybee */}
      <motion.div
        animate={isHarvesting ? { rotate: 80, x: -30, y: 35 } : { x: [0, 8, -4, 0], y: [0, -6, 3, 0], rotate: [-6, 8, -6] }}
        transition={{ repeat: isHarvesting ? 0 : Infinity, duration: isHarvesting ? 0.6 : 3.5, ease: 'easeInOut' }}
        className="absolute top-1/2 right-8 sm:right-24 opacity-85"
      >
        <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <ellipse cx="17" cy="18" rx="12" ry="8" fill="#FACC15" stroke="#78350F" strokeWidth="1.5" />
          <line x1="14" y1="10" x2="14" y2="26" stroke="#78350F" strokeWidth="2" />
          <line x1="20" y1="10" x2="20" y2="26" stroke="#78350F" strokeWidth="2" />
          {/* Wings */}
          <ellipse cx="12" cy="8" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#94A3B8" strokeWidth="1" />
          <ellipse cx="20" cy="8" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};
