"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

export const Gallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-dancing-script text-center text-pink-600 mb-12"
      >
        Phút Giây Đáng Nhớ
      </motion.h2>

      <div className="glass-panel p-6 md:p-10 rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => {
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
          // Randomize heights slightly for a more dynamic look
          const heights = ["aspect-square", "aspect-[3/4]", "aspect-[4/5]"];
          const aspectRatio = heights[index % heights.length];
          
          return (
          <div key={index} className="perspective-[1000px]">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, zIndex: 10, y: -10 }}
              className={`relative ${aspectRatio} cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-white/40 group`}
              onClick={() => setSelectedImage(src)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
              {isVideo ? (
                <video
                  src={src}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  playsInline
                  loop
                />
              ) : (
                <Image
                  src={src}
                  alt={`Gallery media ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              )}
            </motion.div>
          </div>
        )})}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white text-4xl hover:text-pink-400 hover:rotate-90 transition-all duration-300 z-50 drop-shadow-md"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden glass-panel border-2 border-white/20 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {selectedImage.endsWith(".mp4") || selectedImage.endsWith(".webm") || selectedImage.endsWith(".mov") ? (
                <video
                  src={selectedImage}
                  className="w-full h-full object-contain outline-none"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={selectedImage}
                  alt="Selected full size"
                  fill
                  style={{ objectFit: "contain" }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
