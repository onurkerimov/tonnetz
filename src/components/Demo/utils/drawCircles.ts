// const notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

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

      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 5;

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
      const x = col * horizontalSpacing + (row * horizontalSpacing / 2);
      const y = row * verticalSpacing;

      // Compute note name based on the tonnetz layout
      let noteIndex = (col + row * 4) % 12;
      if (noteIndex < 0) noteIndex += 12;
      const noteName = tonnetzNotes[noteIndex];

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = noteName === 'C' ? '#FF6B6B' : 'gray';
      ctx.fill();

      // Add note name
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(noteName, x, y);
    }
  }

  ctx.restore();
};