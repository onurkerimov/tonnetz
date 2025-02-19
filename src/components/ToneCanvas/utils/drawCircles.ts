// const tonnetzNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'];
const tonnetzNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'];

const COLOR = 'rgba(125, 125, 125, 1)'
const getColor = (progress: number) => {
  return `rgba(125, 125, 125, ${progress})`
}

export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scale: number,
  offset: { x: number; y: number },
  activeNotes: number[],
  shiftInterpolation: number // New parameter for interpolating between x and y shifts
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
      const bottomLeft2 = getCirclePosition(row + 1, col + (row % 2 ? -1 : 1));

      ctx.strokeStyle = COLOR;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();

      ctx.strokeStyle = COLOR;
      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.stroke();

      if(col % 2) {
        ctx.strokeStyle = COLOR;
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(bottomLeft.x, bottomLeft.y);
        ctx.stroke();

        ctx.strokeStyle = getColor(shiftInterpolation) 
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(bottomLeft2.x, bottomLeft2.y);
        ctx.stroke();
      } else {
        ctx.strokeStyle = getColor(1 - shiftInterpolation) 
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(bottomLeft.x, bottomLeft.y);
        ctx.stroke();
      }
    }
  }

  const rowFactor = 1// -7;
  const colFactor = 1//4;

  // Draw circles
  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const { x, y } = getCirclePosition(row, col);

      // Compute note name based on the tonnetz layout
      let noteIndex = ((col + (row % 2 ? 1 : 0)) * colFactor + row * rowFactor) % 12;
      if (noteIndex < 0) noteIndex += 12;
      const noteName = tonnetzNotes[noteIndex];

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
      
      // Check if the current note is active
      if (activeNotes.map(note => note % 12).includes(noteIndex)) {
        ctx.fillStyle = 'rgba(212, 212, 212, 1)'; // Highlight color (yellow with 50% opacity)
        ctx.fill();
      } else {
        ctx.fillStyle = COLOR;
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

const isAnchorNote = (noteIndex: number) => {
  return [0, 7, 2, 9, 4, 11].includes(noteIndex); // C, G, D, A, E, F notes
}