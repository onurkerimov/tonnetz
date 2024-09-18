import React from 'react';
import styles from './PianoKeys.module.css';

interface PianoKeyProps {
  note: string;
  index: number;
  isBlack: boolean;
  isActive: boolean;
  showNoteName: boolean;
  onMouseEnter: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ 
  note, 
  isBlack, 
  isActive, 
  showNoteName, 
  onMouseEnter, 
  onMouseDown, 
  onMouseUp 
}) => (
  <div
    className={`
      ${styles.key}
      ${isBlack ? styles.blackKey : styles.whiteKey}
      ${isActive ? (isBlack ? styles.activeBlackKey : styles.activeWhiteKey) : ''}
    `}
    onMouseEnter={onMouseEnter}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    {showNoteName && note}
  </div>
);

export default PianoKey;