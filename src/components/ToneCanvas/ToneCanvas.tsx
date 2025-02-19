import { useRef, useState, useEffect } from 'react';
import { useCanvasSetup } from './utils/useCanvasSetup';
import { useZoomAndPan } from './utils/useZoomAndPan';

const ToneCanvas = (props: { progress: number, onClick: () => void }) => {
  const { progress, onClick } = props
  const dpr = window.devicePixelRatio
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
  } = useZoomAndPan({ dpr });
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return
    canvas.addEventListener('wheel', handleWheel);
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel])


  useCanvasSetup({ canvasRef, scale, offset, activeNotes, progress });

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
        onClick={onClick}
        ref={canvasRef}
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