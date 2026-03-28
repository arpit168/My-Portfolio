// Importing React library so we can create and use components
import React, { useState, useEffect } from "react";

// Importing image assets for the testimonials section
import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import w1 from "../assets/w1.png";
import w2 from "../assets/w2.png";

// Importing Framer Motion for smooth animations
import { motion, AnimatePresence } from "framer-motion";

// Importing icons (you may need to install react-icons: npm install react-icons)
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Array containing all testimonial data
const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Lead Developer at TechStart Solutions",
    review: "An exceptional developer with remarkable problem-solving abilities. The code quality and architecture decisions were outstanding throughout the project. Their attention to detail and commitment to excellence truly set them apart.",
    image: m1,
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Product Manager at CreativeMinds",
    review: "Absolutely brilliant to work with! Brought innovative ideas to the table and delivered beyond our expectations. A true asset to any team. Would highly recommend for any challenging project.",
    image: w1,
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Founder of NextGen Apps",
    review: "Transformed our vision into reality with elegant solutions. The attention to detail and commitment to excellence is rare to find. A true professional who delivers exceptional results consistently.",
    image: m2,
    rating: 5,
    featured: true,
  },
  {
    id: 4,
    name: "Jennifer Lee",
    role: "Creative Director at DesignHub",
    review: "One of the most talented professionals I've collaborated with. The work produced was not just functional but beautifully crafted. A perfect blend of technical expertise and creative thinking.",
    image: w2,
    rating: 5,
    featured: false,
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 justify-center mb-3">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-400" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index, isActive, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`
        relative cursor-pointer
        ${isActive 
          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/50 shadow-2xl shadow-purple-500/20' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
        }
        backdrop-blur-xl rounded-2xl p-6 sm:p-8 border transition-all duration-300
      `}
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="absolute top-4 right-4 text-3xl text-purple-500/20" />
      
      {/* Rating Stars */}
      <StarRating rating={testimonial.rating} />
      
      {/* Testimonial Text */}
      <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
        "{testimonial.review}"
      </p>
      
      {/* Person Info */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
          />
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
        </div>
        <div className="text-left">
          <h3 className="text-white font-semibold text-sm sm:text-base">
            {testimonial.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      {isActive && (
        <motion.div
          layoutId="activeLine"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
        />
      )}
    </motion.div>
  );
};

// Main Testimonials Component
function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4"
        >
          Testimonials
        </motion.div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent">
          What People Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it - hear what our clients and collaborators have to say about working with us
        </p>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex gap-4 mb-8 relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FaChevronLeft className="text-white" />
        </motion.button>
        
        {/* Dot Indicators */}
        <div className="flex gap-2 items-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(idx);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className="transition-all duration-300"
            >
              <div
                className={`
                  rounded-full transition-all duration-300
                  ${idx === activeIndex 
                    ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }
                `}
              />
            </button>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FaChevronRight className="text-white" />
        </motion.button>
      </div>

      {/* Testimonials Grid/Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={idx}
              isActive={idx === activeIndex}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(idx);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl w-full relative z-10"
      >
        {[
          { label: "Happy Clients", value: "50+" },
          { label: "Projects Completed", value: "100+" },
          { label: "Years Experience", value: "5+" },
          { label: "Success Rate", value: "100%" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  );
}

export default Testimonials;