import React, { useEffect, useRef, useState } from 'react';
import { drawCircles } from './helpers/drawCircles';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useZoomAndPan } from './hooks/useZoomAndPan';

const Demo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scale, offset, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, isDragging } = useZoomAndPan();

  useCanvasSetup(canvasRef, scale, offset, drawCircles);

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ width: '100%', height: '100vh', cursor: isDragging ? 'grabbing' : 'grab' }}
    />
  );
};

export default Demo;