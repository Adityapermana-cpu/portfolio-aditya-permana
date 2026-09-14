import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface FarmHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface GrassParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

interface GrassRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const FarmHeroCanvas = forwardRef<FarmHeroHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<GrassParticle[]>([]);
    const ripplesRef = useRef<GrassRipple[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(240, rect.width * 0.4) * Math.max(0.7, intensity),
        alpha: 0.9,
        speed: 3.4 * Math.max(0.6, intensity)
      });

      const colors = ['#22c55e', '#86efac', '#eab308', '#fef08a', '#8b5a2b', '#15803d'];
      const count = Math.floor(28 * Math.min(2.5, intensity));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = (3.0 + Math.random() * 5.5) * Math.min(2, intensity);
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * speed * 0.9,
          vy: -Math.abs(Math.sin(angle) * speed * 1.4) - 3.2 * intensity,
          radius: 2.2 + Math.random() * 3.2,
          alpha: 1,
          decay: 0.016 + Math.random() * 0.02,
          gravity: 0.22,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 70) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.6,
        speed: 2.0
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      let isRunning = true;
      let isVisible = true;

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      handleResize();
      window.addEventListener('resize', handleResize, { passive: true });

      const handleVisibility = () => {
        if (document.hidden) {
          isVisible = false;
        } else {
          isVisible = true;
          if (isRunning && !animRef.current) {
            animRef.current = requestAnimationFrame(render);
          }
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);

      // Pause loop when out of viewport to eliminate idle lag
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting && !document.hidden;
            if (isVisible && isRunning && !animRef.current) {
              animRef.current = requestAnimationFrame(render);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);

      const render = () => {
        if (!isRunning || !canvas) return;
        if (!isVisible) {
          animRef.current = null;
          return;
        }

        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;


        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.014;
        const t = timeRef.current;

        // 1. Pastoral Morning Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
        skyGrad.addColorStop(0, '#bae6fd'); // soft morning sky
        skyGrad.addColorStop(0.35, '#e0f2fe');
        skyGrad.addColorStop(0.65, '#fef9c3'); // golden dawn horizon
        skyGrad.addColorStop(1, '#dcfce7'); // morning light over meadow
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Warm Sun Rays in the Sky
        ctx.save();
        ctx.globalAlpha = 0.12;
        const sunX = width * 0.82;
        const sunY = height * 0.18;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.45);
        sunGrad.addColorStop(0, '#fef08a');
        sunGrad.addColorStop(0.5, '#fde047');
        sunGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, width * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 3. Distant Mountains / Rolling Hills (Back Layer)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height * 0.48);
        for (let x = 0; x <= width; x += 10) {
          const cy = height * 0.44 + Math.sin(x * 0.002 + 0.5) * 28 + Math.cos(x * 0.005) * 12;
          ctx.lineTo(x, cy);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const hillGrad1 = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.6);
        hillGrad1.addColorStop(0, '#86efac');
        hillGrad1.addColorStop(1, '#4ade80');
        ctx.fillStyle = hillGrad1;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.restore();

        // 4. Distant Farm Windmill
        const windmillX = width * 0.18;
        const windmillBaseY = height * 0.45 + Math.sin(windmillX * 0.002 + 0.5) * 28;
        ctx.save();
        // tower body
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.moveTo(windmillX - 7, windmillBaseY);
        ctx.lineTo(windmillX - 4, windmillBaseY - 38);
        ctx.lineTo(windmillX + 4, windmillBaseY - 38);
        ctx.lineTo(windmillX + 7, windmillBaseY);
        ctx.closePath();
        ctx.fill();
        // dome roof
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(windmillX, windmillBaseY - 38, 6, Math.PI, 0);
        ctx.fill();
        // spinning blades
        ctx.translate(windmillX, windmillBaseY - 38);
        ctx.rotate(t * 1.2);
        ctx.strokeStyle = '#fefae0';
        ctx.lineWidth = 1.8;
        for (let b = 0; b < 4; b++) {
          ctx.rotate(Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -22);
          ctx.stroke();
          // blade sail
          ctx.fillStyle = 'rgba(254, 250, 224, 0.75)';
          ctx.fillRect(-3, -20, 6, 14);
        }
        ctx.restore();

        // 5. Midground Rolling Pasture Hills
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height * 0.58);
        for (let x = 0; x <= width; x += 6) {
          const cy = height * 0.54 + Math.sin(x * 0.0035 + t * 0.15) * 20 + Math.cos(x * 0.007) * 10;
          ctx.lineTo(x, cy);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const hillGrad2 = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.75);
        hillGrad2.addColorStop(0, '#4ade80');
        hillGrad2.addColorStop(0.5, '#22c55e');
        hillGrad2.addColorStop(1, '#16a34a');
        ctx.fillStyle = hillGrad2;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();

        // 6. Foreground Main Meadow Field with Wind Sway Waves
        const meadowBaseY = height * 0.68;
        const getMeadowY = (x: number) => {
          return meadowBaseY + Math.sin(x * 0.004 + t * 0.4) * 8 + Math.cos(x * 0.008 - t * 0.25) * 4;
        };

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, getMeadowY(0));
        for (let x = 0; x <= width; x += 3) {
          ctx.lineTo(x, getMeadowY(x));
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        const meadowGrad = ctx.createLinearGradient(0, meadowBaseY - 20, 0, height);
        meadowGrad.addColorStop(0, '#22c55e');
        meadowGrad.addColorStop(0.3, '#16a34a');
        meadowGrad.addColorStop(0.7, '#15803d');
        meadowGrad.addColorStop(1, '#166534');
        ctx.fillStyle = meadowGrad;
        ctx.fill();

        // Field grass rim highlight
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const cy = getMeadowY(x);
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Little swaying grass blades along the crest
        ctx.strokeStyle = '#bbf7d0';
        ctx.lineWidth = 1.6;
        for (let x = 8; x < width; x += 18) {
          const cy = getMeadowY(x);
          const sway = Math.sin(t * 2.2 + x * 0.08) * 6;
          ctx.beginPath();
          ctx.moveTo(x, cy);
          ctx.quadraticCurveTo(x + sway * 0.5, cy - 6, x + sway, cy - 12);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 4, cy);
          ctx.quadraticCurveTo(x + 4 + sway * 0.4, cy - 5, x + 4 + sway * 0.8, cy - 9);
          ctx.stroke();
        }

        // Little field flowers (white & yellow daisies)
        for (let x = 14; x < width; x += 36) {
          const cy = getMeadowY(x) + 12 + (x % 3) * 6;
          if (cy < height - 10) {
            ctx.fillStyle = (x % 2 === 0) ? '#fef08a' : '#ffffff';
            ctx.beginPath();
            ctx.arc(x, cy, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(x, cy, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();

        // 7. Floating Dandelion Fluff & Pollen in the wind
        ctx.save();
        for (let i = 0; i < 16; i++) {
          const speed = 0.6 + (i % 3) * 0.3;
          const px = ((width * 0.08 * i + t * 45 * speed) % (width + 60)) - 30;
          const py = (height * 0.2 + (i * 32) + Math.sin(t * 1.5 + i) * 18) % (height * 0.85);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.beginPath();
          ctx.arc(px, py, 1.8 + (i % 3) * 0.8, 0, Math.PI * 2);
          ctx.fill();
          // little fluff tail
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - 4, py + 3);
          ctx.stroke();
        }
        ctx.restore();

        // 8. Render Grass / Soil Ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.014;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.45, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(134, 239, 172, ${r.alpha * 0.9})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.65, r.radius * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(254, 240, 138, ${r.alpha * 0.7})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.restore();
        }

        // 9. Render Grass / Leaf Droplets Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= p.decay;
          p.rotation += p.rotSpeed;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          // leaf/grain shaped particle
          ctx.ellipse(0, 0, p.radius * 1.5, p.radius * 0.7, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.restore();
        }

        animRef.current = requestAnimationFrame(render);
      };

      animRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.15) {
        triggerRipple(e.clientX, e.clientY, 60);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.3);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

FarmHeroCanvas.displayName = 'FarmHeroCanvas';
