// Importing React for building UI components
import React from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform } from "framer-motion";
import SpatialCard from "../components/SpatialCard";

// Array of experience objects containing job details
const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2022",
    description:
      "Collaborated with a dynamic development team to create high-performance web applications, integrate AI-powered features, and enhance user engagement through modern, scalable solutions.",
  },
  {
    role: "Web Development Learner",
    company: "Self Learning",
    duration: "2025 - Present",
    description:
      "Passionately exploring modern web technologies like HTML, CSS, JavaScript, React, and Node.js while building real-world projects that strengthen both frontend creativity and backend problem-solving skills.",
  },
  {
    role: "Aspiring Web Developer",
    company: "Open to Internship",
    duration: "2024 - Present",
    description:
      "Actively building projects using React, Node.js, and JavaScript while improving problem-solving skills and preparing for web development internships.",
  },
];

// Reusable component to render each experience item with animations
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  // Animates the size of the marker (dot) as user scrolls
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the marker
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the card
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Checks if card should be displayed above or below the timeline line
  const isAbove = idx % 2 === 0;
  // Animates vertical movement of cards for desktop layout
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 28 : -28, 0],
  );
  // Animates horizontal movement of cards for mobile layout
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Render for Desktop layout
  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        {/* Marker dot on the timeline */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_15px_rgba(28,216,210,0.8)] border-2 border-black"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* Small vertical line above or below the marker */}
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-0.75 bg-gradient-to-b from-[#1CD8D2] to-white/50`}
          style={{ height: 36, opacity: cardOpacity }}
        />
        {/* Experience card with role, company, duration, description */}
        <motion.div
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} w-[300px] lg:w-[320px] max-w-[90vw]`}
          style={{ opacity: cardOpacity, y: cardY }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <SpatialCard
            maxTilt={12}
            scale={1.03}
            className="bg-gray-900/85 backdrop-blur-xl border border-gray-700/70 hover:border-[#1CD8D2]/60 rounded-xl p-6 sm:p-7 shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
            <p className="text-sm text-[#1CD8D2] font-medium mb-3">
              {exp.company} | {exp.duration}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed break-words">
              {exp.description}
            </p>
          </SpatialCard>
        </motion.div>
      </div>
    );
  }

  // Render for Mobile layout
  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      {/* Marker dot on mobile timeline */}
      <motion.div
        className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_12px_rgba(28,216,210,0.8)] border-2 border-black"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Experience card (mobile version) */}
      <motion.div
        className="w-[85vw] max-w-sm ml-6"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <SpatialCard
          maxTilt={8}
          scale={1.02}
          className="bg-gray-900/85 backdrop-blur-xl border border-gray-700/70 rounded-xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold break-words text-white">
            {exp.role}
          </h3>
          <p className="text-sm text-[#1CD8D2] mb-2 break-words font-medium">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 break-words leading-relaxed">
            {exp.description}
          </p>
        </SpatialCard>
      </motion.div>
    </div>
  );
}

// Main Experience component
export default function Experience() {
  const sceneRef = React.useRef(null); // Ref for the scrolling section
  const [isMobile, setIsMobile] = React.useState(false); // State to track if device is mobile

  // Detect window size and set isMobile state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic scene height - calibrated to be snappy without excessive dead space
  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length * 0.9
    : 100 * experiences.length * 0.75;

  // Get scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Calculate thresholds for each experience card's animation start/end
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: numExperiences },
        (_, i) => (i + 1) / numExperiences,
      ),
    [numExperiences],
  );

  // Animate timeline line width (desktop) and height (mobile)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      {/* Ambient background glows for rich aesthetic */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#1CD8D2]/10 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#00bf8f]/10 blur-[140px]" />
      </div>

      {/* Main container with dynamic height */}
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden">
          {/* Section Title */}
          <div className="shrink-0 px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 sm:mt-5 text-center text-white">
              Experience
            </h2>
          </div>

          {/* Timeline container */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-6 sm:pb-8">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal timeline line */}
              <div className="relative h-1.5 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-white rounded-full origin-left shadow-[0_0_12px_rgba(28,216,210,0.6)]"
                  style={{ width: lineWidth }}
                />
              </div>

              {/* Experience items mapped for desktop */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden py-4">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-white rounded-full origin-top shadow-[0_0_10px_rgba(28,216,210,0.6)]"
                  style={{ height: lineHeight }}
                />
              </div>

              {/* Experience items mapped for mobile */}
              <div className="relative flex flex-col gap-8 sm:gap-10 ml-6 sm:ml-8 mt-2 pb-16">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
