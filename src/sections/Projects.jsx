import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// Import project images (different versions for mobile and desktop)
import for1 from "../assets/Forever1.png";
import for2 from "../assets/Forever2.png";
import crave1  from "../assets/Crave1.png";
import crave2 from "../assets/Crave2.png";
import harm1 from "../assets/Harm1.png";
import harm2 from "../assets/Harm2.png";

// Helper component: Motion-enabled heading
const AnimatedHeading = motion.h3;

/**
 * Custom hook to detect if the current viewport matches a media query
 * @param {string} query - CSS media query string (default: mobile breakpoint)
 * @returns {boolean} - True if the media query matches
 */
const useMediaQuery = (query = "(max-width: 639px)") => {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    
    // Handler to update state when media query changes
    const handleChange = (event) => setMatches(event.matches);
    
    // Add event listener (modern API with fallback for older browsers)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Projects Component - Displays a scroll-based carousel of projects
 * Each project takes 100vh of scroll space, with content fixed in viewport
 */
export default function Projects() {
  const isMobile = useMediaQuery();
  const sectionRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Project data with responsive images
  const projects = React.useMemo(
    () => [
      {
        title: " E-Commerce",
        link: "https://forever-clothes-store-by-arpit.netlify.app/",
        backgroundColor: "#374151",
        image: isMobile ? for1 : for2,
      },
      {
        title: "Cravings",
        link: "https://cravings-food-by-arpit.netlify.app/",
        backgroundColor: "#243B55",
        image: isMobile ? crave1 : crave2,
      },
      {
        title: "Piano",
        link: "https://frolicking-zabaione-040523.netlify.app/",
        backgroundColor: "#000030",
        image: isMobile ? harm1 : harm2,
      },
    ],
    [isMobile]
  );

  // Track scroll progress through the projects section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate scroll thresholds for switching between projects
  const scrollThresholds = projects.map((_, index) => (index + 1) / projects.length);

  // Update active project based on scroll position
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const newIndex = scrollThresholds.findIndex((threshold) => progress <= threshold);
      setActiveIndex(newIndex === -1 ? scrollThresholds.length - 1 : newIndex);
    });
    
    return unsubscribe;
  }, [scrollYProgress, scrollThresholds]);

  const currentProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: currentProject.backgroundColor,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container that stays fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Section Header */}
        <h2 className={`text-2xl sm:text-3xl font-semibold z-10 text-center px-4 ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work
        </h2>

        {/* Projects Container */}
        <div className={`relative w-full flex-1 flex items-center justify-center px-4 ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              isActive={activeIndex === index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <a
            href={currentProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${currentProject?.title} project`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Project Item Component
 * Handles the display of a single project with animations
 */
function ProjectItem({ project, isActive, isMobile }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
        isActive ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
      }`}
      style={{ width: "85%", maxWidth: "1200px" }}
    >
      {/* Animated Project Title */}
      <AnimatePresence mode="wait">
        {isActive && (
          <AnimatedHeading
            key={project.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%] sm:mb-0 font-bangers italic font-semibold ${
              isMobile ? "-mt-25" : ""
            }`}
            style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
          >
            {project.title}
          </AnimatedHeading>
        )}
      </AnimatePresence>

      {/* Project Image Container */}
      <div
        className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
          isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
        } h-[62vh] sm:h-[66vh]`}
        style={{ zIndex: 10 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
          }}
          loading="lazy"
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 11,
            background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}