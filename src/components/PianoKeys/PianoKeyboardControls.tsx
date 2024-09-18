import React from 'react';
import styles from './PianoKeys.module.css';

interface Options {
  showNoteNames: boolean;
  noteCount: number;
  startNote: number;
}

interface PianoKeyboardControlsProps {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

const PianoKeyboardControls: React.FC<PianoKeyboardControlsProps> = ({
  options,
  setOptions,
}) => {
  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const handleShowNoteNamesChange = (show: boolean) => {
    setOptions(prev => ({ ...prev, showNoteNames: show }));
  };

  const handleNoteCountChange = (count: number) => {
    setOptions(prev => ({ ...prev, noteCount: Math.max(1, Math.min(88, count)) }));
  };

  const handleStartNoteChange = (note: number) => {
    setOptions(prev => ({ ...prev, startNote: note }));
  };

  return (
    <div className={styles.controls}>
      <div>
        <label className="mr-2">Show Note Names:</label>
        <input
          type="checkbox"
          checked={options.showNoteNames}
          onChange={(e) => handleShowNoteNamesChange(e.target.checked)}
        />
      </div>
      <div>
        <label className="mr-2">Number of Keys:</label>
        <input
          type="number"
          min="1"
          max="88"
          value={options.noteCount}
          onChange={(e) => handleNoteCountChange(parseInt(e.target.value) || 1)}
          className={styles.input}
        />
      </div>
      <div>
        <label className="mr-2">Start Note:</label>
        <select
          value={options.startNote}
          onChange={(e) => handleStartNoteChange(parseInt(e.target.value))}
          className={styles.select}
        >
          {allNotes.map((note, index) => (
            <option key={index} value={index}>{note}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PianoKeyboardControls;