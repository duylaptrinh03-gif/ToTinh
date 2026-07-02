"use client";

import { motion } from "framer-motion";
import { MovingRejectButton } from "./MovingRejectButton";

interface ProposalSectionProps {
  title: string;
  acceptText: string;
  rejectText: string;
  onAccept: () => void;
}

export const ProposalSection = ({ title, acceptText, rejectText, onAccept }: ProposalSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        viewport={{ once: true }}
        className="z-10 text-center w-full max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-dancing-script text-red-500 font-bold mb-20 drop-shadow-sm leading-tight">
          {title}
        </h1>

        <div className="relative flex justify-center items-center h-32 gap-4 w-full">
          {/* Accept Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-xl text-2xl transition-colors duration-300 z-20 absolute left-1/2 transform -translate-x-[110%]"
          >
            {acceptText}
          </motion.button>

          {/* Reject Button Container - needs space to move */}
          <div className="absolute left-1/2 transform translate-x-[10%]">
             <MovingRejectButton text={rejectText} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
