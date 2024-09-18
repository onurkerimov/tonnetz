import React, { useState, useCallback, useMemo } from 'react';
import styles from './PianoKeys.module.css';
import PianoKeysContainer from './PianoKeysContainer';
import PianoKeyboardControls from './PianoKeyboardControls';
import ChordButtons from './ChordButtons';
import usePianoKeyboard from './usePianoKeyboard';

interface Options {
  showNoteNames: boolean;
  noteCount: number;
  startNote: number;
}

const defaultOptions = {
  showNoteNames: true,
  noteCount: 18,
  startNote: 9,
}

const PianoKeys: React.FC = () => {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [activeKeyIndices, setActiveKeyIndices] = useState<number[]>([]);
  const [activeChordKeyIndices, setActiveChordKeyIndices] = useState<number[]>([]);

  const {
    notes,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
  } = usePianoKeyboard({ 
    noteCount: options.noteCount, 
    startNote: options.startNote, 
    setActiveKeyIndices 
  });

  const indices = useMemo(() => {
    return Array.from(new Set([...activeKeyIndices, ...activeChordKeyIndices]))
  }, [activeChordKeyIndices, activeKeyIndices])

  return (
    <div className={styles.container}>
      <PianoKeyboardControls
        options={options}
        setOptions={setOptions}
      />
      <ChordButtons 
        setActiveKeyIndices={setActiveChordKeyIndices} 
        startNote={options.startNote} 
        noteCount={options.noteCount} 
      />
      <PianoKeysContainer
        notes={notes}
        indices={indices}
        showNoteNames={options.showNoteNames}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        handleMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PianoKeys;