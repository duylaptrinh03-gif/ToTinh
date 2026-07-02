"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Global singleton to share the audio instance and bypass iOS strict autoplay restrictions
let globalAudio: HTMLAudioElement | null = null;

export function useAudio(url: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { getCustomKey, setCustomKey } = useLocalStorage();

  // Initialize once
  if (typeof window !== "undefined" && !globalAudio) {
    globalAudio = new Audio(url);
    globalAudio.loop = true;
  }

  useEffect(() => {
    if (!globalAudio) return;

    const savedState = getCustomKey("audio_playing");
    if (savedState === "true") {
      setIsPlaying(true);
      globalAudio.play().catch(() => {
        setIsPlaying(false);
        setCustomKey("audio_playing", "false");
      });
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    globalAudio.addEventListener('play', onPlay);
    globalAudio.addEventListener('pause', onPause);
    
    return () => {
      if (globalAudio) {
        globalAudio.removeEventListener('play', onPlay);
        globalAudio.removeEventListener('pause', onPause);
      }
    };
  }, [getCustomKey, setCustomKey]);

  const toggleAudio = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      globalAudio.pause();
      setCustomKey("audio_playing", "false");
    } else {
      globalAudio.play().then(() => {
        setCustomKey("audio_playing", "true");
      }).catch(err => console.error("Error playing audio:", err));
    }
  };
  
  const playDirectly = () => {
     if (globalAudio) {
       globalAudio.play().then(() => {
         setCustomKey("audio_playing", "true");
         setIsPlaying(true);
       }).catch(e => console.error("iOS AutoPlay block bypassed error:", e));
     }
  };

  return { isPlaying, toggleAudio, playDirectly };
}
