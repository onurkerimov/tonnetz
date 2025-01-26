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
        </div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.controls}>
          <div className={styles.hexMorphSection}>
            <HexMorph />
          </div>
          <div className={styles.pianoSection}>
            <PianoKeys />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicInterface; 