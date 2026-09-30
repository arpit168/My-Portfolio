import React, { useRef } from "react";

/**
 * SpatialCard - Interactive 3D Perspective Tilt Card
 * Hardware-accelerated 3D depth, rotation, and dynamic light reflection
 * using direct DOM updates and requestAnimationFrame (zero React re-render overhead).
 */
export default function SpatialCard({
  children,
  className = "",
  glare = true,
  glareColor,
  maxTilt = 14,
  scale = 1.02,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.opacity = "0.35";
        glareRef.current.style.background = glareColor
          ? `radial-gradient(circle 260px at ${glareX}% ${glareY}%, ${glareColor}, transparent 70%)`
          : `radial-gradient(circle 250px at ${glareX}% ${glareY}%, rgba(28, 216, 210, 0.4), rgba(0, 191, 143, 0.15), transparent 70%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        ...style,
      }}
      {...props}
    >
      {children}

      {/* Holographic light reflection overlay */}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden transition-opacity duration-300"
          style={{
            borderRadius: "inherit",
            opacity: 0,
            mixBlendMode: "screen",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
