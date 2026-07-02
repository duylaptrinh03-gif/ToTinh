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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => {
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
          return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="relative aspect-square cursor-pointer rounded-xl overflow-hidden shadow-md bg-pink-100/50"
            onClick={() => setSelectedImage(src)}
          >
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
              />
            )}
          </motion.div>
        )})}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-pink-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden bg-black"
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
