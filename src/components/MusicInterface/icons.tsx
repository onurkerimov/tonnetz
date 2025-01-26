import React from 'react';

export const HexagonIcon = ({ className = "", rotate = false }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{ transform: rotate ? 'rotate(90deg)' : undefined }}
  >
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
  </svg>
); 