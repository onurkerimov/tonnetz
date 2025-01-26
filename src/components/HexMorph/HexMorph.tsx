import React, { useState, useEffect } from 'react';
import Shape from './Shape';
import styles from './HexMorph.module.css';

const hexagonPoints = [
  [100, -45], [200, 22.5],
  [200, 135], [100, 202.5],
  [0, 135],   [0, 22.5]
];

const rectanglePoints = [
  [100, -9], [197, -9],
  [197, 170], [100, 170],
  [5, 170], [5, -9]
];

const blackNotes = '2356790SDGHJL'.split('')
const disabledNotes = '148AFKOLP'.split('')
const tempNotes = '90-'.split('')

interface HexMorphProps {
  isRectangle?: boolean;
}

const HexMorph: React.FC<HexMorphProps> = ({ isRectangle: externalIsRectangle = false }) => {
  const [isRectangleState, setIsRectangleState] = useState(externalIsRectangle);
  const [currentPoints, setCurrentPoints] = useState(isRectangleState ? rectanglePoints : hexagonPoints);
  const radius = isRectangleState ? 50 : 0;

  useEffect(() => {
    setIsRectangleState(externalIsRectangle);
  }, [externalIsRectangle]);

  useEffect(() => {
    setCurrentPoints(isRectangleState ? rectanglePoints : hexagonPoints);
  }, [isRectangleState]);

  // Handle click to trigger the morphing animation
  const handleClick = () => {
    if (externalIsRectangle === undefined) {
      setIsRectangleState(!isRectangleState);
    }
  };

  const shapes = (arr: string[]) => {
    return arr.map((item) => {
      let className = ''
      if(isRectangleState) {
        if(blackNotes.includes(item)) className = styles.blackNote
        if(disabledNotes.includes(item)) className = styles.emptyNote
        if(tempNotes.includes(item)) className = styles.tempNote
      }
      return <Shape key={item} points={currentPoints} title={item} radius={radius} className={className} />
    })
  }

  return (
    <div onClick={handleClick} style={{zoom: 0.75}}>
      <div className={styles.container}>
        {shapes(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'])}
      </div>
      <div className={styles.container} style={{ marginTop: -228, marginLeft: 35}}>
        {shapes(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'])}
      </div>
      <div className={styles.container} style={{ marginTop: -228, marginLeft: 70}}>
        {shapes(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'])}
      </div>
      <div className={styles.container} style={{ marginTop: -228, marginLeft: 105}}>
        {shapes(['Z', 'X', 'C', 'V', 'B', 'N', 'M', ','])}
      </div>
    </div>
  )
}

export default HexMorph;
