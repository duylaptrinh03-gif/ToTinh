"use client";

import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";
import { FaMusic, FaPause } from "react-icons/fa";

export const MusicPlayer = () => {
  const { isPlaying, toggleAudio } = useAudio("/music/background.mp3");

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 ${
        isPlaying ? "bg-pink-500 text-white" : "bg-white text-pink-500 border border-pink-200"
      }`}
    >
      {isPlaying ? (
        <FaPause className="text-xl" />
      ) : (
        <FaMusic className="text-xl" />
      )}
      
      {/* Sound waves animation when playing */}
      {isPlaying && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-20 animate-ping"></span>
        </>
      )}
    </motion.button>
  );
};
