import React, { useRef, useState } from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { FarmHeroCanvas } from './FarmHeroCanvas';
import type { FarmHeroHandle } from './FarmHeroCanvas';
import { HeroPhysicsStage } from './HeroPhysicsStage';
import type { HeroPhysicsStageHandle } from './HeroPhysicsStage';
import { FarmChicken } from './FarmChicken';
import type { ChickenExpression } from './FarmChicken';
import { FlyingButterflies } from './FlyingButterflies';
import { FarmDog } from './FarmDog';
import type { FarmDogHandle } from './FarmDog';
import { FarmDecorations } from './FarmDecorations';
import { TactileButton } from '../ui/TactileButton';
import { profileData } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  const farmRef = useRef<FarmHeroHandle | null>(null);
  const stageRef = useRef<HeroPhysicsStageHandle | null>(null);
  const dogRef = useRef<FarmDogHandle | null>(null);
  const [chickenExpression, setChickenExpression] = useState<ChickenExpression>('normal');

  const collisionCooldownRef = useRef<boolean>(false);

  const handleSplash = (clientX: number, clientY: number, intensity: number) => {
    if (farmRef.current) {
      farmRef.current.triggerSplash(clientX, clientY, intensity);
    }
  };

  const handleRipple = (clientX: number, clientY: number, size?: number) => {
    if (farmRef.current) {
      farmRef.current.triggerRipple(clientX, clientY, size);
    }
  };

  const checkChickenDogCollision = (chickenRect: DOMRect) => {
    if (collisionCooldownRef.current || !dogRef.current) return;
    const dogRect = dogRef.current.getDogRect();
    if (!dogRect) return;

    const chickenCenterX = chickenRect.left + chickenRect.width / 2;
    const chickenCenterY = chickenRect.top + chickenRect.height / 2;
    const dogCenterX = dogRect.left + dogRect.width / 2;
    const dogCenterY = dogRect.top + dogRect.height / 2;

    const dx = Math.abs(chickenCenterX - dogCenterX);
    const dy = Math.abs(chickenCenterY - dogCenterY);

    if (dx < 65 && dy < 50) {
      collisionCooldownRef.current = true;
      dogRef.current.triggerStun(chickenCenterX < dogCenterX ? 'right' : 'left');
      setChickenExpression('impact');

      setTimeout(() => {
        setChickenExpression('normal');
      }, 2000);

      setTimeout(() => {
        collisionCooldownRef.current = false;
      }, 3200);
    }
  };

  const handleChickenDrop = (clientX: number, clientY: number, velocity: number, chickenRect?: DOMRect) => {
    if (chickenRect) {
      checkChickenDogCollision(chickenRect);
    }

    if (stageRef.current) {
      stageRef.current.handleChickenDrop(clientX, clientY, velocity);
    } else {
      handleSplash(clientX, clientY, velocity);
    }
  };

  const handleChickenWalk = (chickenX: number, chickenY: number) => {
    if (stageRef.current) {
      stageRef.current.handleChickenWalk(chickenX, chickenY);
    } else {
      handleRipple(chickenX, chickenY, 45);
    }
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between pt-16 pb-10 overflow-hidden select-none">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <FarmHeroCanvas ref={farmRef} />
      </div>

      <FlyingButterflies />

      <FarmChicken
        expression={chickenExpression}
        onChickenDrop={handleChickenDrop}
        onChickenWalk={handleChickenWalk}
        onChickenSplash={(x, y) => handleSplash(x, y, 1.3)}
        onChickenWaddle={checkChickenDogCollision}
      />

      <FarmDog ref={dogRef} />

      <FarmDecorations />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center -translate-y-16 sm:-translate-y-24">
        <div className="w-full flex flex-col items-center text-center">
          <HeroPhysicsStage
            ref={stageRef}
            onSplash={handleSplash}
            onRipple={handleRipple}
            onChickenExpressionChange={setChickenExpression}
          />

          <p className="mt-3 sm:mt-4 max-w-xl text-center text-xs sm:text-base text-[#1c1917] font-bold leading-relaxed drop-shadow-sm px-2">
  Lulusan Rekayasa Perangkat Lunak dengan pengalaman di bidang teknologi, administrasi, pengelolaan data, pelayanan, dan operasional. Terbuka untuk berbagai peluang kerja dan siap belajar sesuai kebutuhan posisi.
</p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            >
              Lihat Project
            </TactileButton>

            <a
              href="/cv.pdf"
              download="CV_Aditya_Permana.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#fffdf5] hover:bg-[#fde047] text-[#1c1917] border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] font-bold text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15803d]" />
              <span>Unduh Resume / CV</span>
            </a>

            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#fffdf5] hover:bg-[#fde047] text-[#1c1917] border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] font-bold text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b45309]" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
