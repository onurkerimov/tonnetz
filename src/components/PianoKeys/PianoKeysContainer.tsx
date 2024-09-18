import React from 'react';
import PianoKey from './PianoKey'; // Adjust the import path if necessary
import styles from './PianoKeys.module.css'; // Adjust the import path if necessary

interface PianoKeysContainerProps {
  notes: string[];
  indices: number[];
  showNoteNames: boolean;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  handleMouseEnter: (index: number) => void;
  handleMouseDown: (index: number) => void;
}

const PianoKeysContainer: React.FC<PianoKeysContainerProps> = ({
  notes,
  indices,
  showNoteNames,
  handleMouseUp,
  handleMouseLeave,
  handleMouseEnter,
  handleMouseDown,
}) => {
  return (
    <div 
      className={styles.keyboardContainer}
      onMouseUp={handleMouseUp} 
      onMouseLeave={handleMouseLeave}
    >
      {notes.map((note, index) => (
        <PianoKey
          key={index}
          note={note}
          index={index}
          isBlack={note.includes('#')}
          isActive={indices.includes(index)}
          showNoteName={showNoteNames}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseDown={() => handleMouseDown(index)}
          onMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
};

export default PianoKeysContainer;
