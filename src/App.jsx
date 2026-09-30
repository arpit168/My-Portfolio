import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";

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

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </ReactLenis>
    </div>
  );
}
