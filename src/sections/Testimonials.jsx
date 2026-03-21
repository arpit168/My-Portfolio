// Importing React library so we can create and use components
import React from "react";

// Importing image assets for the testimonials section
import m1 from "../assets/m1.png"; // Male testimonial image 1
import m2 from "../assets/m2.png"; // Male testimonial image 2
import w1 from "../assets/w1.png"; // Female testimonial image 1
import w2 from "../assets/w2.png"; // Female testimonial image 2

// Importing Framer Motion for smooth animations
import { motion } from "framer-motion";

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
      id="testimonials" // ID for navigation
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20"
      // Makes this section full-screen height, black background, white text, centered content
    >
      {/* Animated Section Title */}
      <MH2
        initial={{ opacity: 0, y: -50 }} // Start invisible & slightly above
        animate={{ opacity: 1, y: 0 }} // Fade in & slide down
        transition={{ duration: 0.6 }} // Animation duration is 0.6s
        className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16" // Styling for title
      >
        What People Say
      </MH2>

      {/* Grid for all testimonial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
        {/* Looping through testimonials array to create each card */}
        {testimonials.map((testi, idx) => (
          <MDiv
            key={testi.name + idx} // Unique key for React rendering
            initial={{ opacity: 0, y: 50 }} // Start invisible & slightly below
            whileInView={{ opacity: 1, y: 0 }} // Animate when in viewport
            transition={{ duration: 0.5, delay: idx * 0.2 }} // Stagger effect based on index
            viewport={{ once: true }} // Animate only the first time it's visible
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
            // Glass effect card, rounded corners, hover animation
          >
            {/* Person Image */}
            <img
              src={testi.image} // Image from array
              alt={testi.name} // Accessibility
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
              // Circle image with border
              loading="lazy" // Lazy load for performance
            />

            {/* Testimonial Review Text */}
            <p className="text-gray-200 italic mb-4">
              "{testi.review}"
            </p>

            {/* Name of the person */}
            <h3 className="text-lg font-semibold">{testi.name}</h3>

            {/* Their role/job title */}
            <p className="text-sm text-gray-400">{testi.role}</p>
          </MDiv>
        ))}
      </div>
    </section>
  );
}

// Exporting the component so it can be used in App.jsx
export default Testimonials;