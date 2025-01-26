import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { HexagonIcon } from '../icons';
import styles from '../MusicInterface.module.css';

interface KeyboardLayoutControlsProps {
  isRectangle: boolean;
  setIsRectangle: (value: boolean) => void;
}

const KeyboardLayoutControls: React.FC<KeyboardLayoutControlsProps> = ({
  isRectangle,
  setIsRectangle,
}) => {
  return (
    <div className={styles.controlsPanel}>
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
  );
};

export default KeyboardLayoutControls; 