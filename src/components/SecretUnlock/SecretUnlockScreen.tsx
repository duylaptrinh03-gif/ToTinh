import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryVerificationCard } from './MemoryVerificationCard';
import { UnlockAnimation } from './UnlockAnimation';
import { useUnlock } from '@/hooks/useUnlock';
import { defaultData } from '@/data/defaultData';
import { FloatingHearts } from '@/components/Shared/FloatingHearts';

interface SecretUnlockScreenProps {
  onUnlockComplete: () => void;
}

export const SecretUnlockScreen = ({ onUnlockComplete }: SecretUnlockScreenProps) => {
  const { 
    isPreviouslyUnlocked, 
    verify, 
    unlockWithoutVerify 
  } = useUnlock({
    correctDate: defaultData.unlockConfig.firstChatDate,
    onSuccess: () => setPhase('success')
  });

  const [phase, setPhase] = useState<'intro' | 'verify' | 'success'>(isPreviouslyUnlocked ? 'verify' : 'intro');
  const [introText, setIntroText] = useState('');

  // Typewriter effect for intro
  useEffect(() => {
    if (phase !== 'intro') return;

    if (isPreviouslyUnlocked) {
      // If already unlocked before, skip typewriter or show welcome back
      setPhase('verify');
      return;
    }

    const fullText = "Nhưng chỉ người đặc biệt mới có thể mở được.";
    let currentIndex = 0;
    
    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setIntroText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          // Wait 2 seconds before showing the card
          setTimeout(() => setPhase('verify'), 2000);
        }
      }, 50); // typing speed
      
      return () => clearInterval(typeInterval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, [phase, isPreviouslyUnlocked]);

  const handleUnlockAnimationComplete = () => {
    // Call the parent's function to transition to the main app smoothly
    onUnlockComplete();
  };

  return (
    <div className="relative min-h-screen bg-pink-50 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <FloatingHearts />
      
      {/* Sparkles / Particles - simulated with CSS or simple divs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'intro' && !isPreviouslyUnlocked && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="text-center z-10 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
              className="text-4xl mb-6"
            >
              ❤️
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-dancing-script text-pink-600 mb-4 tracking-wide drop-shadow-sm">
              Có một món quà dành riêng cho em...
            </h1>
            <p className="text-lg md:text-xl text-gray-500 h-8 font-light italic">
              {introText}
              <span className="animate-pulse inline-block w-1 h-5 bg-pink-400 ml-1 translate-y-1"></span>
            </p>
          </motion.div>
        )}

        {phase === 'verify' && (
          <motion.div 
            key="verify"
            className="w-full px-4 z-10 flex flex-col items-center"
          >
            {isPreviouslyUnlocked ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10 w-full max-w-lg mx-auto bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-10"
              >
                <div className="text-5xl mb-4">❤️</div>
                <h2 className="text-3xl font-dancing-script text-pink-600 mb-2">Chào mừng em quay trở lại</h2>
                <p className="text-gray-600 mb-8 font-medium">Anh đã chờ em đó!</p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={unlockWithoutVerify}
                    className="w-full py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition-colors shadow-md"
                  >
                    Mở lại món quà 🎁
                  </button>
                  <button 
                    onClick={() => {
                      // Clear the lock state to verify again
                      localStorage.removeItem('unlockSuccess');
                      window.location.reload();
                    }}
                    className="w-full py-3 px-6 bg-white/50 hover:bg-white/80 text-pink-600 rounded-xl font-medium transition-colors border border-pink-200"
                  >
                    Xác minh lại kỷ niệm
                  </button>
                </div>
              </motion.div>
            ) : (
              <MemoryVerificationCard onUnlock={verify} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'success' && (
          <UnlockAnimation 
            onAnimationComplete={handleUnlockAnimationComplete} 
            duration={defaultData.unlockConfig.unlockAnimationDuration} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};
