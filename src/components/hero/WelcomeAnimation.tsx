import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [phase, setPhase] = useState<'dawn' | 'sunrise' | 'open' | 'done'>('dawn');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('sunrise');
    }, 1100);

    const t2 = setTimeout(() => {
      setPhase('open');
    }, 2200);

    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'open' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#1b4332]"
      >
        {/* Layer 1: Dark Green Hills at Dawn */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'dawn' ? '0%' : '0%' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#14532d] via-[#166534] to-[#15803d]"
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
                fill="#15803d"
              />
            </svg>
          </div>
        </motion.div>

        {/* Layer 2: Rolling Pasture Hills */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'dawn' ? '0%' : '0%' }}
          transition={{ duration: 1.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#166534] via-[#22c55e] to-[#4ade80]"
        >
          <div className="absolute -top-28 inset-x-0 h-28">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40 L1440 120 L0 120 Z"
                fill="#4ade80"
              />
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40"
                stroke="#86EFAC"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Layer 3: Golden Sunrise Meadow */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'dawn' ? '0%' : '0%' }}
          transition={{ duration: 1.25, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-b from-[#14532d] via-[#16a34a] to-[#22c55e]"
        >
          <div className="absolute -top-32 inset-x-0 h-32">
            <svg
              viewBox="0 0 1440 140"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50 L1440 140 L0 140 Z"
                fill="#14532d"
              />
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50"
                stroke="#FEF08A"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Floating Dandelion Fluff & Pollen */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent" />

          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '100vh',
                x: `${(i * 5.8) % 100}vw`,
                opacity: 0.3,
                scale: 0.6 + (i % 5) * 0.25
              }}
              animate={{
                y: '-20vh',
                opacity: [0.2, 0.85, 0]
              }}
              transition={{
                duration: 1.8 + (i % 4) * 0.4,
                delay: 0.4 + (i * 0.08),
                ease: 'easeOut',
                repeat: Infinity
              }}
              className="absolute w-4 h-4 rounded-full bg-amber-100/60 border border-white/80 shadow-[0_0_8px_rgba(254,240,138,0.8)] backdrop-blur-xs"
            />
          ))}
        </div>

        {/* Center Content: Rooster Sunrise Crow & Brand Title */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: phase === 'sunrise' ? 1 : phase === 'open' ? 0 : 0,
              scale: phase === 'sunrise' ? 1 : phase === 'open' ? 1.15 : 0.85,
              y: phase === 'sunrise' ? 0 : phase === 'open' ? -30 : 20
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="mb-6"
            >
              <BrandLogo size="xl" />
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
              ADITYA PERMANA
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold tracking-widest text-[#fef08a] uppercase drop-shadow-md flex items-center gap-2">
              <span>🌾</span>
              <span>Web Developer &amp; Software Developer</span>
              <span>🌾</span>
            </p>


            <div className="mt-6 w-48 h-1.5 rounded-full bg-white/20 overflow-hidden border border-white/30">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 'sunrise' || phase === 'open' ? '100%' : '0%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#fef08a] via-[#86efac] to-white rounded-full"
              />
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border-2 border-white/40 text-xs text-white font-mono font-bold transition-all backdrop-blur-md cursor-pointer"
        >
          Lewati
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
