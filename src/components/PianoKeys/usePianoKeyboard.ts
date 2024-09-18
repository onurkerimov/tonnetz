import { useState, useCallback } from 'react';

interface UsePianoKeyboardProps {
  noteCount: number;
  startNote: number;
  setActiveKeyIndices: React.Dispatch<React.SetStateAction<number[]>>;
}

interface UsePianoKeyboardResult {
  isMouseDown: boolean;
  notes: string[];
  handleMouseDown: (index: number) => void;
  handleMouseEnter: (index: number) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
}

const usePianoKeyboard = ({ noteCount, startNote, setActiveKeyIndices }: UsePianoKeyboardProps): UsePianoKeyboardResult => {
  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const [isMouseDown, setIsMouseDown] = useState(false);

  const notes = [...Array(noteCount)].map((_, i) => allNotes[(i + startNote) % 12]);

  const handleMouseDown = useCallback((index: number) => {
    setIsMouseDown(true);
    setActiveKeyIndices([index]);
  }, [setActiveKeyIndices]);

  const handleMouseEnter = useCallback((index: number) => {
    if (isMouseDown) {
      setActiveKeyIndices([index]);
    }
  }, [isMouseDown, setActiveKeyIndices]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setActiveKeyIndices([]);
  }, [setActiveKeyIndices]);

  const handleMouseLeave = useCallback(() => {
    if (isMouseDown) {
      setActiveKeyIndices([]);
    }
  }, [isMouseDown, setActiveKeyIndices]);

  return {
    isMouseDown,
    notes,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseLeave,
  };
};

export default usePianoKeyboard;