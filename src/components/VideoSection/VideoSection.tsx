"use client";

import { motion } from "framer-motion";
import { DefaultData } from "@/data/defaultData";

interface VideoSectionProps {
  videos: DefaultData["videos"];
}

export const VideoSection = ({ videos }: VideoSectionProps) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-dancing-script text-pink-500 mb-4 drop-shadow-sm">
          Thước phim kỉ niệm 🎬
        </h2>
        <p className="text-gray-600 font-serif text-lg">
          Những giây phút không thể nào quên...
        </p>
      </motion.div>

      <div className="space-y-16">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative group"
          >
            {/* Sparkling background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Video Container */}
            <div className="relative bg-white p-4 rounded-3xl shadow-xl">
              <div className="overflow-hidden rounded-2xl relative aspect-video bg-black flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                  preload="metadata"
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Text underneath */}
              <div className="mt-6 text-center pb-2">
                <h3 className="text-2xl font-dancing-script text-pink-600 mb-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-gray-600 font-serif">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
