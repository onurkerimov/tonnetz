const tonnetzNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'];

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
  const horizontalSpacing = 2 * radius * Math.sqrt(3);
  const verticalSpacing = radius * 3;

  const startCol = Math.floor(-offset.x / (scale * horizontalSpacing)) - 1;
  const endCol = startCol + Math.ceil(canvas.width / (scale * horizontalSpacing)) + 2;
  const startRow = Math.floor(-offset.y / (scale * verticalSpacing)) - 1;
  const endRow = startRow + Math.ceil(canvas.height / (scale * verticalSpacing)) + 2;

  // Draw lines first
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2);
      const y = row * verticalSpacing;

      ctx.strokeStyle = 'rgba(0, 0, 0)';
      ctx.lineWidth = 6;

      // Connect to the circle on the right
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + horizontalSpacing, y);
      ctx.stroke();

      // Connect to the two circles below
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - horizontalSpacing / 2, y + verticalSpacing);
      ctx.moveTo(x, y);
      ctx.lineTo(x + horizontalSpacing / 2, y + verticalSpacing);
      ctx.stroke();
    }
  }

  // Draw circles
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2);
      const y = row * verticalSpacing;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.abs((x + y) * 10) % 360}, 70%, 50%)`;
      ctx.fill();

      // Add note name
      const noteIndex = ((row % 4) * 3 + col) % 12;
      const noteName = tonnetzNotes[noteIndex];
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(noteName, x, y);
    }
  }

  ctx.restore();
};