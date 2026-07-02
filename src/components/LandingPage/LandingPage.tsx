"use client";

import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";

interface LandingPageProps {
  onOpen: () => void;
}

export const LandingPage = ({ onOpen }: LandingPageProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-50 z-10 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center z-10"
      >
        <h1 className="text-3xl md:text-5xl font-dancing-script text-pink-600 mb-8 px-4 leading-relaxed">
          Có một người muốn gửi bạn một món quà...
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpen}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/70 backdrop-blur-md border border-pink-200 rounded-full text-pink-600 font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
        >
          <FaGift className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <span>Mở món quà</span>
        </motion.button>
      </motion.div>

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );
};
