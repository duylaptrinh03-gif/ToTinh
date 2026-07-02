import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface UseUnlockProps {
  correctDate: string;
  onSuccess: () => void;
}

export const useUnlock = ({ correctDate, onSuccess }: UseUnlockProps) => {
  const { getSessionKey, setSessionKey } = useLocalStorage();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPreviouslyUnlocked, setIsPreviouslyUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem('unlockSuccess') === 'true';
    }
    return false;
  });

  // Check initial state on mount (fallback for hydration)
  useEffect(() => {
    const unlocked = getSessionKey('unlockSuccess');
    if (unlocked === 'true' && !isPreviouslyUnlocked) {
      setIsPreviouslyUnlocked(true);
    }
  }, [getSessionKey, isPreviouslyUnlocked]);

  const playSound = useCallback((type: 'click' | 'unlock') => {
    try {
      // Create a small Audio context or use Audio element
      // Using generic beep sounds as fallback if no actual file is present
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'click') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'unlock') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        oscillator.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
      }
    } catch (e) {
      console.log('Audio playback failed', e);
    }
  }, []);

  const verify = useCallback((inputDate: string) => {
    if (inputDate === correctDate) {
      setIsUnlocked(true);
      setSessionKey('unlockSuccess', 'true');
      playSound('unlock');
      onSuccess();
      return true;
    } else {
      playSound('click');
      return false;
    }
  }, [correctDate, onSuccess, setSessionKey, playSound]);

  const unlockWithoutVerify = useCallback(() => {
    setIsUnlocked(true);
    playSound('unlock');
    onSuccess();
  }, [onSuccess, playSound]);

  return {
    isUnlocked,
    isPreviouslyUnlocked,
    verify,
    unlockWithoutVerify,
    playSound
  };
};
