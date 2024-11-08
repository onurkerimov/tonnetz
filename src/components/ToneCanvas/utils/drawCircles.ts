// const tonnetzNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'];
const tonnetzNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scale: number,
  offset: { x: number; y: number },
  activeNotes: number[],
  shiftInterpolation: number = 0.5 // New parameter for interpolating between x and y shifts
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale, scale);

  const radius = 20;
  const longSpacing = 2 * radius * Math.sqrt(3);
  const shortSpacing = radius * 3;
  const colSpacing = shortSpacing * shiftInterpolation + (1 -shiftInterpolation) * longSpacing;
  const rowSpacing = longSpacing * shiftInterpolation + (1- shiftInterpolation) * shortSpacing;

  const extraSpacing = 1;
  const extraSpacingEnd = 2;

  const startCol = Math.floor(-offset.x / (scale * colSpacing)) - extraSpacing;
  const endCol = startCol + Math.ceil(canvas.width / (scale * colSpacing)) + extraSpacingEnd + 1;
  const startRow = Math.floor(-offset.y / (scale * rowSpacing)) - extraSpacing;
  const endRow = startRow + Math.ceil(canvas.height / (scale * rowSpacing)) + extraSpacingEnd + 1;

  // Function to calculate the position of a circle
  const getCirclePosition = (row: number, col: number) => {
    const xShift = (row % 2 === 0 ? 0 : colSpacing / 2) * (1 - shiftInterpolation);
    const yShift = (col % 2 === 0 ? 0 : rowSpacing / 2) * shiftInterpolation;
    return {
      x: col * colSpacing + xShift,
      y: row * rowSpacing + yShift
    };
  };

  // Draw lines first
  ctx.lineWidth = 2;
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const current = getCirclePosition(row, col);
      const right = getCirclePosition(row, col + 1);
      const bottomRight = getCirclePosition(row + 1, col);
      const bottomLeft = getCirclePosition(row + 1, col + (row % 2 ? 1 : -1));

      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();

      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.stroke();

      if(col % 2) ctx.strokeStyle = 'blue';
      else ctx.strokeStyle = 'black'
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(bottomLeft.x, bottomLeft.y);
      ctx.stroke();
    }
  }

  const rowFactor = -7;
  const colFactor = 4;

  // Draw circles
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const { x, y } = getCirclePosition(row, col);

      // Compute note name based on the tonnetz layout
      let noteIndex = ((col + (row % 2 ? 1 : 0)) * colFactor + row * rowFactor) % 12;
      if (noteIndex < 0) noteIndex += 12;
      const noteName = tonnetzNotes[noteIndex];

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
      
      // Check if the current note is active
      if (activeNotes.map(note => note % 12).includes(noteIndex)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'; // Highlight color (yellow with 50% opacity)
        ctx.fill();
      } else {
        ctx.fillStyle = isAnchorNote(noteName) ? '#FF6B6B' : 'gray';
        ctx.fill();
      }

      // Add note name
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(noteName.toString(), x, y);
    }
  }

  ctx.restore();
};

const isAnchorNote = (noteId: number) => {
  return false //[0, 2, 6 , 8].includes(noteId);
}