import { useEffect } from 'react';
import { drawCircles } from './drawCircles';

export const useCanvasSetup = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scale: number,
  offset: { x: number; y: number },
  activeNotes: number[] // Add this parameter
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      drawCircles(ctx, canvas, scale, offset, activeNotes); // Pass activeNotes here
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, scale, offset, activeNotes]); // Add activeNotes to the dependency array
};