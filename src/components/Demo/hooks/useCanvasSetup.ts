import { useEffect } from 'react';

export const useCanvasSetup = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scale: number,
  offset: { x: number; y: number },
  drawFunction: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number, offset: { x: number; y: number }) => void
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFunction(ctx, canvas, scale, offset);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, scale, offset, drawFunction]);
};