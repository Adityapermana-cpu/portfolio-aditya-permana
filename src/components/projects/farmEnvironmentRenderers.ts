export interface MeadowBounds {
  waterMinY: number;
  waterMaxY: number;
}

export function renderWaterBody(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  let topColor = '#eff6ff';
  let middleColor = '#dbeafe';
  let bottomColor = '#bfdbfe';

  if (depthLevel === 1) {
    topColor = '#eff6ff';
    middleColor = '#dbeafe';
    bottomColor = '#bfdbfe';
  } else if (depthLevel === 2) {
    topColor = '#e0f2fe';
    middleColor = '#bae6fd';
    bottomColor = '#93c5fd';
  } else if (depthLevel === 3) {
    topColor = '#dbeafe';
    middleColor = '#bfdbfe';
    bottomColor = '#93c5fd';
  } else {
    topColor = '#dbeafe';
    middleColor = '#93c5fd';
    bottomColor = '#60a5fa';
  }

  const gradient = ctx.createLinearGradient(
    0,
    0,
    0,
    height
  );

  gradient.addColorStop(
    0,
    topColor
  );

  gradient.addColorStop(
    0.5,
    middleColor
  );

  gradient.addColorStop(
    1,
    bottomColor
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  /*
   * Soft digital glow
   */
  const glow = ctx.createRadialGradient(
    width * 0.72,
    height * 0.18,
    0,
    width * 0.72,
    height * 0.18,
    width * 0.55
  );

  glow.addColorStop(
    0,
    'rgba(255,255,255,0.38)'
  );

  glow.addColorStop(
    1,
    'rgba(255,255,255,0)'
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );
}

export function renderSandLayers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4
): MeadowBounds {
  let waterMinY = 0;
  let waterMaxY = height;

  /*
   * Digital top layer
   */
  if (depthLevel === 1) {
    const topLayerHeight =
      height * 0.20;

    waterMinY =
      topLayerHeight;

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        0,
        topLayerHeight
      );

    gradient.addColorStop(
      0,
      'rgba(255,255,255,0.92)'
    );

    gradient.addColorStop(
      1,
      'rgba(239,246,255,0.72)'
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      width,
      topLayerHeight
    );

    /*
     * Architecture grid
     */
    ctx.save();

    ctx.strokeStyle =
      'rgba(30,64,175,0.10)';

    ctx.lineWidth = 1;

    const gridSize = 36;

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
        topLayerHeight
      );

      ctx.stroke();
    }

    for (
      let y = 0;
      y <= topLayerHeight;
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
  }

  /*
   * Digital footer / system layer
   */
  if (depthLevel === 4) {
    const bottomLayerY =
      height * 0.82;

    waterMaxY =
      bottomLayerY;

    const gradient =
      ctx.createLinearGradient(
        0,
        bottomLayerY,
        0,
        height
      );

    gradient.addColorStop(
      0,
      'rgba(30,64,175,0.10)'
    );

    gradient.addColorStop(
      1,
      'rgba(15,23,42,0.22)'
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      bottomLayerY,
      width,
      height - bottomLayerY
    );

    /*
     * Footer grid
     */
    ctx.save();

    ctx.strokeStyle =
      'rgba(15,23,42,0.15)';

    ctx.lineWidth = 1;

    const gridSize = 42;

    for (
      let x = 0;
      x <= width;
      x += gridSize
    ) {
      ctx.beginPath();

      ctx.moveTo(
        x,
        bottomLayerY
      );

      ctx.lineTo(
        x,
        height
      );

      ctx.stroke();
    }

    for (
      let y = bottomLayerY;
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
  }

  /*
   * Horizontal system divider
   */
  ctx.save();

  ctx.strokeStyle =
    'rgba(30,64,175,0.18)';

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    0,
    waterMinY
  );

  ctx.lineTo(
    width,
    waterMinY
  );

  ctx.stroke();

  if (waterMaxY < height) {
    ctx.beginPath();

    ctx.moveTo(
      0,
      waterMaxY
    );

    ctx.lineTo(
      width,
      waterMaxY
    );

    ctx.stroke();
  }

  ctx.restore();

  return {
    waterMinY,
    waterMaxY
  };
}

export function renderWaterWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  const lineCount =
    depthLevel === 4
      ? 8
      : 6;

  ctx.save();

  for (
    let lineIndex = 0;
    lineIndex < lineCount;
    lineIndex++
  ) {
    const baseY =
      height *
      (0.28 + lineIndex * 0.085);

    const amplitude =
      5 + lineIndex * 0.8;

    const frequency =
      0.009 + lineIndex * 0.001;

    const phase =
      time *
      (0.8 + lineIndex * 0.08);

    ctx.beginPath();

    for (
      let x = 0;
      x <= width;
      x += 8
    ) {
      const y =
        baseY +
        Math.sin(
          x * frequency + phase
        ) *
          amplitude;

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
      lineIndex % 2 === 0
        ? 'rgba(30,64,175,0.16)'
        : 'rgba(14,116,144,0.12)';

    ctx.lineWidth =
      lineIndex === 0
        ? 2
        : 1;

    ctx.stroke();
  }

  /*
   * Flow connection lines
   */
  const connectionY =
    height * 0.58;

  ctx.strokeStyle =
    'rgba(21,128,61,0.13)';

  ctx.lineWidth = 1.5;

  ctx.setLineDash([
    7,
    10
  ]);

  for (
    let index = 0;
    index < 4;
    index++
  ) {
    const y =
      connectionY +
      index * 22;

    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.bezierCurveTo(
      width * 0.25,
      y - 20,
      width * 0.45,
      y + 20,
      width * 0.7,
      y
    );

    ctx.bezierCurveTo(
      width * 0.82,
      y - 12,
      width * 0.92,
      y + 12,
      width,
      y
    );

    ctx.stroke();
  }

  ctx.setLineDash([]);

  ctx.restore();
}

export function renderBubbles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  const particleCount =
    depthLevel === 4
      ? 22
      : 14;

  ctx.save();

  for (
    let index = 0;
    index < particleCount;
    index++
  ) {
    const seed =
      index * 17.371;

    const x =
      ((seed * 31.17) % width + width) %
      width;

    const speed =
      0.12 +
      ((seed * 0.013) % 0.2);

    const cycle =
      (time * speed * 35 + seed) %
      (height + 80);

    const y =
      height + 40 - cycle;

    const radius =
      1.2 +
      ((seed * 0.017) % 2.8);

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      'rgba(255,255,255,0.45)';

    ctx.fill();

    ctx.strokeStyle =
      'rgba(30,64,175,0.18)';

    ctx.lineWidth = 1;

    ctx.stroke();
  }

  ctx.restore();
}