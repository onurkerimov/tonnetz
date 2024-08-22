export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scale: number,
  offset: { x: number; y: number }
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);

  const radius = 20;
  const horizontalSpacing = radius * Math.sqrt(3);
  const verticalSpacing = radius * 1.5;

  const startCol = Math.floor(-offset.x / (scale * horizontalSpacing)) - 1;
  const endCol = startCol + Math.ceil(canvas.width / (scale * horizontalSpacing)) + 2;
  const startRow = Math.floor(-offset.y / (scale * verticalSpacing)) - 1;
  const endRow = startRow + Math.ceil(canvas.height / (scale * verticalSpacing)) + 2;

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2);
      const y = row * verticalSpacing;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.abs((x + y) * 10) % 360}, 70%, 50%)`;
      ctx.fill();
    }
  }

  ctx.restore();
};