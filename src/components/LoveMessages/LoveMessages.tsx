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
    <div className="py-24 px-4 min-h-[40vh] flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {/* Subtle glowing orbs in the background */}
         <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto text-center glass-panel p-10 md:p-16 rounded-3xl relative z-10 w-full shadow-2xl">
        <div className="absolute -top-6 -left-6 text-6xl opacity-30 animate-bounce">💌</div>
        <div className="min-h-[150px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-800 italic leading-relaxed font-medium drop-shadow-sm"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">Đọc tiếp nhé ✨</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
