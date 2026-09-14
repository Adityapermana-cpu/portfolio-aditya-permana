import React, { useEffect, useRef } from 'react';
import {
  renderWaterBody,
  renderSandLayers,
  renderWaterWaves,
  renderBubbles
} from './farmEnvironmentRenderers';
import { renderCreaturesByDepth } from './farmCreatureRenderers';

interface AnimatedOceanSlideBackgroundProps {
  depthLevel?: 1 | 2 | 3 | 4;
}

export const AnimatedOceanSlideBackground: React.FC<
  AnimatedOceanSlideBackgroundProps
> = ({
  depthLevel = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', {
      alpha: false
    });

    if (!ctx) {
      return;
    }

    let animationFrameId = 0;
    let time = 0;
    let isRunning = true;
    let isVisible = true;
    let lastDrawTime = 0;

    const handleResize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.25
      );

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const handleVisibilityChange = () => {
      isRunning =
        document.visibilityState === 'visible';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible =
          entries[0]?.isIntersecting ?? true;
      },
      {
        threshold: 0.05
      }
    );

    observer.observe(canvas);

    handleResize();

    window.addEventListener(
      'resize',
      handleResize
    );

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    const render = (timestamp: number) => {
      animationFrameId =
        requestAnimationFrame(render);

      if (!isRunning || !isVisible) {
        return;
      }

      /*
       * Background rendering dibatasi sekitar
       * 30 FPS agar tidak membebani browser.
       */
      if (timestamp - lastDrawTime < 28) {
        return;
      }

      lastDrawTime = timestamp;

      const width = window.innerWidth;
      const height = window.innerHeight;

      time += 0.03;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * Digital gradient background
       */
      renderWaterBody(
        ctx,
        width,
        height,
        depthLevel
      );

      /*
       * Layer untuk grid / terrain digital
       */
      renderSandLayers(
        ctx,
        width,
        height,
        depthLevel
      );

      /*
       * Animated flow lines / system connections
       */
      renderWaterWaves(
        ctx,
        width,
        height,
        time,
        depthLevel
      );

      /*
       * Decorative developer/system particles
       */
      renderCreaturesByDepth(
        ctx,
        width,
        height,
        time,
        depthLevel
      );

      /*
       * Floating particles
       */
      renderBubbles(
        ctx,
        width,
        height,
        time,
        depthLevel
      );
    };

    animationFrameId =
      requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      observer.disconnect();

      window.removeEventListener(
        'resize',
        handleResize
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [depthLevel]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AnimatedOceanSlideBackground;