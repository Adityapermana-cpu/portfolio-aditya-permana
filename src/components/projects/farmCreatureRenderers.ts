export function drawSheep(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  time: number
): void {
  ctx.save();

  const pulse =
    1 +
    Math.sin(time * 2) *
      0.025;

  ctx.translate(
    x,
    y
  );

  ctx.scale(
    scale * pulse,
    scale * pulse
  );

  /*
   * Abstract system node
   */
  ctx.beginPath();

  ctx.roundRect(
    -26,
    -20,
    52,
    40,
    10
  );

  ctx.fillStyle =
    'rgba(255,255,255,0.75)';

  ctx.fill();

  ctx.strokeStyle =
    'rgba(30,64,175,0.55)';

  ctx.lineWidth = 2;

  ctx.stroke();

  /*
   * connection points
   */
  const points = [
    [-18, -20],
    [18, -20],
    [-18, 20],
    [18, 20]
  ];

  points.forEach(
    ([pointX, pointY]) => {
      ctx.beginPath();

      ctx.arc(
        pointX,
        pointY,
        4,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        '#15803d';

      ctx.fill();

      ctx.strokeStyle =
        '#0f172a';

      ctx.stroke();
    }
  );

  ctx.restore();
}

export function drawBabyChick(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  time: number
): void {
  ctx.save();

  const bounce =
    Math.sin(time * 2.4) *
    3;

  ctx.translate(
    x,
    y + bounce
  );

  ctx.scale(
    scale,
    scale
  );

  /*
   * API / application node
   */
  ctx.beginPath();

  ctx.arc(
    0,
    0,
    18,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    'rgba(253,224,71,0.78)';

  ctx.fill();

  ctx.strokeStyle =
    '#1c1917';

  ctx.lineWidth = 2;

  ctx.stroke();

  /*
   * inner code symbol
   */
  ctx.strokeStyle =
    '#1c1917';

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    -7,
    -5
  );

  ctx.lineTo(
    -12,
    0
  );

  ctx.lineTo(
    -7,
    5
  );

  ctx.moveTo(
    7,
    -5
  );

  ctx.lineTo(
    12,
    0
  );

  ctx.lineTo(
    7,
    5
  );

  ctx.stroke();

  ctx.restore();
}

export function drawHoneyBee(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  time: number
): void {
  ctx.save();

  const offset =
    Math.sin(time * 3) *
    5;

  ctx.translate(
    x,
    y + offset
  );

  ctx.scale(
    scale,
    scale
  );

  /*
   * network packet
   */
  ctx.beginPath();

  ctx.roundRect(
    -22,
    -13,
    44,
    26,
    8
  );

  ctx.fillStyle =
    'rgba(224,242,254,0.85)';

  ctx.fill();

  ctx.strokeStyle =
    '#0369a1';

  ctx.lineWidth = 2;

  ctx.stroke();

  /*
   * packet stripes
   */
  ctx.strokeStyle =
    'rgba(3,105,161,0.45)';

  ctx.lineWidth = 2;

  for (
    let index = -1;
    index <= 1;
    index++
  ) {
    ctx.beginPath();

    ctx.moveTo(
      index * 10,
      -8
    );

    ctx.lineTo(
      index * 10,
      8
    );

    ctx.stroke();
  }

  ctx.restore();
}

export function drawLadybug(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  time: number
): void {
  ctx.save();

  const rotation =
    Math.sin(time * 1.6) *
    0.08;

  ctx.translate(
    x,
    y
  );

  ctx.rotate(rotation);

  ctx.scale(
    scale,
    scale
  );

  /*
   * database cylinder
   */
  ctx.beginPath();

  ctx.ellipse(
    0,
    -13,
    24,
    8,
    0,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    'rgba(219,234,254,0.92)';

  ctx.fill();

  ctx.strokeStyle =
    '#1e3a8a';

  ctx.lineWidth = 2;

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(
    -24,
    -13
  );

  ctx.lineTo(
    -24,
    18
  );

  ctx.bezierCurveTo(
    -24,
    28,
    24,
    28,
    24,
    18
  );

  ctx.lineTo(
    24,
    -13
  );

  ctx.stroke();

  ctx.beginPath();

  ctx.ellipse(
    0,
    18,
    24,
    8,
    0,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.restore();
}

export function drawSpottedCow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  time: number
): void {
  ctx.save();

  const pulse =
    1 +
    Math.sin(time * 1.4) *
      0.02;

  ctx.translate(
    x,
    y
  );

  ctx.scale(
    scale * pulse,
    scale * pulse
  );

  /*
   * Server / cloud node
   */
  ctx.beginPath();

  ctx.roundRect(
    -30,
    -20,
    60,
    40,
    12
  );

  ctx.fillStyle =
    'rgba(255,255,255,0.78)';

  ctx.fill();

  ctx.strokeStyle =
    '#334155';

  ctx.lineWidth = 2;

  ctx.stroke();

  /*
   * server indicator lights
   */
  const indicatorX = [
    -18,
    -6,
    6,
    18
  ];

  indicatorX.forEach(
    (indicator) => {
      ctx.beginPath();

      ctx.arc(
        indicator,
        0,
        3.5,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        indicator === 6
          ? '#22c55e'
          : '#94a3b8';

      ctx.fill();
    }
  );

  ctx.restore();
}

export function renderCreaturesByDepth(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  /*
   * Semua fungsi renderer tetap digunakan,
   * tetapi objek sekarang berfungsi sebagai
   * dekorasi abstrak untuk teknologi/sistem.
   */

  if (depthLevel === 1) {
    drawSheep(
      ctx,
      width * 0.14,
      height * 0.22,
      0.7,
      time
    );

    drawBabyChick(
      ctx,
      width * 0.78,
      height * 0.18,
      0.65,
      time
    );

    drawHoneyBee(
      ctx,
      width * 0.9,
      height * 0.34,
      0.55,
      time
    );
  } else if (depthLevel === 2) {
    drawSpottedCow(
      ctx,
      width * 0.18,
      height * 0.42,
      0.7,
      time
    );

    drawSheep(
      ctx,
      width * 0.82,
      height * 0.36,
      0.62,
      time
    );
  } else if (depthLevel === 3) {
    drawBabyChick(
      ctx,
      width * 0.25,
      height * 0.62,
      0.6,
      time
    );

    drawHoneyBee(
      ctx,
      width * 0.74,
      height * 0.58,
      0.5,
      time
    );
  } else {
    drawLadybug(
      ctx,
      width * 0.16,
      height * 0.78,
      0.62,
      time
    );

    drawSheep(
      ctx,
      width * 0.86,
      height * 0.72,
      0.58,
      time
    );

    drawSpottedCow(
      ctx,
      width * 0.52,
      height * 0.86,
      0.55,
      time
    );
  }
}