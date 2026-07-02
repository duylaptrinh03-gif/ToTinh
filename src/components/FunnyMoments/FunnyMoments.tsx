"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FunnyMoment {
  id: string;
  image: string;
  caption: string;
}

export const FunnyMoments = ({ moments }: { moments: FunnyMoment[] }) => {
  return (
    <div className="py-20 px-4 max-w-5xl mx-auto glass-panel rounded-[3rem] my-20">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-dancing-script text-center text-pink-600 mb-12 drop-shadow-sm"
      >
        Những Khoảnh Khắc Đáng Yêu Của Chúng Mình 🤣
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            whileHover={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: 1.05,
              transition: { duration: 0.5 }
            }}
            className="glass-card p-4 rounded-2xl shadow-lg border-2 border-white/60"
          >
            <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4">
              {moment.image.endsWith(".mp4") || moment.image.endsWith(".webm") || moment.image.endsWith(".mov") ? (
                <video
                  src={moment.image}
                  className="w-full h-full object-cover pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <Image
                  src={moment.image}
                  alt={moment.caption}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <p className="text-center font-medium text-gray-700 italic">"{moment.caption}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
