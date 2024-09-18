import React, { useRef, useState, useEffect } from 'react';
import { useCanvasSetup } from './utils/useCanvasSetup';
import { useZoomAndPan } from './utils/useZoomAndPan';

const ToneCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const { 
    scale, 
    offset, 
    handleWheel, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    isDragging 
  } = useZoomAndPan();
  useCanvasSetup(canvasRef, scale, offset, activeNotes);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const note = keyToNote(event.key);
      if (note && !activeNotes.includes(note)) {
        setActiveNotes(prev => [...prev, note]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const note = keyToNote(event.key);
      if (note) {
        setActiveNotes(prev => prev.filter(n => n !== note));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeNotes]);


  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <canvas
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
    </div>
  );
};

// Helper function to convert keyboard keys to note numbers
const keyToNote = (key: string): number | null => {
  const keyMap: { [key: string]: number } = {
    'a': 60, 's': 62, 'd': 64, 'f': 65, 'g': 67, 'h': 69, 'j': 71,
    'w': 61, 'e': 63, 't': 66, 'y': 68, 'u': 70
  };
  return keyMap[key.toLowerCase()] || null;
};

export default ToneCanvas;