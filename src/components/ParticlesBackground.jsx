import React, { useEffect, useRef } from "react";

/**
 * ParticlesBackground - 3D Spatial Particle Universe
 * Renders particles in 3D coordinate space (x, y, z) with perspective projection,
 * spatial constellations, and interactive depth response.
 */
export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let isVisible = true;
    let paused = false;
    let particles = [];

    // Camera & Mouse 3D rotation state
    const targetRot = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };
    const fov = 420; // Perspective depth

    const getParticleCount = () => {
      const byArea = Math.floor((width * height) / 28000);
      return reducedMotion
        ? Math.max(18, Math.min(byArea, 35))
        : Math.max(35, Math.min(byArea, 85));
    };

    const createParticle = () => {
      const spreadX = width * 1.2;
      const spreadY = height * 1.2;
      const spreadZ = 700;

      return {
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
        z: Math.random() * spreadZ - 200,
        baseRadius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.2 : 0.5),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.2 : 0.5),
        vz: (Math.random() - 0.5) * (reducedMotion ? 0.3 : 0.8),
        colorType: Math.random(),

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.z += this.vz;

          // Wrap boundaries in 3D space
          const halfW = spreadX / 2;
          const halfH = spreadY / 2;
          if (this.x < -halfW) this.x = halfW;
          if (this.x > halfW) this.x = -halfW;
          if (this.y < -halfH) this.y = halfH;
          if (this.y > halfH) this.y = -halfH;
          if (this.z < -250) this.z = spreadZ - 250;
          if (this.z > spreadZ - 250) this.z = -250;
        },

        project() {
          // Rotate around X and Y axes
          const cosY = Math.cos(curRot.y);
          const sinY = Math.sin(curRot.y);
          const cosX = Math.cos(curRot.x);
          const sinX = Math.sin(curRot.x);

          // Apply rotation
          const x1 = this.x * cosY - this.z * sinY;
          const z1 = this.z * cosY + this.x * sinY;

          const y2 = this.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + this.y * sinX;

          // 3D Perspective calculation
          const scale = fov / (fov + z2 + 300);
          if (scale <= 0) return null;

          const projX = width / 2 + x1 * scale;
          const projY = height / 2 + y2 * scale;
          const radius = Math.max(0.5, this.baseRadius * scale);
          const alpha = Math.min(1, Math.max(0.12, (z2 + 300) / 800));

          return {
            x: projX,
            y: projY,
            z: z2,
            scale,
            radius,
            alpha,
            colorType: this.colorType,
          };
        },
      };
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: getParticleCount() }, () =>
        createParticle(),
      );
    };

    const handlePointerMove = (e) => {
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = (e.clientY / height - 0.5) * 2;
      targetRot.y = normX * 0.18;
      targetRot.x = -normY * 0.18;
    };

    const render = () => {
      if (paused) return;

      // Smooth camera interpolation
      curRot.x += (targetRot.x - curRot.x) * 0.05;
      curRot.y += (targetRot.y - curRot.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Update and project all particles
      const projected = [];
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        const p = particles[i].project();
        if (p) projected.push(p);
      }

      // Sort by depth (Z-buffer order)
      projected.sort((a, b) => b.z - a.z);

      // Draw 3D spatial connections
      const maxConnectDist = reducedMotion ? 75 : 110;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha =
              (1 - dist / maxConnectDist) * a.alpha * b.alpha * 0.45;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            // Gradient spatial color
            ctx.strokeStyle = `rgba(28, 216, 210, ${lineAlpha})`;
            ctx.lineWidth = Math.min(a.scale, b.scale) * 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw projected glowing particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // 8D Neon cyber color palette
        const color =
          p.colorType > 0.6
            ? `rgba(28, 216, 210, ${p.alpha})`
            : p.colorType > 0.3
              ? `rgba(0, 255, 128, ${p.alpha})`
              : `rgba(168, 85, 247, ${p.alpha * 0.9})`;

        ctx.fillStyle = color;
        ctx.shadowBlur = Math.min(6, p.scale * 4);
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }

      if (isVisible) {
        animationId = requestAnimationFrame(render);
      }
    };

    // Pause heavy 3D particle calculations when user scrolls away from Home
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible !== isVisible) {
          isVisible = nowVisible;
          if (isVisible) {
            cancelAnimationFrame(animationId);
            animationId = requestAnimationFrame(render);
          } else {
            cancelAnimationFrame(animationId);
          }
        }
      },
      { threshold: [0, 0.05] },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    resizeCanvas();
    animationId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
