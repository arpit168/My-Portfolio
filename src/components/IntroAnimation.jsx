import React, { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import PropTypes from 'prop-types';


// Register GSAP plugins
gsap.registerPlugin(MorphSVGPlugin);

// Animation configuration constants
const ANIMATION_CONFIG = {
  GREETING: {
    INITIAL_OPACITY: 0,
    INITIAL_Y: 20,
    FINAL_OPACITY: 1,
    FINAL_Y: 0,
    DURATION: 0.12,
    EASE: "power2.out"
  },
  EXIT: {
    DURATION: 1.8,
    EASE: "power4.inOut",
    POST_GREETING_DELAY: 300
  },
  GREETING_INTERVAL: 180
};

const SVG_PATHS = {
  INITIAL: "M0,0 L0,900 L1440,900 L1440,0 Z",
  FINAL: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z"
};

const GREETINGS = [
  { text: "Hello", language: "English" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "Hola", language: "Spanish" },
  { text: "Hej", language: "Swedish" },
  { text: "Hallo", language: "German" },
  { text: "Salam", language: "Arabic" }
];

const IntroAnimation = ({ onFinish, className = "", skipAnimation = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);
  const svgPathRef = useRef(null);
  const timersRef = useRef([]);

  // Clear all timers utility
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  // Animate greeting appearance
  const animateGreeting = useCallback(() => {
    if (!greetingRef.current) return;

    return gsap.fromTo(
      greetingRef.current,
      {
        opacity: ANIMATION_CONFIG.GREETING.INITIAL_OPACITY,
        y: ANIMATION_CONFIG.GREETING.INITIAL_Y
      },
      {
        opacity: ANIMATION_CONFIG.GREETING.FINAL_OPACITY,
        y: ANIMATION_CONFIG.GREETING.FINAL_Y,
        duration: ANIMATION_CONFIG.GREETING.DURATION,
        ease: ANIMATION_CONFIG.GREETING.EASE,
        clearProps: "all"
      }
    );
  }, []);

  // Handle exit animation and cleanup
  const performExitAnimation = useCallback(() => {
    if (!overlayRef.current || !greetingRef.current) return;

    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        clearAllTimers();
        if (onFinish && typeof onFinish === 'function') {
          onFinish();
        }
      }
    });

    // Animate overlay and greeting slide up
    timeline.to(
      [overlayRef.current, greetingRef.current],
      {
        y: "-100vh",
        duration: ANIMATION_CONFIG.EXIT.DURATION,
        ease: ANIMATION_CONFIG.EXIT.EASE,
        stagger: 0.1
      },
      0
    );

    // Morph SVG path if available
    if (svgPathRef.current) {
      timeline.to(
        svgPathRef.current,
        {
          morphSVG: SVG_PATHS.FINAL,
          duration: ANIMATION_CONFIG.EXIT.DURATION,
          ease: ANIMATION_CONFIG.EXIT.EASE
        },
        "<"
      );
    }

    return timeline;
  }, [onFinish, clearAllTimers]);

  // Main animation sequence
  useEffect(() => {
    // Skip animation if specified
    if (skipAnimation) {
      onFinish?.();
      return;
    }

    let greetingTimer;

    const showNextGreeting = () => {
      const isLastGreeting = currentIndex >= GREETINGS.length - 1;
      
      // Animate current greeting
      animateGreeting();

      if (!isLastGreeting) {
        // Schedule next greeting
        greetingTimer = setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
        }, ANIMATION_CONFIG.GREETING_INTERVAL);
      } else {
        // Schedule exit animation after last greeting
        greetingTimer = setTimeout(() => {
          performExitAnimation();
        }, ANIMATION_CONFIG.EXIT.POST_GREETING_DELAY);
      }
    };

    showNextGreeting();

    // Cleanup function
    return () => {
      if (greetingTimer) clearTimeout(greetingTimer);
      clearAllTimers();
      
      // Kill any ongoing GSAP animations
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
      }
      if (greetingRef.current) {
        gsap.killTweensOf(greetingRef.current);
      }
      if (svgPathRef.current) {
        gsap.killTweensOf(svgPathRef.current);
      }
    };
  }, [currentIndex, animateGreeting, performExitAnimation, clearAllTimers, skipAnimation, onFinish]);

  // Get current greeting with metadata
  const currentGreeting = GREETINGS[currentIndex];

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-label="Intro animation"
      role="presentation"
    >
      <h1
        ref={greetingRef}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20 px-4 text-center opacity-0"
        style={{ 
          fontSize: "clamp(2rem, 10vw, 8rem)",
          transform: "translateY(20px)",
          textShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
        aria-label={`Greeting in ${currentGreeting?.language || 'multiple languages'}: ${currentGreeting?.text || ''}`}
      >
        {currentGreeting?.text}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={svgPathRef}
          fill="black"
          d={SVG_PATHS.INITIAL}
        />
      </svg>
    </div>
  );
};

// PropTypes for better type checking (optional, but recommended)
IntroAnimation.propTypes = {
  onFinish: PropTypes.func,
  className: PropTypes.string,
  skipAnimation: PropTypes.bool
};

// Default props
IntroAnimation.defaultProps = {
  onFinish: () => {},
  className: "",
  skipAnimation: false
};

export default React.memo(IntroAnimation);