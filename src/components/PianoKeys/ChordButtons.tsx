import React from 'react';
import styles from './PianoKeys.module.css';

interface ChordButtonsProps {
  setActiveKeyIndices: React.Dispatch<React.SetStateAction<number[]>>;
  startNote: number;
  noteCount: number;
}

const chords = {
  'C Major': ['C', 'E', 'G'],
  'F Major': ['F', 'A', 'C'],
  'G Major': ['G', 'B', 'D'],
  'A Minor': ['A', 'C', 'E'],
  'D Minor': ['D', 'F', 'A'],
  'E Minor': ['E', 'G', 'B'],
};

const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const ChordButtons: React.FC<ChordButtonsProps> = ({ setActiveKeyIndices, startNote, noteCount }) => {
  const handleChordClick = (chordNotes: string[]) => {
    const indices = chordNotes.map(note => {
      const noteIndex = allNotes.indexOf(note);
      const keyIndex = (noteIndex - startNote + 12) % 12;
      return keyIndex < noteCount ? keyIndex : -1;
    }).filter(index => index !== -1);

    setActiveKeyIndices(indices);
  };

  const handleReset = () => {
    setActiveKeyIndices([]);
  }

  return (
    <div className={styles.chordButtonsContainer}>
      {Object.entries(chords).map(([chordName, chordNotes]) => (
        <button
          key={chordName}
          className={styles.chordButton}
          onClick={() => handleChordClick(chordNotes)}
        >
          {chordName}
        </button>
      ))}
      <button onClick={handleReset} className={styles.resetButton}>Reset</button>
    </div>
  );
};

export default ChordButtons;