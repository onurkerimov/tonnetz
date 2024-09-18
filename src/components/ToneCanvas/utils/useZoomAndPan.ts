import { useState } from 'react';

document.body.style.overflow = 'hidden';

export const useZoomAndPan = () => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const newScale = scale * (1 - e.deltaY * 0.001);

    // Check if the new scale is within the allowed range
    if (newScale < 0.5 || newScale > 10) {
      return; // Do nothing if max zoom in or out is achieved
    }

    const mouseX = e.clientX - e.currentTarget.offsetLeft;
    const mouseY = e.clientY - e.currentTarget.offsetTop;
    const scaleFactor = newScale / scale;

    setScale(newScale);
    setOffset({
      x: mouseX - (mouseX - offset.x) * scaleFactor,
      y: mouseY - (mouseY - offset.y) * scaleFactor,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
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