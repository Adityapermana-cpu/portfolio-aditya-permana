import React, {
  useEffect,
  useRef
} from 'react';

export const JourneyFarmCanvas: React.FC = () => {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext('2d', {
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

    interface DigitalParticle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      wobbleSpeed: number;
      seed: number;
      color: string;
    }

    let pollen: DigitalParticle[] = [];

    const initPollen = (
      width: number,
      height: number
    ) => {
      const count = Math.min(
        35,
        Math.max(
          16,
          Math.floor(
            (width * height) /
              85000
          )
        )
      );

      const colors = [
        'rgba(37,99,235,0.28)',
        'rgba(21,128,61,0.25)',
        'rgba(14,116,144,0.25)',
        'rgba(124,58,237,0.20)'
      ];

      pollen = Array.from(
        {
          length: count
        },
        (_, index) => ({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          radius:
            1 +
            Math.random() *
              2.5,

          speed:
            0.08 +
            Math.random() *
              0.22,

          wobbleSpeed:
            0.4 +
            Math.random() *
              1.4,

          seed:
            Math.random() *
            1000,

          color:
            colors[
              index %
                colors.length
            ]
        })
      );
    };

    const handleResize = () => {
      const parent =
        canvas.parentElement;

      const width =
        parent?.clientWidth ||
        window.innerWidth;

      const height =
        parent?.clientHeight ||
        window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio ||
          1,
        1.5
      );

      canvas.width =
        Math.floor(
          width * dpr
        );

      canvas.height =
        Math.floor(
          height * dpr
        );

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      initPollen(
        width,
        height
      );
    };

    const handleVisibilityChange =
      () => {
        isRunning =
          document.visibilityState ===
          'visible';
      };

    const observer =
      new IntersectionObserver(
        (entries) => {
          isVisible =
            entries[0]
              ?.isIntersecting ??
            true;
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

    const drawGrid = (
      width: number,
      height: number
    ) => {
      const gridSize = 42;

      ctx.save();

      ctx.strokeStyle =
        'rgba(30,64,175,0.075)';

      ctx.lineWidth = 1;

      for (
        let x = 0;
        x <= width;
        x += gridSize
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x,
          0
        );

        ctx.lineTo(
          x,
          height
        );

        ctx.stroke();
      }

      for (
        let y = 0;
        y <= height;
        y += gridSize
      ) {
        ctx.beginPath();

        ctx.moveTo(
          0,
          y
        );

        ctx.lineTo(
          width,
          y
        );

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFlowLines = (
      width: number,
      height: number
    ) => {
      ctx.save();

      ctx.lineWidth = 1.5;

      for (
        let index = 0;
        index < 7;
        index++
      ) {
        const baseY =
          height *
          (0.18 +
            index * 0.105);

        ctx.beginPath();

        for (
          let x = 0;
          x <= width;
          x += 10
        ) {
          const wave =
            Math.sin(
              x * 0.009 +
                time *
                  (0.35 +
                    index *
                      0.03) +
                index
            ) *
            (5 +
              index *
                0.6);

          const y =
            baseY +
            wave;

          if (x === 0) {
            ctx.moveTo(
              x,
              y
            );
          } else {
            ctx.lineTo(
              x,
              y
            );
          }
        }

        ctx.strokeStyle =
          index % 2 === 0
            ? 'rgba(37,99,235,0.13)'
            : 'rgba(21,128,61,0.11)';

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawSystemConnections = (
      width: number,
      height: number
    ) => {
      const nodes = [
        {
          x:
            width * 0.13,
          y:
            height * 0.31
        },
        {
          x:
            width * 0.36,
          y:
            height * 0.21
        },
        {
          x:
            width * 0.62,
          y:
            height * 0.34
        },
        {
          x:
            width * 0.84,
          y:
            height * 0.23
        }
      ];

      ctx.save();

      ctx.strokeStyle =
        'rgba(30,64,175,0.13)';

      ctx.lineWidth = 1.5;

      ctx.setLineDash([
        5,
        8
      ]);

      for (
        let index = 0;
        index <
        nodes.length - 1;
        index++
      ) {
        const current =
          nodes[index];

        const next =
          nodes[index + 1];

        ctx.beginPath();

        ctx.moveTo(
          current.x,
          current.y
        );

        ctx.bezierCurveTo(
          current.x +
            (next.x -
              current.x) *
              0.35,
          current.y -
            35,
          current.x +
            (next.x -
              current.x) *
              0.65,
          next.y +
            35,
          next.x,
          next.y
        );

        ctx.stroke();
      }

      ctx.setLineDash([]);

      nodes.forEach(
        (node, index) => {
          const pulse =
            1 +
            Math.sin(
              time * 2 +
                index
            ) *
              0.08;

          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            5 * pulse,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            index % 2 === 0
              ? 'rgba(37,99,235,0.75)'
              : 'rgba(21,128,61,0.75)';

          ctx.fill();

          ctx.strokeStyle =
            'rgba(15,23,42,0.28)';

          ctx.lineWidth = 1.5;

          ctx.stroke();
        }
      );

      ctx.restore();
    };

    const drawParticles = (
      width: number,
      height: number
    ) => {
      ctx.save();

      pollen.forEach(
        (particle) => {
          particle.y -=
            particle.speed;

          particle.x +=
            Math.sin(
              time *
                particle.wobbleSpeed +
                particle.seed
            ) *
            0.18;

          if (
            particle.y <
            -10
          ) {
            particle.y =
              height + 10;

            particle.x =
              Math.random() *
              width;
          }

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            particle.color;

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const render = (
      timestamp: number
    ) => {
      animationFrameId =
        requestAnimationFrame(
          render
        );

      if (
        !isRunning ||
        !isVisible
      ) {
        return;
      }

      /*
       * Render sekitar 30 FPS.
       */
      if (
        timestamp -
          lastDrawTime <
        28
      ) {
        return;
      }

      lastDrawTime =
        timestamp;

      time += 0.025;

      const parent =
        canvas.parentElement;

      const width =
        parent?.clientWidth ||
        window.innerWidth;

      const height =
        parent?.clientHeight ||
        window.innerHeight;

      /*
       * Base digital landscape
       */
      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          0,
          height
        );

      gradient.addColorStop(
        0,
        '#f8fafc'
      );

      gradient.addColorStop(
        0.45,
        '#eff6ff'
      );

      gradient.addColorStop(
        1,
        '#f0fdf4'
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Digital grid
       */
      drawGrid(
        width,
        height
      );

      /*
       * Animated flow contours
       */
      drawFlowLines(
        width,
        height
      );

      /*
       * Developer/system architecture
       */
      drawSystemConnections(
        width,
        height
      );

      /*
       * Floating particles
       */
      drawParticles(
        width,
        height
      );
    };

    animationFrameId =
      requestAnimationFrame(
        render
      );

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default JourneyFarmCanvas;