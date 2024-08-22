import React, { useEffect, useRef, useState } from 'react';

const Demo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);

      const radius = 20;
      const horizontalSpacing = radius * Math.sqrt(3);
      const verticalSpacing = radius * 1.5;

      const startCol = Math.floor(-offset.x / (scale * horizontalSpacing)) - 1;
      const endCol = startCol + Math.ceil(canvas.width / (scale * horizontalSpacing)) + 2;
      const startRow = Math.floor(-offset.y / (scale * verticalSpacing)) - 1;
      const endRow = startRow + Math.ceil(canvas.height / (scale * verticalSpacing)) + 2;

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          const x = col * horizontalSpacing + (row % 2 === 0 ? 0 : horizontalSpacing / 2);
          const y = row * verticalSpacing;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${Math.abs((x + y) * 10) % 360}, 70%, 50%)`;
          ctx.fill();
        }
      }

      ctx.restore();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCircles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scale, offset]);

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const newScale = scale * (1 - e.deltaY * 0.001);
    setScale(Math.max(0.1, Math.min(newScale, 10)));
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

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ width: '100%', height: '100vh', cursor: isDragging ? 'grabbing' : 'grab' }}
    />
  );
};

export default Demo;