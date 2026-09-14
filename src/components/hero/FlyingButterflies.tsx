import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const SWALLOW_DIALOGUES = [
  'Kicauu! Dari atas awan peternakan tampak asri dan luas ~',
  'Ayam dan anjing di bawah lagi akrab banget hari ini!',
  'Bunga matahari di kebun sudah mekar penuh sari madu!',
  'Arus angin sepoi-sepoi pas banget buat melayang santai!',
  'Lumbung padi penuh, musim panen berkah melimpah!',
  'Portofolio rekayasa web yang mantap terlihat dari angkasa!'
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

const ALTITUDE_ZONES = [
  { min: 10, max: 24 },
  { min: 28, max: 36 },
  { min: 56, max: 68 }
];

export const FlyingButterflies: React.FC = () => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [altitudePercent, setAltitudePercent] = useState<number>(14);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);

  const x = useMotionValue(-160);
  const swallowRef = useRef<HTMLDivElement | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(SWALLOW_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const flightLoop = (currentTime: number) => {
      // Pause RAF if scrolled past Hero
      if (window.scrollY > window.innerHeight * 1.1 || document.hidden || isPaused) {
        animId = requestAnimationFrame(flightLoop);
        lastTime = currentTime;
        return;
      }

      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currX = x.get();
      const flightSpeed = 74;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

      if (direction === 'ltr') {
        const nextX = currX + flightSpeed * delta;
        if (nextX > screenWidth + 160) {
          const nextDir = Math.random() > 0.5 ? 'rtl' : 'ltr';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'rtl' ? screenWidth + 160 : -160);
        } else {
          x.set(nextX);
        }
      } else {
        const nextX = currX - flightSpeed * delta;
        if (nextX < -160) {
          const nextDir = Math.random() > 0.5 ? 'ltr' : 'rtl';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'ltr' ? -160 : screenWidth + 160);
        } else {
          x.set(nextX);
        }
      }

      animId = requestAnimationFrame(flightLoop);
    };

    animId = requestAnimationFrame(flightLoop);
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [direction, x]);

  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (swallowRef.current) {
        const rect = swallowRef.current.getBoundingClientRect();
        if (rect.right > 100 && rect.left < window.innerWidth - 100) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(SWALLOW_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || SWALLOW_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            setCurrentQuip(null);
          }, 3000);
        }
      }
    }, 8500);

    return () => clearInterval(quipInterval);
  }, []);

  return (
    <motion.div
      ref={swallowRef}
      style={{
        x,
        top: `${altitudePercent}%`,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-20 select-none"
    >
      <div className={`relative ${direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'}`}>
        <motion.div
          animate={{
            y: [0, -7, 2, -5, 0],
            rotate: direction === 'ltr' ? [-1, 2, -1, -2, -1] : [1, -2, 1, 2, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.0,
            ease: 'easeInOut'
          }}
          className="relative"
        >
          {/* Barn Swallow Bird SVG */}
          <svg
            width="56"
            height="40"
            viewBox="0 0 56 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Forked Tail */}
            <path d="M10 20 L2 28 L8 20 L2 14 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />

            {/* Body */}
            <path
              d="M10 20 C16 16, 28 16, 38 18 C44 20, 46 18, 48 15 C52 15, 54 18, 48 22 C40 26, 24 26, 14 24 Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="1.5"
            />

            {/* Red Throat Patch */}
            <path d="M42 20 C46 19, 48 21, 46 24 C43 25, 40 23, 42 20 Z" fill="#DC2626" />

            {/* White Underbelly */}
            <path d="M18 23 C26 23, 36 22, 42 20 C38 25, 26 26, 18 23 Z" fill="#F8FAFC" />

            {/* Beak */}
            <path d="M48 17 L55 19 L48 21 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

            {/* Eye */}
            <circle cx="44" cy="17" r="1.6" fill="#FFFFFF" />
            <circle cx="44.4" cy="17" r="1.0" fill="#0F172A" />

            {/* Animated Wings */}
            <motion.path
              animate={{
                d: [
                  'M22 18 C26 2, 36 -2, 44 0 C36 8, 30 14, 22 18 Z',
                  'M22 18 C26 10, 36 8, 44 10 C36 14, 30 16, 22 18 Z',
                  'M22 18 C26 24, 36 30, 44 28 C36 22, 30 20, 22 18 Z',
                  'M22 18 C26 2, 36 -2, 44 0 C36 8, 30 14, 22 18 Z'
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: 'easeInOut'
              }}
              fill="#334155"
              stroke="#1E293B"
              strokeWidth="1.4"
            />
          </svg>

          {currentQuip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 6 }}
              className={`absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#fffdf5] text-[#15803d] text-[11px] font-bold shadow-lg border-2 border-[#86efac] whitespace-nowrap backdrop-blur-xs flex items-center gap-1 ${
                direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'
              }`}
            >
              <span>{currentQuip}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
