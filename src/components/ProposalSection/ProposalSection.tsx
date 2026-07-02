"use client";

import { motion } from "framer-motion";
import { MovingRejectButton } from "./MovingRejectButton";
import { useState } from "react";

interface ProposalSectionProps {
  title: string;
  acceptText: string;
  rejectText: string;
  onAccept: () => void;
}

export const ProposalSection = ({ title, acceptText, rejectText, onAccept }: ProposalSectionProps) => {
  const [yesScale, setYesScale] = useState(1);

  const handleRejectHover = () => {
    setYesScale((prev) => Math.min(prev + 0.3, 2.5)); // Grows up to 2.5x max
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Sparkles and Hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 animate-bounce text-5xl">💖</div>
        <div className="absolute top-1/3 right-20 animate-pulse text-6xl" style={{ animationDelay: "0.5s" }}>💘</div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce text-4xl" style={{ animationDelay: "1s" }}>💕</div>
        <div className="absolute bottom-1/3 right-1/4 animate-pulse text-5xl" style={{ animationDelay: "1.5s" }}>💓</div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        viewport={{ once: true }}
        className="z-10 text-center w-full max-w-3xl glass-panel p-10 md:p-16 rounded-3xl relative"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/40 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-dancing-script text-pink-600 font-bold mb-10 drop-shadow-md leading-tight">
            {title}
          </h1>

        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl mb-12"
        >
          ❤️
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 w-full min-h-[160px] z-20 relative mt-8">
          {/* Accept Button */}
          <div className="relative group">
            {/* Animated Glow Behind Button */}
            <motion.div
              animate={{ 
                scale: [yesScale, yesScale + 0.1, yesScale],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"
            ></motion.div>
            
            <motion.button
              animate={{ scale: [yesScale, yesScale + 0.02, yesScale] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              whileHover={{ scale: yesScale + 0.1 }}
              whileTap={{ scale: yesScale - 0.05 }}
              onClick={onAccept}
              className="relative bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white font-bold py-4 px-12 rounded-full shadow-[0_0_40px_rgba(255,105,180,0.6)] text-2xl transition-all duration-300 z-30 whitespace-nowrap border-2 border-white/50"
            >
              {acceptText}
            </motion.button>
          </div>

          {/* Reject Button Container */}
          <div className="z-20">
             <MovingRejectButton text={rejectText} onHover={handleRejectHover} />
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
};
