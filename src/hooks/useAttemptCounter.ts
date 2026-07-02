import { useState, useCallback } from 'react';

interface HintConfig {
  attempts: number;
  text: string;
}

interface UseAttemptCounterProps {
  hints: HintConfig[];
  errorMessages: string[];
}

export const useAttemptCounter = ({ hints, errorMessages }: UseAttemptCounterProps) => {
  const [attempts, setAttempts] = useState(0);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [currentErrorMsg, setCurrentErrorMsg] = useState<string | null>(null);

  const incrementAttempt = useCallback(() => {
    setAttempts(prev => {
      const newAttempts = prev + 1;
      
      // Select a random error message
      if (errorMessages && errorMessages.length > 0) {
        const randomMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setCurrentErrorMsg(randomMsg);
      }

      // Check for new hints
      if (hints && hints.length > 0) {
        // Find the hint with the highest attempts requirement that is <= newAttempts
        const availableHints = hints.filter(h => h.attempts <= newAttempts);
        if (availableHints.length > 0) {
          // Get the latest unlocked hint
          const latestHint = availableHints.reduce((prev, current) => 
            (prev.attempts > current.attempts) ? prev : current
          );
          setCurrentHint(latestHint.text);
        }
      }

      return newAttempts;
    });
  }, [errorMessages, hints]);

  const resetAttempts = useCallback(() => {
    setAttempts(0);
    setCurrentHint(null);
    setCurrentErrorMsg(null);
  }, []);

  return {
    attempts,
    currentHint,
    currentErrorMsg,
    incrementAttempt,
    resetAttempts
  };
};
