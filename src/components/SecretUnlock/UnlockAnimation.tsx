import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConfetti } from '@/hooks/useConfetti';
import { HiLockOpen } from 'react-icons/hi';

interface UnlockAnimationProps {
  onAnimationComplete: () => void;
  duration: number; // in milliseconds
}

export const UnlockAnimation = ({ onAnimationComplete, duration }: UnlockAnimationProps) => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    // Trigger confetti multiple times for a grand effect
    triggerConfetti();
    const timer1 = setTimeout(() => triggerConfetti(), 400);
    const timer2 = setTimeout(() => triggerConfetti(), 800);
    
    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(completeTimer);
    };
  }, [triggerConfetti, onAnimationComplete, duration]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-pink-50/90 backdrop-blur-md"
    >
      <div className="text-center relative">
        <motion.div
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          animate={{ 
            scale: 1,
            rotate: 0,
            opacity: 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1.5
          }}
          className="mx-auto w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 relative z-10"
        >
          <motion.div
            animate={{ 
              textShadow: ["0px 0px 0px rgba(236,72,153,0)", "0px 0px 20px rgba(236,72,153,0.8)", "0px 0px 0px rgba(236,72,153,0)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HiLockOpen className="w-16 h-16 text-pink-500" />
          </motion.div>
        </motion.div>

        {/* Pulsing glow behind the lock */}
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-pink-400 rounded-full blur-xl z-0"
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-4xl font-dancing-script text-pink-600 mb-4 drop-shadow-sm">Đúng rồi... ❤️</h2>
          <p className="text-lg text-gray-700 max-w-md mx-auto px-4 leading-relaxed">
            Cảm ơn em vì vẫn còn nhớ. Dưới đây là món quà anh đã chuẩn bị.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
