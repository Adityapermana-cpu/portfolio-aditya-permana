import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useCardTilt } from '../../hooks/useCardTilt';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { tiltProps } = useCardTilt(6);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: isMobile ? -5 : -24,
              x: isMobile ? 0 : -32,
              y: isMobile ? 20 : 70,
              scale: isMobile ? 0.98 : 0.94,
              transition: { type: 'spring', stiffness: 160, damping: 16 }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6"
    >
      <div
        {...tiltProps}
        className="relative w-full max-w-sm rounded-[32px] p-3.5 bg-[#fffdf5] border-2 border-[#1c1917] shadow-[5px_5px_0px_#1c1917] group cursor-pointer"
      >
        <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#dcfce7] border border-[#86efac] flex items-center justify-center">
          <img
            src={profileData.avatarUrl || '/avatar.svg'}
            alt={profileData.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/avatar.svg';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#14532d]/80 via-transparent to-transparent opacity-75 pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#fffdf5]/95 border-2 border-[#1c1917] backdrop-blur-md shadow-[2px_2px_0px_#1c1917]">
            <div className="text-sm font-black text-[#1c1917]">
              {profileData.name}
            </div>
            <div className="text-xs text-[#15803d] font-mono font-bold mt-0.5">
              {profileData.education}
            </div>
          </div>
        </div>

        <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono font-bold text-[#15803d]">
          <span className="flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>FOTO PROFIL</span>
          </span>
          <span>ID // ADITYA PERMANA</span>
        </div>
      </div>

      {/* Location & Operating Environment */}
      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className="w-full max-w-sm p-4 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] flex items-center justify-between text-xs font-mono text-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
      >
        <div className="flex items-center gap-2 font-bold">
          <MapPin className="w-4 h-4 text-[#dc2626]" />
          <span>Indonesia</span>
        </div>
        <span className="text-[#15803d] font-black">Brevet A/B • PSAK &amp; DJP Compliance</span>
      </motion.div>
    </motion.div>
  );
};

