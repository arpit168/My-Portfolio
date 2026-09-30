import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SpatialCard from "../components/SpatialCard";

// Experience items data
const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2022",
    description:
      "Collaborated with a dynamic development team to create high-performance web applications, integrate AI-powered features, and enhance user engagement through modern, scalable solutions.",
    highlight: "AI & Full Stack",
  },
  {
    role: "Web Development Learner",
    company: "Self Learning",
    duration: "2025 - Present",
    description:
      "Passionately exploring modern web technologies like HTML, CSS, JavaScript, React, and Node.js while building real-world projects that strengthen both frontend creativity and backend problem-solving skills.",
    highlight: "React & Node Ecosystem",
  },
  {
    role: "Aspiring Web Developer",
    company: "Open to Internship",
    duration: "2024 - Present",
    description:
      "Actively building projects using React, Node.js, and JavaScript while improving problem-solving skills and preparing for web development internships.",
    highlight: "Ready for High-Impact Roles",
  },
];

// Subcomponent for each Desktop Card with legal top-level hook calls
function DesktopExperienceCard({ exp, idx, progress }) {
  const cardThreshold = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.82;
  const stemScaleY = useTransform(
    progress,
    [cardThreshold - 0.1, cardThreshold],
    [0, 1],
  );
  const stemOpacity = useTransform(
    progress,
    [cardThreshold - 0.1, cardThreshold],
    [0.2, 1],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="flex flex-col h-full"
    >
      <SpatialCard
        maxTilt={12}
        scale={1.02}
        className="flex-1 flex flex-col justify-between bg-gray-900/70 hover:bg-gray-900/90 backdrop-blur-xl border border-gray-800 hover:border-[#1CD8D2]/50 rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-[0_12px_35px_-10px_rgba(28,216,210,0.25)] transition-all duration-300"
      >
        <div>
          {/* Badge / Year */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1CD8D2]/15 text-[#1CD8D2] border border-[#1CD8D2]/30">
              {exp.duration}
            </span>
            <span className="text-xs text-gray-400 tracking-wide font-medium">
              0{idx + 1}
            </span>
          </div>

          {/* Role & Company */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#1CD8D2] transition-colors">
            {exp.role}
          </h3>
          <p className="text-sm font-semibold text-[#1CD8D2] mb-3">
            {exp.company}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* Footer highlight */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1CD8D2]" />
          <span className="text-xs font-medium text-gray-400">
            {exp.highlight}
          </span>
        </div>
      </SpatialCard>

      {/* Vertical connector stem to timeline dot */}
      <div className="flex justify-center items-center h-8">
        <motion.div
          style={{
            scaleY: stemScaleY,
            opacity: stemOpacity,
          }}
          className="w-0.5 h-full bg-gradient-to-b from-[#1CD8D2]/80 to-white origin-top"
        />
      </div>
    </motion.div>
  );
}

// Subcomponent for each Desktop Timeline Node with legal top-level hook calls
function DesktopTimelineNode({ idx, progress }) {
  const nodeThreshold = idx === 0 ? 0.1 : idx === 1 ? 0.45 : 0.8;
  const nodeScale = useTransform(
    progress,
    [nodeThreshold - 0.05, nodeThreshold + 0.05],
    [0.75, 1.15],
  );
  const nodeOpacity = useTransform(
    progress,
    [nodeThreshold - 0.08, nodeThreshold],
    [0.4, 1],
  );

  return (
    <motion.div
      style={{
        scale: nodeScale,
        opacity: nodeOpacity,
      }}
      className="relative flex items-center justify-center w-7 h-7 rounded-full bg-black border-2 border-white shadow-[0_0_15px_rgba(28,216,210,0.8)]"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-[#1CD8D2]" />
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  // Scroll progress for smoothly drawing the timeline line across viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamic progress transforms
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
      aria-label="Experience & Journey"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#1CD8D2]/10 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#00bf8f]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md border border-[#1CD8D2]/30 bg-[#1CD8D2]/10 text-[#1CD8D2]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1CD8D2] animate-pulse" />
            <span>Milestones & Growth</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            My Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-gray-400"
          >
            A chronological timeline of my hands-on developer journey, collaborative work, and continuous learning.
          </motion.p>
        </div>

        {/* --- DESKTOP LAYOUT (lg & above) --- */}
        <div className="hidden lg:block w-full">
          {/* Experience Cards Grid */}
          <div className="grid grid-cols-3 gap-6 xl:gap-8 items-stretch mb-6">
            {experiences.map((exp, idx) => (
              <DesktopExperienceCard
                key={`${exp.company}-${idx}`}
                exp={exp}
                idx={idx}
                progress={smoothProgress}
              />
            ))}
          </div>

          {/* Horizontal Timeline Bar with Glowing Nodes */}
          <div className="relative w-full max-w-6xl mx-auto px-6">
            {/* Background base track */}
            <div className="relative h-1.5 bg-white/15 rounded-full">
              {/* Dynamic glowing progress track */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-white rounded-full origin-left shadow-[0_0_12px_rgba(28,216,210,0.6)]"
                style={{ width: lineWidth }}
              />
            </div>

            {/* Glowing nodes aligned precisely under each column */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-around pointer-events-none">
              {experiences.map((exp, idx) => (
                <DesktopTimelineNode
                  key={`node-${exp.company}-${idx}`}
                  idx={idx}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE & TABLET LAYOUT (< lg) --- */}
        <div className="lg:hidden relative w-full max-w-xl mx-auto pl-6 sm:pl-8">
          {/* Vertical Timeline Track */}
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-6 w-0.5 bg-white/15 rounded-full">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-white rounded-full origin-top shadow-[0_0_10px_rgba(28,216,210,0.6)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Vertical Cards */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={`m-${exp.company}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative pl-6 sm:pl-8"
              >
                {/* Timeline node */}
                <div className="absolute -left-[18px] sm:-left-[19px] top-6 z-10 w-5 h-5 rounded-full bg-black border-2 border-[#1CD8D2] flex items-center justify-center shadow-[0_0_10px_rgba(28,216,210,0.7)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <SpatialCard
                  maxTilt={8}
                  scale={1.015}
                  className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 hover:border-[#1CD8D2]/40 rounded-2xl p-5 sm:p-6 shadow-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1CD8D2]/15 text-[#1CD8D2] border border-[#1CD8D2]/30">
                      {exp.duration}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#1CD8D2] mb-2.5">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <div className="pt-2.5 border-t border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1CD8D2]" />
                    <span className="text-xs text-gray-400 font-medium">
                      {exp.highlight}
                    </span>
                  </div>
                </SpatialCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
