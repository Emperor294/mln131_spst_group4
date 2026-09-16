"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";

const INITIAL_POSITION = { x: 50, y: 45 };

export default function MuseumViewport() {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState(INITIAL_POSITION);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const style = {
    "--museum-x": `${position.x}%`,
    "--museum-y": `${position.y}%`,
  } as CSSProperties;

  return (
    <div
      className="museum-viewport"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPosition(INITIAL_POSITION)}
      style={style}
      aria-hidden="true"
    >
      <div className="museum-viewport__ceiling" />
      <div className="museum-viewport__wall museum-viewport__wall--left" />
      <div className="museum-viewport__wall museum-viewport__wall--right" />
      <div className="museum-viewport__floor" />
      <div className="museum-viewport__artwork museum-viewport__artwork--one" />
      <div className="museum-viewport__artwork museum-viewport__artwork--two" />
      <div className="museum-viewport__door"><span>ENTER</span></div>
      <div className="museum-viewport__crosshair"><span /><span /></div>
      <div className="museum-viewport__spotlight" />
    </div>
  );
}
