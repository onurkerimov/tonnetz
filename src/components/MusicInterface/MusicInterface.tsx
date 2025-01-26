import React, { useState } from 'react';
import HexMorph from '../HexMorph/HexMorph';
import PianoKeys from '../PianoKeys/PianoKeys';
import ToneCanvas from '../ToneCanvas/ToneCanvas';
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HexagonIcon } from './icons';
import styles from './MusicInterface.module.css';

const MusicInterface = () => {
  const [progress, setProgress] = useState(0);
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [noteCount, setNoteCount] = useState(18);
  const [startNote, setStartNote] = useState(9);
  const [isRectangle, setIsRectangle] = useState(false);
  const [scale, setScale] = useState(2);

  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <ToneCanvas 
          progress={progress} 
          onClick={() => setProgress(prev => prev === 0 ? 1 : 0)} 
        />
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.controlsGroup}>
          <h3 className={styles.sectionTitle}>Canvas Controls</h3>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Layout</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    pressed={progress === 1}
                    onPressedChange={(pressed) => setProgress(pressed ? 1 : 0)}
                    aria-label="Toggle layout"
                  >
                    <HexagonIcon rotate={progress === 1} />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{progress === 0 ? "Switch to vertical layout" : "Switch to horizontal layout"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Zoom</span>
            <input
              type="range"
              min="0.8"
              max="10"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className={styles.slider}
            />
          </div>

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

          <h3 className={styles.sectionTitle}>Keyboard Layout</h3>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Shape</span>
            <Toggle
              pressed={isRectangle}
              onPressedChange={setIsRectangle}
              aria-label="Toggle keyboard shape"
            >
              <HexagonIcon rotate={isRectangle} />
            </Toggle>
          </div>
        </div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.controls}>
          <div className={styles.hexMorphSection}>
            <HexMorph isRectangle={isRectangle} />
          </div>
          <div className={styles.pianoSection}>
            <PianoKeys 
              showNoteNames={showNoteNames}
              noteCount={noteCount}
              startNote={startNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicInterface; 