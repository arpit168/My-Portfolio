import { motion } from "framer-motion";
import p from "../assets/p.webp";
import SpatialCard from "../components/SpatialCard";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Layered neon background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-90 h-90 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-105 h-105 rounded-full bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-55 h-55 rounded-full bg-linear-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        {/* Profile header */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center md:items-center gap-8 lg:gap-12"
        >
          {/* Avatar / Card with 3D Spatial Tilt hugging exact image aspect ratio */}
          <SpatialCard
            maxTilt={14}
            scale={1.02}
            className="w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#1CD8D2]/40 glow-8d aspect-[1159/1358] shrink-0"
            aria-hidden="true"
          >
            <img
              src={p}
              alt="Arpit Gupta profile"
              className="w-full h-full object-cover object-center select-none block"
              loading="lazy"
              decoding="async"
              width={320}
              height={375}
            />
          </SpatialCard>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Arpit Gupta
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I build scalable, modern applications with a strong focus on clean
              architecture, delightful UX, and performance. My toolkit spans
              Java, React, Node.js, JavaScript, Tailwind CSS, and
              FastAPI—bringing ideas to life from concept to production with
              robust APIs and smooth interfaces.
            </p>

            {/* Quick stats with 3D Spatial Cards */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Experience", value: "Fresher" },
                { label: "Specialty", value: "MERN Full Stack" },
                { label: "Focus", value: "Performance & UX" },
              ].map((item, i) => (
                <SpatialCard
                  key={i}
                  maxTilt={18}
                  scale={1.05}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center shadow-lg hover:border-[#1CD8D2]/40 transition-colors"
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </SpatialCard>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center animate-pulse justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Body copy only — removed skills chip grid */}
        <div className="grid md:grid-cols-1">
          <div data-aos="fade-right" className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              I’m a Frontend , Backend and Web Developer — passionate about
              building fast, resilient applications and sharing coding insights
              on LinkedIn.
            </p>
            <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I love turning ideas into scalable, user-friendly products that
              make an impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
