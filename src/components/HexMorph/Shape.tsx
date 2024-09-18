import React, { useState, useEffect, useRef } from 'react';

// Function to interpolate between two points
const interpolatePoints = (fromPoints, toPoints, t) => {
  return fromPoints.map((fromPoint, i) => {
    const [x1, y1] = fromPoint;
    const [x2, y2] = toPoints[i];
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    return [x, y];
  });
};

// Function to animate the morph
const morphShapes = ({fromPoints, toPoints, fromRadius = 0, toRadius = 0, setCurrentPath, duration = 200}) => {
  let startTime;

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(elapsed / duration, 1); // Normalize time between 0 and 1

    const newRadius = t * toRadius + (1 - t) * fromRadius;

    // Interpolate the points and generate the SVG path
    const newPoints = interpolatePoints(fromPoints, toPoints, t);
    const newPath = generateSVGPath(newPoints, newRadius); // Generate SVG path

    setCurrentPath(newPath); // Set the current SVG path

    if (t < 1) {
      requestAnimationFrame(animate); // Continue animation until complete
    }
  };

  requestAnimationFrame(animate);
};

const Shape = ({ points, fill, radius, title, className }) => {
  const [currentPath, setCurrentPath] = useState(generateSVGPath(points, radius));
  const prevPointsRef = useRef(points);
  const prevRadiusRef = useRef(radius);

  useEffect(() => {
    if (prevPointsRef.current !== points) {
      morphShapes({
        fromPoints: prevPointsRef.current, 
        toPoints: points, 
        
        setCurrentPath, 
        
        fromRadius: prevRadiusRef.current, 
        toRadius: radius,
        duration: 250
      });
      prevPointsRef.current = points;
      prevRadiusRef.current = radius;
    }
  }, [points, radius]);

  return (
    <svg width="70" height="85" viewBox="-10 -20 220 195" xmlns="http://www.w3.org/2000/svg" className={className}    fill={fill || '#ccc'}
    stroke='white'>
      <path
        d={currentPath} // Use the updated path
        strokeWidth={8}
        style={{ cursor: 'pointer' }}
      />
      <text x="47%" y="44%" text-anchor="middle" dominant-baseline="middle" font-size="72" style={{"userSelect": "none"}}>
        {title}
      </text>
    </svg>
  );
};

export default Shape;

function generateSVGPath(points, cornerRadius = 20) {
  if (!points || points.length < 2) return '';

  let path = ``; // Move to the first point

  for (let i = 0; i < points.length; i++) {
    const currentPoint = points[i];
    const nextPoint = points[(i + 1) % points.length];
    const prevPoint = points[(i - 1 + points.length) % points.length];

    // Calculate direction vectors for previous and next points
    const vecPrev = [currentPoint[0] - prevPoint[0], currentPoint[1] - prevPoint[1]];
    const vecNext = [nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1]];

    // Normalize vectors to determine smooth transitions
    const prevLength = Math.sqrt(vecPrev[0] ** 2 + vecPrev[1] ** 2);
    const nextLength = Math.sqrt(vecNext[0] ** 2 + vecNext[1] ** 2);
    const normPrev = [vecPrev[0] / prevLength, vecPrev[1] / prevLength];
    const normNext = [vecNext[0] / nextLength, vecNext[1] / nextLength];

    // Calculate the corner points by moving in the direction of the vectors
    const cornerStart = [
      currentPoint[0] - normPrev[0] * cornerRadius,
      currentPoint[1] - normPrev[1] * cornerRadius,
    ];

    const cornerEnd = [
      currentPoint[0] + normNext[0] * cornerRadius,
      currentPoint[1] + normNext[1] * cornerRadius,
    ];

    path += ` ${i === 0 ? 'M': 'L'} ${cornerStart[0]} ${cornerStart[1]}`;
    path += ` Q ${currentPoint[0]} ${currentPoint[1]} ${cornerEnd[0]} ${cornerEnd[1]}`;
  }

  path += ' Z'; // Close the path

  return path;
}
