"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHearts = () => {
      const newHearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // random left percentage
        size: Math.random() * 20 + 10, // 10px to 30px
        duration: Math.random() * 5 + 5, // 5s to 10s
        delay: Math.random() * 5,
      }));
      setHearts(newHearts);
    };

    createHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, x: `${heart.x}vw` }}
          animate={{ y: "-10vh", opacity: [0, 0.5, 0.8, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
        >
          <FaHeart color="#ff758f" size={heart.size} style={{ filter: "drop-shadow(0 0 5px rgba(255, 117, 143, 0.5))" }} />
        </motion.div>
      ))}
    </div>
  );
};
