import { useState } from 'react';

export const useZoomAndPan = () => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const mouseX = e.clientX - e.currentTarget.offsetLeft;
    const mouseY = e.clientY - e.currentTarget.offsetTop;
    const newScale = scale * (1 - e.deltaY * 0.001);
    const scaleFactor = newScale / scale;

    setScale(Math.max(0.1, Math.min(newScale, 10)));
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