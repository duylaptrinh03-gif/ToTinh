"use client";

import { useMovingButton } from "@/hooks/useMovingButton";
import { motion } from "framer-motion";

interface MovingRejectButtonProps {
  text: string;
}

export const MovingRejectButton = ({ text }: MovingRejectButtonProps) => {
  const { position, moveButton } = useMovingButton();

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={moveButton}
      onClick={moveButton} // For touch devices
      onTouchStart={moveButton}
      className="absolute bg-gray-200 text-gray-600 font-bold py-4 px-8 rounded-full shadow-md text-xl cursor-not-allowed z-10"
      style={{
        // Give it a slightly varied position starting point in the grid later
      }}
    >
      {text}
    </motion.button>
  );
};
