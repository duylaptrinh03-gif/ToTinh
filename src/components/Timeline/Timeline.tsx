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
            className={`flex flex-col md:flex-row gap-6 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
                {memory.image.endsWith(".mp4") || memory.image.endsWith(".webm") || memory.image.endsWith(".mov") ? (
                  <video
                    src={memory.image}
                    className="w-full h-full object-cover pointer-events-none"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={memory.image}
                    alt={memory.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <span className="text-sm font-semibold text-pink-400 mb-2 block">{new Date(memory.date).toLocaleDateString("vi-VN")}</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{memory.title}</h3>
              <p className="text-gray-600 leading-relaxed">{memory.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
