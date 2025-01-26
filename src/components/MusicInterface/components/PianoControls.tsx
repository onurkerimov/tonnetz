import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import styles from '../MusicInterface.module.css';

interface PianoControlsProps {
  showNoteNames: boolean;
  setShowNoteNames: (value: boolean) => void;
  noteCount: number;
  setNoteCount: (value: number) => void;
  startNote: number;
  setStartNote: (value: number) => void;
}

const PianoControls: React.FC<PianoControlsProps> = ({
  showNoteNames,
  setShowNoteNames,
  noteCount,
  setNoteCount,
  startNote,
  setStartNote,
}) => {
  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className={styles.controlsPanel}>
      <h3 className={styles.sectionTitle}>Piano Controls</h3>
      <div className={styles.controlRow}>
        <span className={styles.controlLabel}>Show Notes</span>
        <Toggle
          pressed={showNoteNames}
          onPressedChange={setShowNoteNames}
          aria-label="Toggle note names"
        />
      </div>
      <div className={styles.controlRow}>
        <span className={styles.controlLabel}>Key Count</span>
        <input
          type="number"
          min="1"
          max="88"
          value={noteCount}
          onChange={(e) => setNoteCount(Math.max(1, Math.min(88, parseInt(e.target.value) || 1)))}
          className={styles.input}
        />
      </div>
      <div className={styles.controlRow}>
        <span className={styles.controlLabel}>Start Note</span>
        <select
          value={startNote}
          onChange={(e) => setStartNote(parseInt(e.target.value))}
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

export default PianoControls; 