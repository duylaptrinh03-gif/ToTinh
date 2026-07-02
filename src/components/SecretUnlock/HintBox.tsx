import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLightBulb } from 'react-icons/hi';

interface HintBoxProps {
  hint: string | null;
}

export const HintBox = ({ hint }: HintBoxProps) => {
  return (
    <div className="h-12 mt-4 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {hint && (
          <motion.div
            key={hint} // Re-animate if hint changes
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 bg-yellow-50/80 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
          >
            <HiOutlineLightBulb className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium">Hint: {hint}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
