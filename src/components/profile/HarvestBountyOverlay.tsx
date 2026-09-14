import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HarvestBountyOverlayProps {
  isHarvesting: boolean;
}

export const HarvestBountyOverlay: React.FC<HarvestBountyOverlayProps> = ({ isHarvesting }) => {
  return (
    <AnimatePresence>
      {isHarvesting && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden select-none">
          {/* Golden Morning Sunlight Sweep */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 bg-gradient-to-t from-[#fde047]/30 via-[#22c55e]/20 to-transparent"
          />

          {/* Golden Wheat & Crop Field Wave Sweep */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '100%'] }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-t from-[#15803d]/90 via-[#22c55e]/80 to-[#fde047]/60"
          >
            <div className="absolute -top-24 inset-x-0 h-24">
              <svg
                viewBox="0 0 1440 120"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0 60 C320 120, 640 0, 960 60 C1200 100, 1360 40, 1440 60 L1440 120 L0 120 Z"
                  fill="#fde047"
                  opacity="0.8"
                />
              </svg>
            </div>
          </motion.div>

          {/* Flying Harvest Fruit & Grain Bounties */}
          <div className="absolute inset-0">
            {[...Array(24)].map((_, i) => {
              const icons = ['🌾', '🍎', '🌽', '🎃', '🥕', '🌻', '🍓'];
              const itemIcon = icons[i % icons.length];
              const leftPercent = (i * 4.2) % 100;
              const delay = 0.1 + (i % 6) * 0.12;

              return (
                <motion.div
                  key={i}
                  initial={{
                    y: '100vh',
                    x: `${leftPercent}vw`,
                    scale: 0.6 + (i % 4) * 0.25,
                    rotate: 0,
                    opacity: 0
                  }}
                  animate={{
                    y: ['100vh', `${20 + (i % 5) * 12}vh`, '110vh'],
                    rotate: [0, (i % 2 === 0 ? 180 : -180), (i % 2 === 0 ? 360 : -360)],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 1.8 + (i % 4) * 0.3,
                    delay,
                    ease: 'easeOut'
                  }}
                  className="absolute text-2xl sm:text-3xl select-none filter drop-shadow-md"
                >
                  {itemIcon}
                </motion.div>
              );
            })}
          </div>

          {/* Irrigation Sprinkler Droplets */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`sprinkler-${i}`}
                initial={{
                  y: '90vh',
                  x: `${(i * 5) % 100}vw`,
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  y: ['90vh', `${10 + (i % 4) * 15}vh`, '100vh'],
                  x: [`${(i * 5) % 100}vw`, `${((i * 5) % 100) + (i % 2 === 0 ? 6 : -6)}vw`],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.4]
                }}
                transition={{
                  duration: 1.4 + (i % 3) * 0.3,
                  delay: (i % 8) * 0.1,
                  ease: 'easeOut'
                }}
                className="absolute w-3.5 h-3.5 rounded-full bg-[#38bdf8]/70 border border-white shadow-[0_0_8px_#38bdf8]"
              />
            ))}
          </div>

          {/* Celebratory Banner */}
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], y: [50, -10, 0], opacity: [0, 1, 1] }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 px-6 py-3 rounded-2xl bg-[#fffdf5] border-3 border-[#15803d] shadow-[0_12px_32px_rgba(21,128,61,0.45)] flex items-center gap-3 text-center"
          >
            <span className="text-3xl">🌾</span>
            <div>
              <span className="text-xs font-mono font-black uppercase text-[#15803d] block">
                FESTIVAL PERTANIAN
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#1c1917]">
                PANEN RAYA BERKAH!
              </span>
            </div>
            <span className="text-3xl">🍎</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
