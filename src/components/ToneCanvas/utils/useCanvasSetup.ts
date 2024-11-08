import { useState, useEffect, useRef } from 'react';
import { drawCircles } from './drawCircles';
import { ease } from '../../../utils';

export const useCanvasSetup = (
  props: {
    canvasRef: React.RefObject<HTMLCanvasElement>,
    scale: number,
    offset: { x: number; y: number },
    activeNotes: number[],
    progress: number
  }
) => {
  const { canvasRef, scale, offset, activeNotes, progress } = props


  const [lateState, setLateState] = useState(progress)
  const prevStateRef = useRef(progress)
  useEffect(() => {
    const dispose = ease({
      from: prevStateRef.current,
      to: progress,
      duration: 200,
      callback: setLateState
    })
    prevStateRef.current = progress
    return dispose
  }, [progress])

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

      drawCircles(ctx, canvas, scale, offset, activeNotes, lateState); // Pass activeNotes here
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () =>  window.removeEventListener('resize', handleResize);
  }, [canvasRef, scale, offset, activeNotes, lateState]); // Add activeNotes to the dependency array
};