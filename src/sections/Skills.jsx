import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa6";
import {
  SiJavascript,
  SiTailwindcss,
  SiFastapi,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiNextdotjs,
  SiDotnet,
  SiFigma,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";
import SpatialCard from "../components/SpatialCard";

// Comprehensive skill catalog with categories, brand colors, and 8D spatial metadata
const SKILLS_DATA = [
  {
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    level: "Advanced",
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.4)",
    description: "Hooks, SPA architecture, Framer Motion, state management",
    icon: <FaReact />,
  },
  {
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    level: "Proficient",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.35)",
    description:
      "App router, SSR/SSG, server actions, full-stack React applications",
    icon: <SiNextdotjs />,
  },
  {
    name: "TypeScript",
    category: "languages",
    categoryLabel: "Languages & Core",
    level: "Proficient",
    color: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.4)",
    description: "Strict typing, generics, interfaces, scalable codebases",
    icon: <SiTypescript />,
  },
  {
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Languages & Core",
    level: "Advanced",
    color: "#F7DF1E",
    glowColor: "rgba(247, 223, 30, 0.35)",
    description: "ES6+, Async/Await, closures, DOM manipulation, Web APIs",
    icon: <SiJavascript />,
  },
  {
    name: "C#",
    category: "languages",
    categoryLabel: "Languages & Core",
    level: "Intermediate",
    color: "#9B4F96",
    glowColor: "rgba(155, 79, 150, 0.4)",
    description:
      "Object-oriented design, LINQ, asynchronous programming, strong typing",
    icon: <TbBrandCSharp />,
  },
  {
    name: "ASP.NET Core",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Intermediate",
    color: "#512BD4",
    glowColor: "rgba(81, 43, 212, 0.4)",
    description:
      "Enterprise Web APIs, Entity Framework Core, dependency injection",
    icon: <SiDotnet />,
  },
  {
    name: "Figma",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    level: "Proficient",
    color: "#F24E1E",
    glowColor: "rgba(242, 78, 30, 0.4)",
    description:
      "UI/UX wireframing, interactive prototyping, modern design systems",
    icon: <SiFigma />,
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    level: "Advanced",
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    description: "Modern design systems, responsive UI, 3D Spatial utilities",
    icon: <SiTailwindcss />,
  },
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Intermediate",
    color: "#68A063",
    glowColor: "rgba(104, 160, 99, 0.4)",
    description: "Event-driven runtime, RESTful microservices, NPM ecosystem",
    icon: <FaNodeJs />,
  },
  {
    name: "FastAPI",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Proficient",
    color: "#059669",
    glowColor: "rgba(5, 150, 105, 0.4)",
    description: "High-speed Python APIs, async endpoints, Pydantic schemas",
    icon: <SiFastapi />,
  },
  {
    name: "Java",
    category: "languages",
    categoryLabel: "Languages & Core",
    level: "Proficient",
    color: "#ED8B00",
    glowColor: "rgba(237, 139, 0, 0.4)",
    description: "OOP principles, robust backend architecture, data structures",
    icon: <FaJava />,
  },
  {
    name: "MSSQL",
    category: "database",
    categoryLabel: "Database & Tools",
    level: "Intermediate",
    color: "#CC292B",
    glowColor: "rgba(204, 41, 43, 0.4)",
    description:
      "Relational schemas, T-SQL queries, stored procedures, indexing",
    icon: <DiMsqlServer />,
  },
  {
    name: "MongoDB",
    category: "database",
    categoryLabel: "Database & Tools",
    level: "Intermediate",
    color: "#47A248",
    glowColor: "rgba(71, 162, 72, 0.4)",
    description: "NoSQL document modeling, indexing, Atlas cloud clusters",
    icon: <SiMongodb />,
  },
  {
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend & APIs",
    level: "Intermediate",
    color: "#E5E7EB",
    glowColor: "rgba(229, 231, 235, 0.35)",
    description: "Server routing, middleware chains, token authentication",
    icon: <SiExpress />,
  },
  {
    name: "CSS3 / Styling",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    level: "Advanced",
    color: "#2965F1",
    glowColor: "rgba(41, 101, 241, 0.4)",
    description:
      "Glassmorphism, CSS Grid, 3D perspective transforms, animations",
    icon: <FaCss3Alt />,
  },
  {
    name: "Git & GitHub",
    category: "database",
    categoryLabel: "Database & Tools",
    level: "Advanced",
    color: "#F05032",
    glowColor: "rgba(240, 80, 50, 0.4)",
    description: "Version control, branching workflows, collaborative coding",
    icon: <FaGitAlt />,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & APIs" },
  { id: "languages", label: "Languages & Core" },
  { id: "database", label: "Database & Tools" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Performance-optimized marquee refs (zero re-renders during scrolling)
  const dirRef = useRef(-1);
  const loopWidthRef = useRef(0);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  // Filter skills based on active tab
  const filteredSkills = React.useMemo(() => {
    if (activeCategory === "all") return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Repeated list for smooth continuous infinite marquee
  const repeatedMarquee = React.useMemo(
    () => [...SKILLS_DATA, ...SKILLS_DATA],
    [],
  );

  // Cache loop width once on mount & resize (avoids expensive scrollWidth layout thrashing in RAF)
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        loopWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [repeatedMarquee]);

  // Observe section visibility for marquee performance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { threshold: [0.05] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sync scroll wheel direction with marquee drift WITHOUT triggering re-renders
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
      dirRef.current = e.deltaY > 0 ? -1 : 1;
    };
    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      dirRef.current = delta > 0 ? 1 : -1;
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // Smooth continuous RAF loop - ONLY runs when active
  useEffect(() => {
    if (!active) return;

    let id;
    let last = performance.now();
    const SPEED = 65;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dirRef.current * dt;
      const loop = loopWidthRef.current;

      if (loop > 0) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative bg-[#04060b] text-white overflow-hidden"
    >
      {/* 8D Ambient Atmospheric Glow Spheres */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[#302b63] via-[#00bf8f]/20 to-[#1cd8d2]/30 opacity-25 blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#1cd8d2]/25 via-[#302b63]/30 to-[#00bf8f]/20 opacity-25 blur-[150px] animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-radial from-[#1cd8d2]/10 via-transparent to-transparent blur-[120px]" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
        {/* 8D Spatial Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md bg-white/5 border border-[#1cd8d2]/30 text-[#1cd8d2] shadow-[0_0_20px_rgba(28,216,210,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#1cd8d2] animate-ping" />
          <span>8D Tech Stack Matrix</span>
        </motion.div>

        {/* Gradient Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        >
          Skills & Technologies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl"
        >
          Interactive spatial overview of my core developing toolkit, modern
          frameworks, and developer ecosystems.
        </motion.p>

        {/* Interactive Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "text-black font-semibold shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* 8D Spatial Cards Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mb-16 px-2">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="h-full"
              >
                <SpatialCard
                  maxTilt={12}
                  scale={1.03}
                  glareColor={`${skill.glowColor}`}
                  className="h-full p-5 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  style={{
                    borderColor:
                      hoveredSkill === skill.name
                        ? skill.color
                        : "rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      hoveredSkill === skill.name
                        ? `0 15px 35px -10px ${skill.glowColor}, 0 0 20px -2px ${skill.color}44`
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div>
                    {/* Top Row: Icon + Level Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* 3D Glowing Brand Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 border"
                        style={{
                          color: skill.color,
                          backgroundColor: `${skill.color}15`,
                          borderColor: `${skill.color}35`,
                          boxShadow: `0 0 20px ${skill.color}25`,
                        }}
                      >
                        {skill.icon}
                      </div>

                      {/* Proficiency Badge */}
                      <span
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-300"
                        style={{
                          color: skill.color,
                          borderColor: `${skill.color}40`,
                          backgroundColor: `${skill.color}12`,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Title & Category */}
                    <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-200">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                      {skill.categoryLabel}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-gray-300/80 leading-relaxed mt-2.5">
                      {skill.description}
                    </p>
                  </div>

                  {/* Bottom Accent Glow Line */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                      8D Depth
                    </span>
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`,
                      }}
                    />
                  </div>
                </SpatialCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee Ticker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto overflow-hidden pt-4 pb-2">
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest text-gray-400/80 font-mono">
            // Infinite Ecosystem Stream //
          </span>
        </div>

        {/* Gradient edge masks for smooth fadeout */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04060b] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04060b] to-transparent z-10" />

        <motion.div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ x, whiteSpace: "nowrap" }}
        >
          {repeatedMarquee.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#1cd8d2]/50 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(28,216,210,0.3)] hover:-translate-y-1 cursor-pointer select-none"
              aria-label={s.name}
            >
              <span
                className="text-2xl transition-transform duration-300 drop-shadow-md"
                style={{ color: s.color }}
              >
                {s.icon}
              </span>
              <span className="text-sm font-semibold text-white/90">
                {s.name}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
