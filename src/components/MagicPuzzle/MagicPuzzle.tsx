"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagicPuzzleProps {
  data: {
    image: string;
    title: string;
    description: string;
    buttonText: string;
  };
}

export const MagicPuzzle = ({ data }: MagicPuzzleProps) => {
  const [isAssembled, setIsAssembled] = useState(false);
  const [pieces, setPieces] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);

  const rows = 6;
  const cols = 6;
  const totalPieces = rows * cols;

  useEffect(() => {
    // Generate random scatter positions
    const newPieces = Array.from({ length: totalPieces }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600, // Random X from -300 to 300
      y: (Math.random() - 0.5) * 600, // Random Y from -300 to 300
      rotate: (Math.random() - 0.5) * 240, // Random rotation
    }));
    setPieces(newPieces);
  }, [totalPieces]);

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-dancing-script text-center text-pink-600 mb-4"
      >
        {data.title}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 text-center mb-16 text-lg"
      >
        {data.description}
      </motion.p>

      {/* Puzzle Container */}
      <div className="relative w-full max-w-[320px] md:max-w-[450px] mb-20">
        {/* Hidden image to force the container to exactly match the image's natural aspect ratio */}
        <img src={data.image} alt="puzzle bounds" className="w-full h-auto opacity-0 pointer-events-none" />
        
        <div className="absolute inset-0">
          {pieces.map((piece, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            
            return (
              <motion.div
                key={piece.id}
                initial={false}
                animate={{
                  x: isAssembled ? 0 : [piece.x, piece.x + (index % 2 === 0 ? 15 : -15), piece.x],
                  y: isAssembled ? 0 : [piece.y, piece.y - (index % 2 === 0 ? 20 : 25), piece.y],
                  rotate: isAssembled ? 0 : [piece.rotate, piece.rotate + (index % 2 === 0 ? 8 : -8), piece.rotate],
                  scale: isAssembled ? 1.01 : 0.6, // smaller when scattered
                  opacity: isAssembled ? 1 : 0.8,
                }}
                transition={
                  isAssembled 
                  ? { 
                      type: "spring", 
                      stiffness: 50, 
                      damping: 12,
                      mass: 1,
                      delay: index * 0.02 // Faster stagger because we have more pieces
                    }
                  : {
                      duration: 3 + (index % 3) * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                }
                className="absolute"
                style={{
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  left: `${(col * 100) / cols}%`,
                  top: `${(row * 100) / rows}%`,
                  backgroundImage: `url(${data.image})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
                  boxShadow: isAssembled ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: isAssembled ? 'none' : '2px solid white',
                  borderRadius: isAssembled ? '0px' : '10px',
                  zIndex: isAssembled ? 10 : 20
                }}
              />
            );
          })}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAssembled(!isAssembled)}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full shadow-lg text-2xl transition-colors duration-300 z-30 relative"
      >
        {isAssembled ? "Làm vụn 💔" : data.buttonText}
      </motion.button>
    </div>
  );
};
