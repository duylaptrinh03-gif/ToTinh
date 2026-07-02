"use client";

import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useAudio(url: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { getCustomKey, setCustomKey } = useLocalStorage();

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.loop = true;

    const savedState = getCustomKey("audio_playing");
    if (savedState === "true") {
      setIsPlaying(true);
      // Browsers often block autoplay without interaction, but we'll try
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setCustomKey("audio_playing", "false");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [url, getCustomKey, setCustomKey]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCustomKey("audio_playing", "false");
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setCustomKey("audio_playing", "true");
      }).catch(err => console.error("Error playing audio:", err));
    }
  };

  return { isPlaying, toggleAudio };
}
