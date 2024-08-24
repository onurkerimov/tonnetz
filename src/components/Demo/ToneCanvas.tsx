import React, { useRef } from 'react';
import { useCanvasSetup } from './utils/useCanvasSetup';
import { useZoomAndPan } from './utils/useZoomAndPan';

const ToneCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    scale, 
    offset, 
    handleWheel, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    isDragging 
  } = useZoomAndPan();

  useCanvasSetup(canvasRef, scale, offset);

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    />
  );
};

export default ToneCanvas;