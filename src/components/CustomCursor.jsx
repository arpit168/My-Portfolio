import React, { useEffect, useState, useRef } from "react";

/**
 * CustomCursor - 8D Dimensional Spatial Cursor
 * Features an orbital gyro ring, smooth trailing focal point, and dynamic interactive expansion.
 */
export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const angle = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0,
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let animId;

    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Check if hovering clickable element
      const target = e.target;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const render = () => {
      // Smooth lerp for outer ring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16;

      angle.current += 1.5;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Center 8D Quantum Core */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00ff80] shadow-[0_0_12px_#00f0ff] transition-all duration-150 ${
            isHovered ? "w-3 h-3 scale-150" : "w-2 h-2"
          }`}
        />
      </div>

      {/* 8D Orbital Gyro Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`relative rounded-full border border-[#00f0ff]/40 transition-all duration-300 ${
            isHovered
              ? "w-12 h-12 border-[#00ff80] shadow-[0_0_20px_rgba(0,255,128,0.4)] scale-110"
              : "w-8 h-8 shadow-[0_0_10px_rgba(0,240,255,0.25)]"
          }`}
        >
          {/* Orbiting Satellite Node */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff80] shadow-[0_0_6px_#00ff80]" />
        </div>
      </div>
    </>
  );
}
