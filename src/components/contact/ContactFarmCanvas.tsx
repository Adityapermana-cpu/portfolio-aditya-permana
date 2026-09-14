import React, { useEffect, useRef } from 'react';

interface GlowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
  color: string;
}

interface GrassRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const ContactFarmCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<GlowParticle[]>([]);
  const ripplesRef = useRef<GrassRipple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number | null = null;
    let time = 0;
    let isRunning = true;
    let isVisible = true;

    // Fireflies hovering at twilight
    const fireflies: { x: number; y: number; radius: number; speedX: number; speedY: number; phase: number }[] = [];
    const initFireflies = (width: number, height: number) => {
      fireflies.length = 0;
      const count = Math.min(30, Math.floor(width / 45));
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.8 + Math.random() * 2.2,
          speedX: (Math.random() - 0.5) * 0.7,
          speedY: (Math.random() - 0.5) * 0.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initFireflies(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let lastDrawTime = 0;

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
        if (isRunning && !animId) {
          animId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
          if (isVisible && isRunning && !animId) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);


    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 130,
        alpha: 0.9,
        speed: 3.0
      });

      const colors = ['#fde047', '#86efac', '#fef08a', '#4ade80'];
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 2.0 + Math.random() * 4.0;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.8,
          radius: 1.8 + Math.random() * 2.2,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.015,
          gravity: 0.14,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('click', handleClick);
    }

    const render = (now: number) => {
      if (!isRunning || !ctx || !canvas) return;
      if (!isVisible || document.hidden) {
        animId = null;
        return;
      }

      if (now - lastDrawTime < 28) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastDrawTime = now;

      const parent = canvas.parentElement;
      const width = parent?.clientWidth || canvas.width;
      const height = parent?.clientHeight || canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      // 1. Twilight Farm Pasture Gradient (Sky to Hill)
      const twilightGrad = ctx.createLinearGradient(0, 0, 0, height);
      twilightGrad.addColorStop(0, '#022c22'); // Deep twilight pine
      twilightGrad.addColorStop(0.35, '#064e3b');
      twilightGrad.addColorStop(0.7, '#065f46');
      twilightGrad.addColorStop(1, '#047857');
      ctx.fillStyle = twilightGrad;
      ctx.fillRect(0, 0, width, height);


      // Starry night twinkles in sky
      ctx.save();
      for (let i = 0; i < 28; i++) {
        const sx = ((i * 54 + Math.sin(i * 3) * 40) % width);
        const sy = ((i * 28 + Math.cos(i * 2) * 30) % (height * 0.6));
        const twinkle = (Math.sin(time * 3 + i) + 1) * 0.5;
        ctx.fillStyle = `rgba(254, 240, 138, ${0.3 + twinkle * 0.6})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2 + twinkle * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Hillside Contours
      const drawHill = (yPos: number, freq: number, amp: number, speed: number, alpha: number, color: string) => {
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const wy = yPos + Math.sin(x * freq + time * speed) * amp + Math.cos(x * (freq * 0.7) - time * (speed * 0.5)) * (amp * 0.5);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 14]);
        ctx.stroke();
        ctx.restore();
      };

      drawHill(height * 0.20, 0.005, 8, 0.8, 0.35, '#86efac');
      drawHill(height * 0.50, 0.004, 10, 0.7, 0.30, '#fde047');
      drawHill(height * 0.75, 0.004, 9, 0.6, 0.25, '#bbf7d0');

      // Glowing Fireflies hovering
      ctx.save();
      for (const f of fireflies) {
        f.x += f.speedX + Math.sin(time * 2 + f.phase) * 0.4;
        f.y += f.speedY + Math.cos(time * 1.5 + f.phase) * 0.4;

        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < -10) f.y = height + 10;
        if (f.y > height + 10) f.y = -10;

        const glow = (Math.sin(time * 3 + f.phase) + 1) * 0.5;
        ctx.fillStyle = `rgba(254, 240, 138, ${0.4 + glow * 0.6})`;
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 8 + glow * 10;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * (0.8 + glow * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.018;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#86efac';
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, r.radius * 0.6), 0, Math.PI * 2);
        ctx.strokeStyle = '#fef08a';
        ctx.globalAlpha = r.alpha * 0.8;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Droplets
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const d = particlesRef.current[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vy += d.gravity;
        d.alpha -= d.decay;

        if (d.alpha <= 0 || d.y > height) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fill();
        ctx.restore();
      }

      // Bottom Grass Furrow Floor
      const floorY = height * 0.88;
      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, floorY, 0, height);
      floorGrad.addColorStop(0, '#14532d');
      floorGrad.addColorStop(0.5, '#166534');
      floorGrad.addColorStop(1.0, '#0f291e');
      ctx.fillStyle = floorGrad;

      ctx.beginPath();
      ctx.moveTo(-50, height + 20);
      ctx.lineTo(-50, floorY);

      for (let x = -50; x <= width + 50; x += 10) {
        const sy =
          floorY +
          Math.sin(x * 0.006 + time * 0.8) * 8 +
          Math.cos(x * 0.009 - time * 0.4) * 4;
        ctx.lineTo(x, sy);
      }

      ctx.lineTo(width + 50, height + 20);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('click', handleClick);
      }
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
