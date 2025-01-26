import React, { useState, useMemo } from 'react';
import styles from './PianoKeys.module.css';
import PianoKeysContainer from './PianoKeysContainer';
import ChordButtons from './ChordButtons';
import usePianoKeyboard from './usePianoKeyboard';

interface PianoKeysProps {
  showNoteNames?: boolean;
  noteCount?: number;
  startNote?: number;
}

const defaultOptions = {
  showNoteNames: true,
  noteCount: 18,
  startNote: 9,
}

const PianoKeys: React.FC<PianoKeysProps> = ({ 
  showNoteNames = defaultOptions.showNoteNames,
  noteCount = defaultOptions.noteCount,
  startNote = defaultOptions.startNote,
}) => {
  const [activeKeyIndices, setActiveKeyIndices] = useState<number[]>([]);
  const [activeChordKeyIndices, setActiveChordKeyIndices] = useState<number[]>([]);

  const {
    notes,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
  } = usePianoKeyboard({ 
    noteCount, 
    startNote, 
    setActiveKeyIndices 
  });

  const indices = useMemo(() => {
    return Array.from(new Set([...activeKeyIndices, ...activeChordKeyIndices]))
  }, [activeChordKeyIndices, activeKeyIndices])

  return (
    <div className={styles.container}>
      <ChordButtons 
        setActiveKeyIndices={setActiveChordKeyIndices} 
        startNote={startNote} 
        noteCount={noteCount} 
      />
      <PianoKeysContainer
        notes={notes}
        indices={indices}
        showNoteNames={showNoteNames}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        handleMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PianoKeys;