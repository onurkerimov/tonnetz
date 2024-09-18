// const tonnetzNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'];
const tonnetzNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scale: number,
  offset: { x: number; y: number },
  activeNotes: number[] // Add this parameter
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);

  const radius = 20;
  const horizontalSpacing = 2 * radius * Math.sqrt(3);
  const verticalSpacing = radius * 3;
  const extraSpacing = 1;
  const extraSpacingEnd = 2;

  const startCol = Math.floor(-offset.x / (scale * horizontalSpacing)) - extraSpacing;
  const endCol = startCol + Math.ceil(canvas.width / (scale * horizontalSpacing)) + extraSpacingEnd + 1;
  const startRow = Math.floor(-offset.y / (scale * verticalSpacing)) - extraSpacing;
  const endRow = startRow + Math.ceil(canvas.height / (scale * verticalSpacing)) + extraSpacingEnd + 1;

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

  const rowFactor = 3;
  const colFactor = 4;

  // Draw circles
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const x = col * horizontalSpacing + ((row%2) * horizontalSpacing / 2);
      const y = row * verticalSpacing;

      // Compute note name based on the tonnetz layout
      let noteIndex = ((col + (row % 2 ? 1 : 0)) * colFactor - row * rowFactor) % 12;
      if (noteIndex < 0) noteIndex += 12;
      const noteName = tonnetzNotes[noteIndex];

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      
      // Check if the current note is active
      if (activeNotes.map(note => note % 12).includes(noteIndex)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'; // Highlight color (yellow with 50% opacity)
        ctx.fill();
      } else {
        ctx.fillStyle = noteName === 'C' ? '#FF6B6B' : 'gray';
        ctx.fill();
      }

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