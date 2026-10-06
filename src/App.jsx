import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import ReactLenis, { useLenis } from "lenis/react";
import AOS from "aos";
import "aos/dist/aos.css";

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

// True Lazy Loading component that only renders when scrolled near
function LazySection({ children, id, minHeight = "min-h-screen" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Artificial delay to make the app feel slow
          setTimeout(() => {
            setIsVisible(true);
          }, 1500);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }, // Wait until strictly in viewport
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={!isVisible ? minHeight : ""}>
      {isVisible ? (
        <Suspense fallback={<SectionFallback id={id} minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionFallback id={id} minHeight={minHeight} />
      )}
    </div>
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  return (
    <div className="relative animated-gradient text-white">
      <ReactLenis
        root
        options={{
          lerp: 0.02,
          wheelMultiplier: 0.4,
          touchMultiplier: 0.5,
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

        <LazySection id="about">
          <About />
        </LazySection>

        <LazySection id="skills">
          <Skills />
        </LazySection>

        <LazySection id="projects">
          <Projects />
        </LazySection>

        <LazySection id="experience" minHeight="min-h-[500px]">
          <Experience />
        </LazySection>

        <LazySection id="testimonials" minHeight="min-h-[500px]">
          <Testimonials />
        </LazySection>

        <LazySection id="contact">
          <Contact />
        </LazySection>

        <LazySection id="footer" minHeight="min-h-[250px]">
          <Footer />
        </LazySection>
      </ReactLenis>
    </div>
  );
}
