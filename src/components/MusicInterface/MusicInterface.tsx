import React, { useState } from 'react';
import HexMorph from '../HexMorph/HexMorph';
import PianoKeys from '../PianoKeys/PianoKeys';
import ToneCanvas from '../ToneCanvas/ToneCanvas';
import CanvasControls from './components/CanvasControls';
import PianoControls from './components/PianoControls';
import KeyboardLayoutControls from './components/KeyboardLayoutControls';
import TitlePanel from './components/TitlePanel';
import styles from './MusicInterface.module.css';

const MusicInterface = () => {
  const [progress, setProgress] = useState(0);
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [noteCount, setNoteCount] = useState(18);
  const [startNote, setStartNote] = useState(9);
  const [isRectangle, setIsRectangle] = useState(false);
  const [scale, setScale] = useState(2);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <ToneCanvas 
          progress={progress} 
          onClick={() => setProgress(prev => prev === 0 ? 1 : 0)} 
        />
      </div>
      <TitlePanel />
      <div className={styles.rightPanel}>
        <div className={styles.controlsGroup}>
          <CanvasControls
            progress={progress}
            setProgress={setProgress}
            scale={scale}
            setScale={setScale}
          />
          <PianoControls
            showNoteNames={showNoteNames}
            setShowNoteNames={setShowNoteNames}
            noteCount={noteCount}
            setNoteCount={setNoteCount}
            startNote={startNote}
            setStartNote={setStartNote}
          />
          <KeyboardLayoutControls
            isRectangle={isRectangle}
            setIsRectangle={setIsRectangle}
          />
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