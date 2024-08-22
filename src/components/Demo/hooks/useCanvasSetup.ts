import { useEffect } from 'react';
import { drawCircles } from '../helpers/drawCircles';

export const useCanvasSetup = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scale: number,
  offset: { x: number; y: number },
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCircles(ctx, canvas, scale, offset);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, scale, offset]);
};