import { useState, useEffect, lazy, Suspense } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import ReactLenis, { useLenis } from "lenis/react";

// Lazy-loaded below-the-fold sections
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

function SectionFallback({ id, minHeight = "min-h-screen" }) {
  return (
    <div
      id={id}
      className={`w-full ${minHeight} bg-black`}
      aria-hidden="true"
    />
  );
}

function AnchorScroller() {
  const lenis = useLenis();

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && lenis) {
        e.preventDefault();
        lenis.scrollTo(href, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  return null;
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Idly prefetch below-the-fold chunks after initial load so scrolling is instantaneous
  useEffect(() => {
    const prefetch = () => {
      import("./sections/About");
      import("./sections/Skills");
      import("./sections/Projects");
      import("./sections/Experience");
      import("./sections/Testimonials");
      import("./sections/Contact");
      import("./sections/Footer");
    };
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(prefetch);
      } else {
        setTimeout(prefetch, 250);
      }
    }
  }, []);

  return (
    <div className="relative animated-gradient text-white">
      <ReactLenis
        root
        options={{
          lerp: 0.085,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.0,
          smoothWheel: true,
          syncTouch: false,
          orientation: "vertical",
          gestureOrientation: "vertical",
          autoResize: true,
        }}
      >
        <AnchorScroller />
        <CustomCursor />
        <Navbar />
        {/* Intro always on top until it finishes */}
        {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

        {/* Homepage always present (masked reveal) */}
        <Home introDone={introDone} />

        <Suspense fallback={<SectionFallback id="about" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback id="skills" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback id="projects" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback id="experience" minHeight="min-h-[500px]" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback id="testimonials" minHeight="min-h-[500px]" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contact" />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback id="footer" minHeight="min-h-[250px]" />}>
          <Footer />
        </Suspense>
      </ReactLenis>
    </div>
  );
}
