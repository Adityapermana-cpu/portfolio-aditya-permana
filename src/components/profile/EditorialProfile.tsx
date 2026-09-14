import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { HarvestBountyOverlay } from './HarvestBountyOverlay';
import { ProfileMeadowBackground } from './ProfileMeadowBackground';
import { ProfilePhotoCard } from './ProfilePhotoCard';
import { ArchitectureStage } from './ArchitectureStage';
import { HarvestActionButton } from './HarvestActionButton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05
    }
  }
};

const perspectiveCardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 18,
    rotateY: -6,
    scale: 0.91,
    y: 45,
    filter: 'blur(5px)'
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 170,
      damping: 20,
      mass: 0.85
    }
  }
};

const headerRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: 12,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 160,
      damping: 18
    }
  }
};

export const EditorialProfile: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Harvest & Care State Machine
  const [harvestState, setHarvestState] = useState<'pristine' | 'harvesting' | 'harvested' | 'caring'>('pristine');
  const [careProgress, setCareProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const scrollParallaxLeft = useTransform(smoothScroll, [0, 1], [30, -25]);
  const scrollParallaxRight = useTransform(smoothScroll, [0, 1], [50, -35]);

  const handleTriggerHarvest = () => {
    if (harvestState !== 'pristine') return;
    setHarvestState('harvesting');
    setTimeout(() => {
      setHarvestState('harvested');
    }, 1200);
  };

  const handleTriggerCare = () => {
    if (harvestState !== 'harvested') return;
    setHarvestState('caring');
  };

  useEffect(() => {
    if (harvestState !== 'caring') return;

    let currentVal = 0;
    setCareProgress(0);

    const stepMs = 40;
    const totalDurationMs = 2000;
    const stepIncrement = 100 / (totalDurationMs / stepMs);

    const interval = setInterval(() => {
      currentVal += stepIncrement;
      if (currentVal >= 100) {
        clearInterval(interval);
        setCareProgress(100);
        setTimeout(() => {
          setHarvestState('pristine');
          setCareProgress(0);
        }, 300);
      } else {
        setCareProgress(Math.floor(currentVal));
      }
    }, stepMs);

    return () => clearInterval(interval);
  }, [harvestState]);

  const isHarvesting = harvestState === 'harvested' || harvestState === 'harvesting';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pt-24 pb-32 sm:pt-28 sm:pb-44 bg-[#fefae0] overflow-hidden select-none"
    >
      <HarvestBountyOverlay isHarvesting={harvestState === 'harvesting'} />

      <ProfileMeadowBackground isHarvesting={isHarvesting} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.18 }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Editorial Section Header & Harvest Action Controls */}
        <motion.div
          variants={headerRevealVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b-2 border-[#1c1917]/15"
        >
          <div className="max-w-2xl">
          <span className="text-xs font-mono font-black uppercase tracking-[0.25em] text-[#15803d] block mb-2">
  01 // TENTANG SAYA
</span>

<h2 className="text-3xl sm:text-5xl font-black text-[#1c1917] tracking-tight leading-[1.08]">
  Profil, Keahlian &amp; Pengalaman
</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <HarvestActionButton
              harvestState={harvestState}
              careProgress={careProgress}
              onTriggerHarvest={handleTriggerHarvest}
              onTriggerCare={handleTriggerCare}
            />

            <p className="max-w-xs text-xs text-[#44403c] font-medium leading-relaxed">
              Memiliki latar belakang Rekayasa Perangkat Lunak dengan pengalaman di bidang teknologi, administrasi, pengelolaan data, digitalisasi dokumen, pelayanan, dan pekerjaan operasional.
            </p>
          </div>
        </motion.div>


        {/* Interactive Stage Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            variants={perspectiveCardVariants}
            style={{ y: scrollParallaxLeft }}
            className="lg:col-span-5 relative z-10"
          >
            <ProfilePhotoCard isFlooded={isHarvesting} />
          </motion.div>

          <motion.div
            variants={perspectiveCardVariants}
            style={{ y: scrollParallaxRight }}
            className="lg:col-span-7 relative z-10"
          >
            <ArchitectureStage isFlooded={isHarvesting} />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,80 Q380,25 760,75 T1440,50 L1440,180 L0,180 Z"
            fill={isHarvesting ? '#86efac' : '#bbf7d0'}
            opacity="0.95"
          />
          <path
            d="M0,105 Q420,60 820,100 T1440,85 L1440,180 L0,180 Z"
            fill={isHarvesting ? '#4ade80' : '#86efac'}
          />
        </svg>
      </div>
    </section>
  );
};
