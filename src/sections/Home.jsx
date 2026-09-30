import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avator.webp";
import {
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaArrowRight,
  FaDownload,
  FaReact,
  FaCode,
  FaLayerGroup,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import ParticleBackground from "../components/ParticlesBackground";
import SpatialCard from "../components/SpatialCard";

const socials = [
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/arpit168",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.4)",
  },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arpit-gupta-4a3343331/",
    color: "#0A66C2",
    glow: "rgba(10, 102, 194, 0.5)",
  },
  {
    Icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@ArpitGupta-qo2fg",
    color: "#FF0000",
    glow: "rgba(255, 0, 0, 0.5)",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/anokha_arpit/?hl=en",
    color: "#E1306C",
    glow: "rgba(225, 48, 108, 0.5)",
  },
];

const highlights = [
  { label: "Developing Stack", value: "React & .NET" },
  { label: "Design System", value: "Figma to Code" },
];

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => [
      "Full Stack Web Developer",
      "React & Next.js Specialist",
      "ASP.NET Core & FastAPI Developer",
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const current = roles[index];
    const isFullWord = !deleting && subIndex === current.length;
    const delay = isFullWord ? 1400 : deleting ? 35 : 55;

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (isFullWord) {
        setDeleting(true);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen pt-24 sm:pt-28 pb-16 w-full relative flex items-center justify-center overflow-hidden bg-[#03060c] text-white"
    >
      {/* 3D Particle Space Backdrop */}
      <ParticleBackground />

      {/* 8D Holographic Atmospheric Lights */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Deep cyan bloom */}
        <div className="absolute -top-20 -left-20 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-radial from-[#1CD8D2]/25 via-[#00bf8f]/10 to-transparent blur-[140px] animate-pulse" />

        {/* Deep cosmic purple bloom */}
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-radial from-[#302b63]/35 via-[#1cd8d2]/10 to-transparent blur-[150px] animate-pulse delay-700" />

        {/* Subtle perspective grid plane */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#1cd8d2 1px, transparent 1px), linear-gradient(90deg, #1cd8d2 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Bio & Hero Content (7 Cols) */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left relative lg:pr-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mx-auto lg:mx-0 w-fit backdrop-blur-xl bg-white/5 border border-[#1CD8D2]/35 shadow-[0_0_25px_rgba(28,216,210,0.2)] mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff80] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff80]" />
            </span>
            <span className="text-[#1CD8D2] font-semibold">
              Available for Hire
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">Full Stack Developer</span>
          </motion.div>

          {/* Typing Role Header */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-mono text-[#00f0ff] font-medium tracking-wider mb-2 min-h-[1.8em] flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <span className="text-white/40 mr-2 font-sans text-sm tracking-normal">
              I build as a
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#00ff80] to-[#1CD8D2] font-semibold drop-shadow-sm">
              {roles[index].substring(0, subIndex)}
            </span>
            <span className="inline-block w-[3px] h-[1.1em] ml-1.5 bg-[#00f0ff] animate-pulse align-middle rounded-full" />
          </motion.div>

          {/* Main Name Heading with 3D Depth */}
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl font-black tracking-tight text-white leading-[1.08] drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400 font-extrabold block text-2xl sm:text-3xl md:text-4xl mb-1 text-white/70">
              Hello, I'm
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2f9f8] to-[#1CD8D2] block">
              Arpit Gupta
            </span>
          </motion.h1>

          {/* Tagline / Subtitle */}
          <motion.p
            className="mt-5 text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Architecting next-generation digital products with{" "}
            <span className="text-white font-medium">
              React, Next.js, ASP.NET Core
            </span>
            , and{" "}
            <span className="text-[#1CD8D2] font-medium">Attractive UI/UX</span>{" "}
            — blending Developed performance with visual elegance.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            {/* Primary 8D Glowing CTA */}
            <a
              href="#projects"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide text-black bg-gradient-to-r from-[#1CD8D2] via-[#00ff80] to-[#00f0ff] shadow-[0_0_35px_rgba(28,216,210,0.55)] hover:shadow-[0_0_50px_rgba(0,255,128,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Explore My Work</span>
              <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary Glassmorphic CTA */}
            <a
              href="/Arpit_Gupta_Resume_1.pdf"
              download
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm sm:text-base tracking-wide text-white/95 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 hover:border-white/30 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FaDownload className="w-3.5 h-3.5 text-[#1CD8D2] transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Download CV</span>
            </a>
          </motion.div>

          {/* Quick Highlight Metrics */}
          <motion.div
            className="mt-9 pt-7 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            className="mt-7 flex items-center justify-center lg:justify-start gap-3.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            {socials.map(({ Icon, label, href, color, glow }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:scale-115 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = `0 0 20px ${glow}`;
                  e.currentTarget.style.color = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.4)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 8D Cyber Mascot Avatar & Spatial Orbit (5 Cols) */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
        >
          {/* Holographic 8D Orbit Ring 1 (Horizontal Gyro) */}
          <div
            className="pointer-events-none absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-[#1CD8D2]/30 opacity-40 animate-orbit-1"
            style={{
              boxShadow: "0 0 30px rgba(28, 216, 210, 0.15)",
            }}
          />

          {/* Holographic 8D Orbit Ring 2 (Tilted Ring) */}
          <div
            className="pointer-events-none absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full border border-[#00ff80]/25 opacity-30 animate-orbit-2"
            style={{
              boxShadow: "0 0 25px rgba(0, 255, 128, 0.12)",
            }}
          />

          {/* Ambient Cyber Light Disc under Avatar */}
          <div
            className="pointer-events-none absolute bottom-2 w-64 sm:w-80 h-16 rounded-full blur-[28px] opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at center, #00f0ff 0%, #00ff80 40%, transparent 75%)",
            }}
          />

          {/* Interactive 3D Spatial Avatar Container */}
          <SpatialCard
            maxTilt={12}
            scale={1.02}
            glareColor="rgba(0, 240, 255, 0.35)"
            className="relative w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center p-2"
          >
            <img
              src={avatar}
              alt="Arpit Gupta 3D Avatar"
              className="relative object-contain select-none pointer-events-none z-10 w-full max-h-[52vh] sm:max-h-[62vh] drop-shadow-[0_20px_45px_rgba(0,240,255,0.25)] animate-float-slow"
              draggable={false}
              width={400}
              height={600}
              fetchPriority="high"
              decoding="async"
            />

            {/* Floating 8D Spatial Badge 1: Frontend Tech */}
            <div className="absolute top-2 sm:top-4 left-0 sm:left-2 lg:-left-1 z-20 bg-[#060c14]/95 border border-[#61DAFB]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-[0_8px_25px_rgba(97,218,251,0.2)] flex items-center gap-2.5 cursor-default select-none animate-float-gentle">
              <div className="w-8 h-8 rounded-xl bg-[#61DAFB]/15 border border-[#61DAFB]/30 flex items-center justify-center text-lg text-[#61DAFB]">
                <FaReact />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  React & Next.js
                </span>
                <span className="text-[9px] text-[#61DAFB] font-mono">
                  Modern Frontend
                </span>
              </div>
            </div>

            {/* Floating 8D Spatial Badge 2: Backend Architecture */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 lg:-right-3 z-20 bg-[#060c14]/95 border border-[#8b5cf6]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-[0_8px_25px_rgba(139,92,246,0.2)] flex items-center gap-2.5 cursor-default select-none animate-float-reverse">
              <div className="w-8 h-8 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-base text-[#a78bfa]">
                <FaCode />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  ASP.NET & Node
                </span>
                <span className="text-[9px] text-[#a78bfa] font-mono">
                  Scalable APIs
                </span>
              </div>
            </div>

            {/* Floating 8D Spatial Badge 3: Experience & Precision */}
            <div className="absolute bottom-2 sm:bottom-4 left-1 sm:left-3 z-20 bg-[#060c14]/95 border border-[#00ff80]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-[0_8px_25px_rgba(0,255,128,0.2)] flex items-center gap-2.5 cursor-default select-none animate-float-slow">
              <div className="w-8 h-8 rounded-xl bg-[#00ff80]/15 border border-[#00ff80]/30 flex items-center justify-center text-sm text-[#00ff80]">
                <HiSparkles />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  Attractive UX
                </span>
                <span className="text-[9px] text-[#00ff80] font-mono">
                  Immersive Depth
                </span>
              </div>
            </div>
          </SpatialCard>
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
