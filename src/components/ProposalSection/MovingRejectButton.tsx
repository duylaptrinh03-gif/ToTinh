"use client";

import { useMovingButton } from "@/hooks/useMovingButton";
import { motion } from "framer-motion";

import { useState } from "react";

interface MovingRejectButtonProps {
  text: string;
  onHover?: () => void;
}

const funnyTexts = [
  "Nghĩ lại đi!",
  "Chê!",
  "Khum nha",
  "Bấm trượt rồi!",
  "Đố bắt được!",
  "Nút kia kìa!",
  "Chịu khó xíu nha",
  "Vẫn cố à?",
];

export const MovingRejectButton = ({ text, onHover }: MovingRejectButtonProps) => {
  const { position, moveButton } = useMovingButton();
  const [hoverCount, setHoverCount] = useState(0);

  const handleHover = () => {
    moveButton();
    setHoverCount((prev) => prev + 1);
    if (onHover) onHover();
  };

  const currentText = hoverCount === 0 ? text : funnyTexts[(hoverCount - 1) % funnyTexts.length];

  return (
    <motion.button
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: Math.max(0.5, 1 - hoverCount * 0.05) // Shrinks a bit each time
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={handleHover}
      onClick={handleHover} // For touch devices
      onTouchStart={handleHover}
      className="bg-gray-200 text-gray-600 font-bold py-4 px-8 rounded-full shadow-md text-xl cursor-not-allowed z-10 whitespace-nowrap"
    >
      {currentText}
    </motion.button>
  );
};
