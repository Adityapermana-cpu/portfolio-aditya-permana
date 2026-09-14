import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export interface FarmDogHandle {
  triggerStun: (knockbackDirection: 'left' | 'right') => void;
  getDogRect: () => DOMRect | null;
  isStunned: () => boolean;
}

const DOG_DIALOGUES = [
  '*Guk guk! Kibas ekor*',
  'Arsip kepatuhan pajak dan pembukuan aman terkendali di bawah pengawasanku!',
  'Ayam, jangan sampai lupa cek bukti potong PPh 23 ya!',
  'Burung walet di atas, tolong pantau faktur masukan dari udara ya!',
  'Guk! Siap sedia menyambut klien portofolio Kak Intan Srimaya!',
  'Padang rumputnya segar dan seimbang seperti neraca akuntansi!',
  'Sistem pembukuan rapi bikin semangat jaga lumbung fiskal!',
  'Semua perhitungan PPh & PPN di sini akurat dan transparan!'
];


const createShuffledDeck = (items: string[], lastItem?: string): string[] => {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (lastItem && deck[0] === lastItem && deck.length > 1) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
};

export const FarmDog = forwardRef<FarmDogHandle>((_props, ref) => {
  const screenInitialWidth = typeof window !== 'undefined' ? window.innerWidth + 80 : 1500;
  const x = useMotionValue(screenInitialWidth);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);
  const [isStunned, setIsStunned] = useState<boolean>(false);
  const [knockbackDir, setKnockbackDir] = useState<number>(0);
  const dogRef = useRef<HTMLDivElement | null>(null);
  const isStunnedRef = useRef<boolean>(false);

  const deckRef = useRef<string[]>(createShuffledDeck(DOG_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useImperativeHandle(ref, () => ({
    triggerStun: (knockbackDirection: 'left' | 'right') => {
      if (isStunnedRef.current) return;
      isStunnedRef.current = true;
      setIsStunned(true);
      setKnockbackDir(knockbackDirection === 'left' ? -25 : 25);
      setCurrentQuip('WOOF! *Kaget jump!* @w@');

      setTimeout(() => {
        setKnockbackDir(0);
      }, 900);

      setTimeout(() => {
        isStunnedRef.current = false;
        setIsStunned(false);
        setCurrentQuip(null);
      }, 2800);
    },
    getDogRect: () => {
      return dogRef.current ? dogRef.current.getBoundingClientRect() : null;
    },
    isStunned: () => isStunnedRef.current
  }));

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const trotLoop = (currentTime: number) => {
      if (window.scrollY > window.innerHeight * 1.1 || document.hidden || isPaused) {
        animId = requestAnimationFrame(trotLoop);
        lastTime = currentTime;
        return;
      }

      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      if (!isStunnedRef.current) {
        const currX = x.get();
        const dogSpeed = 36;
        let nextX = currX - dogSpeed * delta;
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

        if (nextX < -140) {
          nextX = screenWidth + 140;
        }

        x.set(nextX);
      }

      animId = requestAnimationFrame(trotLoop);
    };

    animId = requestAnimationFrame(trotLoop);
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [x]);

  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (dogRef.current && !isStunnedRef.current) {
        const rect = dogRef.current.getBoundingClientRect();
        if (rect.right > 100 && rect.left < window.innerWidth - 100) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(DOG_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || DOG_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            if (!isStunnedRef.current) setCurrentQuip(null);
          }, 3000);
        }
      }
    }, 8500);

    return () => clearInterval(quipInterval);
  }, []);

  return (
    <motion.div
      ref={dogRef}
      style={{
        x,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-20 select-none bottom-28 sm:bottom-36 md:bottom-[185px] scale-[0.75] sm:scale-[0.85] md:scale-100 origin-bottom"
    >
      <motion.div
        animate={{
          x: knockbackDir,
          y: isStunned ? [0, -4, 0, 4, 0] : [0, -3, 0, -3, 0],
          rotate: isStunned ? [-8, 8, -8, 8, -8] : [-2, 2, -2, 2, -2]
        }}
        transition={{
          x: { duration: 0.8, ease: 'easeOut' },
          y: { repeat: Infinity, duration: isStunned ? 0.35 : 0.75, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: isStunned ? 0.35 : 0.75, ease: 'easeInOut' }
        }}
        className="relative"
      >
        <div className="absolute -bottom-1 left-2 w-16 h-3 bg-[#14532d]/40 rounded-full blur-[2px]" />

        {isStunned && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-8 pointer-events-none z-30">
            <motion.div
              animate={{
                x: [-16, 0, 16, 0, -16],
                y: [0, -5, 0, 5, 0],
                scale: [0.9, 1.15, 0.9, 0.75, 0.9],
                rotate: [0, 180, 360]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="absolute text-sm select-none"
            >
              ⭐
            </motion.div>
            <motion.div
              animate={{
                x: [16, 0, -16, 0, 16],
                y: [0, 5, 0, -5, 0],
                scale: [0.9, 0.75, 0.9, 1.15, 0.9],
                rotate: [360, 180, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="absolute text-sm select-none"
            >
              ✨
            </motion.div>
          </div>
        )}

        {/* Cute Farm Puppy SVG */}
        <svg
          width="68"
          height="50"
          viewBox="0 0 68 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Animated Wagging Tail */}
          <motion.path
            animate={{ rotate: [-18, 22, -18] }}
            transition={{ repeat: Infinity, duration: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: '56px 24px' }}
            d="M56 24 C62 18 66 12 64 6 C60 8 58 14 56 24 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1.6"
          />

          {/* Paws */}
          <rect x="18" y="32" width="6" height="14" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
          <rect x="28" y="32" width="6" height="14" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.6" />
          <rect x="42" y="32" width="6" height="14" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
          <rect x="50" y="32" width="6" height="14" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.6" />

          {/* Body */}
          <ellipse cx="36" cy="26" rx="20" ry="13" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          {/* Spot on back */}
          <ellipse cx="44" cy="22" rx="7" ry="5" fill="#B45309" />

          {/* Head */}
          <circle cx="18" cy="18" r="12" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />

          {/* Floppy Ears */}
          <motion.path
            animate={{ rotate: isStunned ? [-12, 12, -12] : [-4, 6, -4] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
            style={{ transformOrigin: '14px 10px' }}
            d="M14 10 C10 4 6 12 8 20 C10 22 14 16 14 10 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1.6"
          />
          <path d="M22 8 C26 4 30 12 28 20 C26 22 22 16 22 8 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.6" />

          {/* Snout & Nose */}
          <ellipse cx="12" cy="22" rx="5" ry="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.4" />
          <circle cx="10" cy="20" r="2.2" fill="#1C1917" />

          {/* Eyes */}
          {isStunned ? (
            <>
              <path d="M14 14 L18 18 M18 14 L14 18" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="16" cy="16" r="2.5" fill="#1C1917" />
              <circle cx="15.2" cy="15.2" r="0.8" fill="#FFFFFF" />
            </>
          )}

          {/* Red Bandana Collar */}
          <path d="M16 26 Q22 30 28 26 L22 34 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.2" />
        </svg>

        {currentQuip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#fffdf5] text-[#92400e] text-[11px] font-bold shadow-lg border-2 border-[#f59e0b] whitespace-nowrap backdrop-blur-xs flex items-center gap-1"
          >
            <span>{currentQuip}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});

FarmDog.displayName = 'FarmDog';
