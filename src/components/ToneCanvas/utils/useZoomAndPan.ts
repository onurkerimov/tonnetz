import { useState } from 'react';

document.body.style.overflow = 'hidden';

export const useZoomAndPan = ({ dpr } : {dpr: number}) => {
  const [scale, setScale] = useState(2);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const newScale = scale * (1 - e.deltaY * 0.001);

    // Check if the new scale is within the allowed range
    if (newScale < 0.8 || newScale > 10) {
      return; // Do nothing if max zoom in or out is achieved
    }

    const scaleFactor = newScale / scale;
    setScale(newScale);
    
    const mouseX = dpr * (e.clientX - (e.currentTarget as HTMLElement).offsetLeft);
    const mouseY = dpr * (e.clientY - (e.currentTarget as HTMLElement).offsetTop);
    setOffset({
      x: mouseX - (mouseX - offset.x) * scaleFactor,
      y: mouseY - (mouseY - offset.y) * scaleFactor,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX * dpr - offset.x, y: e.clientY * dpr - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX * dpr - dragStart.x,
      y: e.clientY * dpr - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    scale,
    offset,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};