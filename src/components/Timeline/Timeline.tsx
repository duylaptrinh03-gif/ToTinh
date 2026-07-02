"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export const Timeline = ({ memories }: { memories: Memory[] }) => {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-dancing-script text-center text-pink-600 mb-16"
      >
        Kỷ Niệm Của Chúng Mình
      </motion.h2>

      <div className="space-y-12">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring" }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
              <div className="w-full md:w-1/2 flex justify-center perspective-[1000px]">
                <motion.div 
                  whileHover={{ rotateX: 5, rotateY: index % 2 === 0 ? -5 : 5, z: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-full md:w-11/12 rounded-2xl overflow-hidden shadow-xl border border-white/40 transform transition-all duration-300 bg-white/20 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none z-10 mix-blend-overlay"></div>
                  {memory.image.endsWith(".mp4") || memory.image.endsWith(".webm") || memory.image.endsWith(".mov") ? (
                    <video
                      src={memory.image}
                      className="w-full h-auto pointer-events-none object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/2 glass-card p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-pink-400/30 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-pink-500 bg-pink-100/50 backdrop-blur-md rounded-full shadow-sm border border-pink-200/50">
                    {memory.date}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400">
                    {memory.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg font-medium opacity-90">
                    {memory.description}
                  </p>
                </div>
              </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};
