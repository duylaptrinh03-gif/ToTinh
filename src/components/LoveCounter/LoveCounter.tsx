"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion } from "framer-motion";

export const LoveCounter = ({ startDate }: { startDate: string }) => {
  const timeTogether = useCountdown(startDate);

  const timeBlocks = [
    { label: "Ngày", value: timeTogether.days },
    { label: "Giờ", value: timeTogether.hours },
    { label: "Phút", value: timeTogether.minutes },
    { label: "Giây", value: timeTogether.seconds },
  ];

  return (
    <div className="py-24 px-4 bg-gradient-to-r from-pink-100 via-red-50 to-pink-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-dancing-script text-pink-600 mb-12"
        >
          Chúng mình đã bên nhau được...
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="bg-white/80 backdrop-blur-md border border-pink-200 rounded-2xl w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="text-3xl md:text-5xl font-bold text-pink-500 mb-1">
                {block.value}
              </span>
              <span className="text-sm md:text-base font-medium text-gray-500">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
