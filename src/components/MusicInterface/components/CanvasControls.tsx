import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HexagonIcon } from '../icons';
import styles from '../MusicInterface.module.css';

interface CanvasControlsProps {
  progress: number;
  setProgress: (value: number) => void;
  scale: number;
  setScale: (value: number) => void;
}

const CanvasControls: React.FC<CanvasControlsProps> = ({
  progress,
  setProgress,
  scale,
  setScale,
}) => {
  return (
    <div className={styles.controlsPanel}>
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
    </div>
  );
};

export default CanvasControls; 