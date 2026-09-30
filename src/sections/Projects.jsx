import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import SpatialCard from "../components/SpatialCard";

// Import project images (different versions for mobile and desktop)
import for1 from "../assets/Forever1.png";
import for2 from "../assets/Forever2.png";
import Health1 from "../assets/Health1.png";
import Health2 from "../assets/Health2.png";
import Inv1 from "../assets/Inv1.png";
import Inv2 from "../assets/Inv2.png";
import Resume1 from "../assets/Resume1.png";
import Resume2 from "../assets/Resume2.png";

/**
 * Custom hook to detect if the current viewport matches a media query
 * @param {string} query - CSS media query string (default: mobile breakpoint)
 * @returns {boolean} - True if the media query matches
 */
const useMediaQuery = (query = "(max-width: 639px)") => {
  const subscribe = React.useCallback(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mediaQueryList = window.matchMedia(query);
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", callback);
        return () => mediaQueryList.removeEventListener("change", callback);
      }
      mediaQueryList.addListener(callback);
      return () => mediaQueryList.removeListener(callback);
    },
    [query],
  );

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
};

/**
 * Projects Component - Displays a scroll-based carousel of projects
 * Each project smoothly transitions background color, ambient glow, and accent tones
 */
export default function Projects() {
  const isMobile = useMediaQuery();
  const sectionRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Project data with harmonized background colors, ambient glows, and accent palettes
  const projects = React.useMemo(
    () => [
      {
        index: 0,
        title: "E-Commerce",
        tag: "Luxury Fashion & Retail",
        link: "https://forever-clothes-store-by-arpit.netlify.app/",
        // Harmonized warm rose-noir to complement the peach-nude fashion aesthetic
        backgroundColor: "#170e13",
        glowColor: "rgba(244, 165, 180, 0.22)",
        borderColor: "rgba(244, 165, 180, 0.32)",
        accentColor: "#f4a7bb",
        glareColor: "rgba(244, 165, 180, 0.5), rgba(225, 29, 72, 0.15)",
        image: isMobile ? for1 : for2,
      },
      {
        index: 1,
        title: "HealthNexus",
        tag: "AI Fitness & Health Coach",
        link: "https://health-nexus-your-journey-to-better.vercel.app/",
        // Deep aquatic marine teal to complement emerald and azure fitness accents
        backgroundColor: "#05161c",
        glowColor: "rgba(16, 185, 129, 0.22)",
        borderColor: "rgba(16, 185, 129, 0.35)",
        accentColor: "#10b981",
        glareColor: "rgba(16, 185, 129, 0.45), rgba(37, 99, 235, 0.2)",
        image: isMobile ? Health1 : Health2,
      },
      {
        index: 2,
        title: "Inventory Pro",
        tag: "Smart Shopkeeper Suite",
        link: "https://inventory-management-alpha-brown.vercel.app/",
        // Deep cyber slate-charcoal matching the dark dashboard and neon cyan tabs
        backgroundColor: "#060d14",
        glowColor: "rgba(6, 182, 212, 0.24)",
        borderColor: "rgba(6, 182, 212, 0.35)",
        accentColor: "#06b6d4",
        glareColor: "rgba(6, 182, 212, 0.5), rgba(0, 229, 255, 0.2)",
        image: isMobile ? Inv1 : Inv2,
      },
      {
        index: 3,
        title: "Hire Craft",
        tag: "AI Resume Platform",
        link: "https://resume-builder-seven-inky.vercel.app",
        // Deep cosmic midnight sapphire to match starry space UI and electric royal blue
        backgroundColor: "#070c1b",
        glowColor: "rgba(59, 130, 246, 0.25)",
        borderColor: "rgba(59, 130, 246, 0.35)",
        accentColor: "#3b82f6",
        glareColor: "rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.2)",
        image: isMobile ? Resume1 : Resume2,
      },
    ],
    [isMobile],
  );

  // Track scroll progress through the projects section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate scroll thresholds for switching between projects
  const scrollThresholds = React.useMemo(
    () => projects.map((_, index) => (index + 1) / projects.length),
    [projects],
  );

  // Update active project based on scroll position
  React.useEffect(() => {
    const handleScroll = (progress) => {
      const newIndex = scrollThresholds.findIndex(
        (threshold) => progress <= threshold,
      );
      const targetIndex =
        newIndex === -1 ? scrollThresholds.length - 1 : newIndex;
      setActiveIndex((prev) => (prev !== targetIndex ? targetIndex : prev));
    };

    if (scrollYProgress && typeof scrollYProgress.on === "function") {
      return scrollYProgress.on("change", handleScroll);
    } else if (
      scrollYProgress &&
      typeof scrollYProgress.onChange === "function"
    ) {
      return scrollYProgress.onChange(handleScroll);
    }
  }, [scrollYProgress, scrollThresholds]);

  const currentProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: currentProject.backgroundColor,
        transition: "background-color 700ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Sticky container that stays fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-between py-5 sm:py-7 px-4 overflow-hidden">
        {/* Dynamic ambient lighting behind the active project card */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[1000px] h-[450px] sm:h-[650px] rounded-full blur-[110px] sm:blur-[160px] transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(ellipse at center, ${currentProject.glowColor} 0%, transparent 72%)`,
            }}
          />
        </div>

        {/* Section Header */}
        <div className="z-20 text-center flex flex-col items-center pt-2">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide mb-1.5 backdrop-blur-md transition-all duration-500 border"
            style={{
              backgroundColor: `${currentProject.accentColor}18`,
              borderColor: currentProject.borderColor,
              color: currentProject.accentColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: currentProject.accentColor }}
            />
            <span>Selected Projects</span>
            <span className="opacity-40">•</span>
            <span>
              0{activeIndex + 1} / 0{projects.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            My Work
          </h2>
        </div>

        {/* Projects Carousel Container */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              isActive={activeIndex === index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom Bar: Action Button & Project Dots */}
        <div className="z-30 flex flex-col items-center gap-3 pb-2 sm:pb-3">
          <a
            href={currentProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-sm tracking-wide bg-white text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              boxShadow: `0 10px 30px -5px ${currentProject.accentColor}88`,
            }}
            aria-label={`View ${currentProject?.title} live project`}
          >
            <span>View Live Project</span>
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: currentProject.accentColor }}
            />
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* Project Navigation Dots */}
          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.title}
                type="button"
                onClick={() => {
                  if (sectionRef.current) {
                    const rect = sectionRef.current.getBoundingClientRect();
                    const scrollTop =
                      window.scrollY || document.documentElement.scrollTop;
                    const sectionTop = rect.top + scrollTop;
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const targetY =
                      sectionTop + (idx / projects.length) * sectionHeight + 50;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: activeIndex === idx ? "28px" : "8px",
                  backgroundColor:
                    activeIndex === idx
                      ? currentProject.accentColor
                      : "rgba(255, 255, 255, 0.25)",
                }}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Project Item Component
 * Displays the project with smooth opacity transitions, 3D Spatial tilt, and matching accents
 */
function ProjectItem({ project, isActive, isMobile }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
        isActive
          ? "opacity-100 scale-100 z-20 pointer-events-auto"
          : "opacity-0 scale-95 z-0 pointer-events-none"
      }`}
      style={{ width: "88%", maxWidth: "1150px" }}
    >
      {/* Animated Project Title & Tag Bar */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between gap-3 mb-2.5 px-1"
          >
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
                {project.title}
              </h3>
              <span
                className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: project.borderColor,
                  color: project.accentColor,
                  backgroundColor: `${project.accentColor}18`,
                }}
              >
                {project.tag}
              </span>
            </div>

            <div
              className="text-xs sm:text-sm font-semibold tracking-wider px-2.5 py-0.5 rounded-md border font-mono"
              style={{
                color: project.accentColor,
                borderColor: project.borderColor,
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              0{project.index + 1}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Spatial Card Container with matching project border and glow */}
      <SpatialCard
        maxTilt={8}
        scale={1.015}
        glareColor={project.glareColor}
        className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 h-[52vh] sm:h-[60vh]`}
        style={{
          zIndex: 10,
          borderColor: project.borderColor,
          borderWidth: "1.5px",
          borderStyle: "solid",
          boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -8px ${project.glowColor}`,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top sm:object-center"
          loading="lazy"
        />

        {/* Gentle vignette overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 11,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden="true"
        />
      </SpatialCard>
    </div>
  );
}
