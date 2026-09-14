import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

export type ChickenExpression = 'normal' | 'lifted' | 'impact' | 'happy' | 'pecking';

interface FarmChickenProps {
  expression?: ChickenExpression;
  onChickenDrop: (clientX: number, clientY: number, velocity: number, chickenRect?: DOMRect) => void;
  onChickenWalk: (clientX: number, clientY: number) => void;
  onChickenSplash?: (clientX: number, clientY: number) => void;
  onChickenWaddle?: (chickenRect: DOMRect) => void;
}

const CHICKEN_DIALOGUES = [
  '♪ Petok petok! Rekonsiliasi fiskal bareng Kak Intan rapi banget ~',
  'Pagi cerah di peternakan! Jangan lupa cek batas lapor SPT Masa ya!',
  'Tadi kulihat si anjing gembala lagi asyik jaga arsip faktur pajak!',
  'Kukuruyuk! Kertas kerja audit Kak Intan seimbang tanpa selisih!',
  'Koreksi fiskal positif & negatif sudah beres, *patuk patuk* nyam!',
  'Ayam petelur juara siap nemenin kamu jelajahi portofolio perpajakan ini!',
  'Kalau ada salah hitung tarif PPh, ayo kita rekonsiliasi sampai tuntas! Petook!',
  'Brevet Pajak A & B verified, pembukuan rapi bebas sanksi denda DJP!',
  'Kincir angin berputar kencang, pertanda panen dividen bersih dan patuh!',
  'Petook! Mau cek studi kasus e-Faktur 4.0 atau rekonsiliasi PT Agro?'
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

export const FarmChicken: React.FC<FarmChickenProps> = ({
  expression = 'normal',
  onChickenDrop,
  onChickenWalk,
  onChickenSplash,
  onChickenWaddle
}) => {
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [isWaddling, setIsWaddling] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPecking, setIsPecking] = useState(false);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(CHICKEN_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  const x = useMotionValue(-120);
  const y = useMotionValue(0);

  const chickenRef = useRef<HTMLDivElement | null>(null);

  const MEADOW_LINE_Y = 20;

  useEffect(() => {
    if (expression === 'impact') {
      setIsGrabbed(false);
      if (y.get() > MEADOW_LINE_Y + 10) {
        setIsWaddling(true);
      }
    }
  }, [expression, y]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 160);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  // Periodic pecking grain animation
  useEffect(() => {
    const peckInterval = setInterval(() => {
      if (!isGrabbed && !isWaddling) {
        setIsPecking(true);
        setTimeout(() => {
          setIsPecking(false);
        }, 900);
      }
    }, 5500);

    return () => clearInterval(peckInterval);
  }, [isGrabbed, isWaddling]);

  useEffect(() => {
    if (isGrabbed || isWaddling) {
      setCurrentQuip(null);
      return;
    }

    const quipInterval = setInterval(() => {
      if (chickenRef.current) {
        const rect = chickenRef.current.getBoundingClientRect();
        if (rect.right > 90 && rect.left < window.innerWidth - 90) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(CHICKEN_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || CHICKEN_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            setCurrentQuip(null);
          }, 3200);
        }
      }
    }, 7000);

    return () => clearInterval(quipInterval);
  }, [isGrabbed, isWaddling]);

  // Walking loop across the meadow
  useEffect(() => {
    if (isGrabbed || isWaddling) return;

    let animId: number;
    let lastTime = performance.now();
    let lastWalkCheck = 0;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const walkLoop = (currentTime: number) => {
      if (window.scrollY > window.innerHeight * 1.1 || document.hidden || isPaused) {
        animId = requestAnimationFrame(walkLoop);
        lastTime = currentTime;
        return;
      }

      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currX = x.get();
      const speed = 42;
      let nextX = currX + speed * delta;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

      if (nextX > screenWidth + 140) {
        nextX = -140;
      }

      x.set(nextX);

      // Throttled collision check to eliminate DOM layout thrashing
      if (currentTime - lastWalkCheck > 320 && chickenRef.current) {
        lastWalkCheck = currentTime;
        const rect = chickenRef.current.getBoundingClientRect();
        if (rect.right > 0 && rect.left < window.innerWidth) {
          onChickenWalk(rect.left + rect.width / 2, rect.top + rect.height * 0.75);
        }
      }

      animId = requestAnimationFrame(walkLoop);
    };

    animId = requestAnimationFrame(walkLoop);
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isGrabbed, isWaddling, onChickenWalk, x]);

  // Waddle step back to baseline
  useEffect(() => {
    if (!isWaddling || isGrabbed) return;

    let animId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const waddleStep = (currentTime: number) => {
      if (window.scrollY > window.innerHeight * 1.1 || document.hidden || isPaused) {
        animId = requestAnimationFrame(waddleStep);
        lastTime = currentTime;
        return;
      }

      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currY = y.get();
      const waddleSpeed = 75;
      const nextY = currY - waddleSpeed * delta;

      if (chickenRef.current && onChickenWaddle) {
        onChickenWaddle(chickenRef.current.getBoundingClientRect());
      }

      if (nextY <= MEADOW_LINE_Y) {
        y.set(0);
        setIsWaddling(false);
        if (chickenRef.current && onChickenSplash) {
          const rect = chickenRef.current.getBoundingClientRect();
          onChickenSplash(rect.left + rect.width / 2, rect.top + rect.height * 0.75);
        }
        return;
      }

      y.set(nextY);
      animId = requestAnimationFrame(waddleStep);
    };

    animId = requestAnimationFrame(waddleStep);
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isWaddling, isGrabbed, onChickenSplash, onChickenWaddle, y]);

  const handleDragStart = () => {
    setIsGrabbed(true);
    setIsWaddling(false);
    setCurrentQuip(null);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsGrabbed(false);
    const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
    const intensity = Math.min(2.8, Math.max(1.0, speed / 200));

    const currentY = y.get();
    const currentX = x.get();

    const heroEl = chickenRef.current?.closest('section');
    const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
    const heroHeight = heroRect ? heroRect.height : (typeof window !== 'undefined' ? window.innerHeight : 800);
    const heroWidth = heroRect ? heroRect.width : (typeof window !== 'undefined' ? window.innerWidth : 1400);

    const topBaseline = heroHeight * (heroWidth < 640 ? 0.28 : 0.44);
    const minY = -topBaseline + 60;
    const maxY = heroHeight - topBaseline - 70;
    const minX = -40;
    const maxX = heroWidth - 60;

    const clampedX = Math.max(minX, Math.min(maxX, currentX));
    const clampedY = Math.max(minY, Math.min(maxY, currentY));

    x.set(clampedX);
    y.set(clampedY);

    const chickenRect = chickenRef.current ? chickenRef.current.getBoundingClientRect() : undefined;
    onChickenDrop(info.point.x, info.point.y, intensity, chickenRect);

    if (clampedY > MEADOW_LINE_Y + 10) {
      setIsWaddling(true);
    }
  };

  const currentExpression: ChickenExpression = isGrabbed
    ? 'lifted'
    : expression === 'impact'
      ? 'impact'
      : isWaddling
        ? 'happy'
        : isPecking
          ? 'pecking'
          : 'normal';

  return (
    <motion.div
      ref={chickenRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        touchAction: 'none'
      }}
      animate={{
        scale: isGrabbed ? 1.3 : 1,
        zIndex: isGrabbed ? 70 : 30
      }}
      transition={{
        scale: { duration: 0.12 }
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 1.35 }}
      className="absolute top-[28%] sm:top-[44%] left-0 cursor-grab active:cursor-grabbing select-none pointer-events-auto p-4 -m-4"
    >
      <motion.div
        animate={
          isGrabbed
            ? { rotate: [10, -10, 10], y: 0 }
            : isWaddling
              ? {
                rotate: [-8, 8, -8],
                y: [0, -5, 0]
              }
              : isPecking
                ? {
                  rotate: [0, 24, 0, 24, 0],
                  y: [0, 6, 0, 6, 0]
                }
                : currentExpression === 'impact'
                  ? { rotate: -12, y: -4 }
                  : {
                    y: [0, -5, 0, 4, 0],
                    rotate: [0, -2, 0, 2, 0]
                  }
        }
        transition={{
          repeat: isGrabbed || currentExpression === 'impact' ? 0 : Infinity,
          duration: isWaddling ? 0.38 : isPecking ? 0.7 : 3.0,
          ease: 'easeInOut'
        }}
        className="relative group scale-[0.68] sm:scale-100 origin-center"
      >
        <div className="absolute -bottom-2 left-2 right-2 h-3 bg-[#14532d]/40 rounded-full blur-[2px]" />

        {/* Cute Farm Hen SVG */}
        <svg
          width="74"
          height="64"
          viewBox="0 0 74 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl filter"
        >
          {/* Hen Feet */}
          <path d="M26 48 L26 56 M26 56 L20 58 M26 56 L26 60 M26 56 L32 58" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 48 L38 56 M38 56 L32 58 M38 56 L38 60 M38 56 L44 58" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Plump Hen Body */}
          <path
            d="M12 36 C12 48 24 52 40 52 C54 52 64 44 64 36 C64 28 58 22 48 22 C46 16 38 10 26 10 C14 10 12 22 12 36 Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2.4"
          />

          {/* Tail Feathers */}
          <path
            d="M14 30 C8 24 4 18 6 12 C10 16 14 22 16 26 Z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="1.8"
          />
          <path
            d="M16 24 C12 16 10 10 14 6 C17 12 18 18 19 22 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.8"
          />

          {/* Head & Neck */}
          <circle cx="48" cy="18" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.4" />

          {/* Red Comb on Head */}
          <path
            d="M40 8 C40 2 46 2 46 6 C48 1 54 2 54 7 C56 3 62 4 60 9 C54 11 44 11 40 8 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.6"
          />

          {/* Red Wattle under Beak */}
          <path
            d="M58 26 C62 28 62 34 58 36 C55 36 54 30 58 26 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.5"
          />

          {/* Beak */}
          <path
            d="M60 17 L72 21 L60 25 Z"
            fill="#F97316"
            stroke="#EA580C"
            strokeWidth="1.8"
          />

          {/* Eyes with Expressions */}
          {currentExpression === 'lifted' ? (
            <>
              <circle cx="52" cy="15" r="4.5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx="53" cy="15" r="2" fill="#1C1917" />
              <circle cx="54" cy="14" r="0.8" fill="#FFFFFF" />
            </>
          ) : currentExpression === 'impact' ? (
            <>
              <path d="M48 12 L52 15 L48 18" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M56 12 L52 15 L56 18" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : currentExpression === 'happy' ? (
            <path d="M48 15 Q52 10 56 15" stroke="#1C1917" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          ) : isBlinking ? (
            <path d="M48 16 Q52 19 56 16" stroke="#1C1917" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="52" cy="15" r="3.2" fill="#1C1917" />
              <circle cx="53.5" cy="14" r="1.1" fill="#FFFFFF" />
            </>
          )}

          {/* Wing with Flap Animation */}
          <motion.path
            animate={
              isGrabbed
                ? { rotate: [15, -20, 15], originX: 0.3, originY: 0.5 }
                : { rotate: 0 }
            }
            transition={{ repeat: Infinity, duration: 0.2 }}
            d="M22 32 C26 24 40 24 44 32 C46 38 38 42 26 42 C18 42 18 36 22 32 Z"
            fill="#FDE68A"
            stroke="#D97706"
            strokeWidth="2"
          />
        </svg>

        {currentExpression === 'lifted' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold shadow-lg border border-[#b91c1c] whitespace-nowrap animate-bounce">
            PETOOOK!
          </motion.div>
        )}

        {currentExpression === 'impact' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#f97316] text-white text-[10px] font-extrabold shadow-lg border border-[#ea580c] whitespace-nowrap animate-pulse">
            &gt;_&lt; KUKURUKUK!
          </motion.div>
        )}

        {isWaddling && currentExpression !== 'impact' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#22c55e] text-white text-[10px] font-extrabold shadow-lg border border-[#15803d] whitespace-nowrap">
            KANDANG DEKAT SINI!
          </motion.div>
        )}

        {!isGrabbed && !isWaddling && currentExpression !== 'impact' && currentQuip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-2xl bg-[#fffdf5] text-[#166534] text-xs font-bold shadow-xl border-2 border-[#86efac] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md"
          >
            <span className="drop-shadow-xs">{currentQuip}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
