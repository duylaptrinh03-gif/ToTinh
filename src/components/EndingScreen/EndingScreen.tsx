"use client";

import { motion } from "framer-motion";
import { useConfetti } from "@/hooks/useConfetti";
import { useEffect } from "react";
import { FloatingHearts } from "../Shared/FloatingHearts";

interface EndingScreenProps {
  onHug: () => void;
}

export const EndingScreen = ({ onHug }: EndingScreenProps) => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <div className="h-screen w-full bg-gradient-to-tr from-red-100 to-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.6 }}
        className="z-10 text-center flex flex-col items-center bg-white/40 p-12 rounded-3xl backdrop-blur-sm border border-white/50 shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-8xl text-red-500 mb-8 filter drop-shadow-lg"
        >
          ❤️
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-dancing-script text-gray-800 mb-4">
          Cảm ơn em đã đồng ý.
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 italic mb-10">
          "Anh hứa sẽ luôn làm em cười."
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            triggerConfetti();
            onHug();
          }}
          className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-4 px-10 rounded-full shadow-lg text-xl hover:shadow-pink-300/50 hover:shadow-xl transition-all"
        >
          Ôm một cái 🤗
        </motion.button>
      </motion.div>
    </div>
  );
};
