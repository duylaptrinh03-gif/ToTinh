"use client";

import { useState } from "react";

export function useMovingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    if (typeof window === "undefined") return;
    
    // Move within a safe radius to keep it in the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // We assume the button size is around 150x50, keeping safe margins
    const safeMarginX = 100;
    const safeMarginY = 50;

    const maxMoveX = viewportWidth / 3;
    const maxMoveY = viewportHeight / 3;

    // Random X and Y between -maxMove and +maxMove
    const randomX = Math.floor(Math.random() * (maxMoveX * 2)) - maxMoveX;
    const randomY = Math.floor(Math.random() * (maxMoveY * 2)) - maxMoveY;

    // Calculate new position
    let newX = position.x + randomX;
    let newY = position.y + randomY;

    // Boundary check, if it goes too far, reset it closer
    if (Math.abs(newX) > maxMoveX) newX = newX > 0 ? maxMoveX / 2 : -maxMoveX / 2;
    if (Math.abs(newY) > maxMoveY) newY = newY > 0 ? maxMoveY / 2 : -maxMoveY / 2;

    setPosition({ x: newX, y: newY });
  };

  return { position, moveButton };
}
