import React, { useState, useEffect } from 'react';
import HexMorph from '../HexMorph/HexMorph';
import PianoKeys from '../PianoKeys/PianoKeys';
import ToneCanvas from '../ToneCanvas/ToneCanvas';
import CanvasControls from './components/CanvasControls';
import PianoControls from './components/PianoControls';
import KeyboardLayoutControls from './components/KeyboardLayoutControls';
import TitlePanel from './components/TitlePanel';
import styles from './MusicInterface.module.css';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MusicInterface = () => {
  const [progress, setProgress] = useState(0);
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [noteCount, setNoteCount] = useState(18);
  const [startNote, setStartNote] = useState(9);
  const [isRectangle, setIsRectangle] = useState(false);
  const [scale, setScale] = useState(2);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys(prev => prev.includes(key) ? prev : [...prev, key]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys(prev => prev.filter(k => k !== key));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <ToneCanvas 
          progress={progress} 
          onClick={() => setProgress(prev => prev === 0 ? 1 : 0)} 
        />
      </div>
      <TitlePanel />
      <button
        className={cn(styles.sidebarToggle, isSidebarCollapsed && styles.sidebarToggleCollapsed)}
        onClick={() => setIsSidebarCollapsed(prev => !prev)}
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
      <div className={cn(styles.rightPanel, isSidebarCollapsed && styles.rightPanelCollapsed)}>
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
      <div className={cn(styles.overlay, isSidebarCollapsed && styles.overlayExpanded)}>
        <div className={styles.controls}>
          <div className={styles.hexMorphSection}>
            <HexMorph isRectangle={isRectangle} activeKeys={activeKeys} />
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