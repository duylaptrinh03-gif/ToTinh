"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "../Shared/TypewriterText";

export const LoveMessages = ({ messages }: { messages: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setIsTyping(true);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start if wanted, or stay at the end. We'll loop.
      setIsTyping(true);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="py-24 px-4 bg-white min-h-[40vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="min-h-[150px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-700 italic leading-relaxed"
            >
              {isTyping ? (
                <TypewriterText 
                  text={messages[currentIndex]} 
                  speed={70} 
                  onComplete={() => setIsTyping(false)} 
                />
              ) : (
                <span>{messages[currentIndex]}</span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isTyping && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="mt-12 px-6 py-2 rounded-full border border-pink-300 text-pink-500 hover:bg-pink-50 transition-colors"
          >
            Đọc tiếp nhé ✨
          </motion.button>
        )}
      </div>
    </div>
  );
};
