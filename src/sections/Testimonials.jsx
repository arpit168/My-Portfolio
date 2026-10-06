// Importing React library so we can create and use components
import React from "react";

// Importing image assets for the testimonials section
import m1 from "../assets/m1.webp"; // Male testimonial image 1
import m2 from "../assets/m2.webp"; // Male testimonial image 2
import w1 from "../assets/w1.webp"; // Female testimonial image 1
import w2 from "../assets/w2.webp"; // Female testimonial image 2

// Importing Framer Motion for smooth animations
import { motion } from "framer-motion";
import SpatialCard from "../components/SpatialCard";

// Creating shorter variables for motion components to make code cleaner
const MH2 = motion.h2; // Animated <h2> tag
const MDiv = motion.div; // Animated <div> tag

// Array containing all testimonial data (name, role, review, image)
const testimonials = [
  {
    name: "Michael Chen",
    role: "Lead Developer at TechStart Solutions",
    review:
      "An exceptional developer with remarkable problem-solving abilities. The code quality and architecture decisions were outstanding throughout the project.",
    image: m1, // Points to imported image
  },
  {
    name: "Sarah Williams",
    role: "Product Manager at CreativeMinds",
    review:
      "Absolutely brilliant to work with! Brought innovative ideas to the table and delivered beyond our expectations. A true asset to any team.",
    image: w1,
  },
  {
    name: "David Rodriguez",
    role: "Founder of NextGen Apps",
    review:
      "Transformed our vision into reality with elegant solutions. The attention to detail and commitment to excellence is rare to find.",
    image: m2,
  },
  {
    name: "Jennifer Lee",
    role: "Creative Director at DesignHub",
    review:
      "One of the most talented professionals I've collaborated with. The work produced was not just functional but beautifully crafted.",
    image: w2,
  },
];

// Functional component for Testimonials section
function Testimonials() {
  return (
    // Section wrapper with styling
    <section
      id="testimonials"
      className="relative w-full bg-black text-white flex flex-col items-center px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#1CD8D2]/8 blur-[100px]" />
      </div>

      {/* Animated Section Title */}
      <h2
        data-aos="fade-down"
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-14 text-center text-white"
      >
        What People Say
      </h2>

      {/* Grid for all testimonial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
        {/* Looping through testimonials array to create each card */}
        {testimonials.map((testi, idx) => (
          <div
            key={testi.name + idx} // Unique key for React rendering
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <SpatialCard
              maxTilt={16}
              scale={1.03}
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:border-[#1CD8D2]/40 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl transition-colors h-full"
            >
              {/* Person Image */}
              <img
                src={testi.image} // Image from array
                alt={testi.name} // Accessibility
                className="w-20 h-20 rounded-full border-2 border-[#1CD8D2]/60 mb-4 object-cover shadow-[0_0_15px_rgba(28,216,210,0.3)]"
                loading="lazy" // Lazy load for performance
                decoding="async"
                width={80}
                height={80}
              />

              {/* Testimonial Review Text */}
              <p className="text-gray-200 italic mb-4">"{testi.review}"</p>

              {/* Name of the person */}
              <h3 className="text-lg font-semibold text-white">{testi.name}</h3>

              {/* Their role/job title */}
              <p className="text-sm text-[#1CD8D2]">{testi.role}</p>
            </SpatialCard>
          </div>
        ))}
      </div>
    </section>
  );
}

// Exporting the component so it can be used in App.jsx
export default Testimonials;
