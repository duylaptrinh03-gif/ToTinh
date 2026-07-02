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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Sparkles and Hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 animate-bounce text-5xl">💖</div>
        <div className="absolute top-1/3 right-20 animate-pulse text-6xl" style={{ animationDelay: "0.5s" }}>💘</div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce text-4xl" style={{ animationDelay: "1s" }}>💕</div>
        <div className="absolute bottom-1/3 right-1/4 animate-pulse text-5xl" style={{ animationDelay: "1.5s" }}>💓</div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        viewport={{ once: true }}
        className="z-10 text-center w-full max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-dancing-script text-red-500 font-bold mb-10 drop-shadow-sm leading-tight">
          {title}
        </h1>

        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl mb-12"
        >
          ❤️
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 w-full min-h-[160px] z-20 relative">
          {/* Accept Button */}
          <motion.button
            animate={{ scale: [yesScale, yesScale + 0.05, yesScale] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            whileHover={{ scale: yesScale + 0.15 }}
            whileTap={{ scale: yesScale - 0.1 }}
            onClick={onAccept}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-xl text-2xl transition-colors duration-300 z-30 whitespace-nowrap"
          >
            {acceptText}
          </motion.button>

          {/* Reject Button Container */}
          <div className="z-20">
             <MovingRejectButton text={rejectText} onHover={handleRejectHover} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
