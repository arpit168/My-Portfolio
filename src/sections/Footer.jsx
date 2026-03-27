// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa6";

/**
 * Social media links configuration
 * - Each object represents a platform
 * - Replace `href` with your own profile links
 * - Add/remove items if you want more or fewer social platforms
 */
const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/arpit-gupta-4a3343331/", color: "#0A66C2" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/anokha_arpit/?hl=en", color: "#E4405F" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/arpit168", color: "#FFFFFF" },
  { Icon: FaXTwitter, label: "X (Twitter)", href: "https://twitter.com/", color: "#FFFFFF" },
  { Icon: FaYoutube, label: "YouTube", href: "https://youtube.com/", color: "#FF0000" },
];

/**
 * Quick links for navigation
 */
const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Framer Motion variants for hover/tap glow effects
 * - Enhanced with platform-specific colors on hover
 */
const iconVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: (color) => ({
    scale: 1.25,
    y: -4,
    color: color,
    filter: `drop-shadow(0 0 12px ${color}80) drop-shadow(0 0 20px ${color}40)`,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  }),
  tap: { scale: 0.92, y: 0, transition: { duration: 0.08 } },
};

/**
 * Button variant for scroll to top
 */
const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { 
    scale: 1.1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 },
};

/**
 * Scroll to top handler
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-black via-gray-950 to-black">
      {/* --- Animated Background Effects --- */}
      {/* Floating particles / grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_20%_80%,rgba(13,88,204,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-linear(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>
      
      {/* Animated linear orb - bottom left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px]"
      />
      
      {/* Animated linear orb - top right */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]"
      />

      {/* --- Main Footer Content --- */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-7xl"
        >
          {/* Top Section: Brand & Quote */}
          <div className="flex flex-col items-center text-center">
            {/* Animated name with linear */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h1
                className="font-bold leading-none text-center select-none tracking-tight"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  background: "linear-linear(135deg, #FFFFFF 0%, #94A3B8 50%, #CBD5E1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                Arpit Gupta
              </h1>
              
              {/* Decorative dot below name */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-3 left-1/2 h-1 -translate-x-1/2 rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400"
              />
            </motion.div>

            {/* Tagline with fade in */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-gray-400 text-sm sm:text-base max-w-md"
            >
              Building digital experiences with code & creativity
            </motion.p>
          </div>

          {/* Divider with linear */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="my-8 sm:my-10 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent"
          />

          {/* Middle Section: Quick Links & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            {/* Quick Navigation Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {quickLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, color: "#10B981" }}
                  className="text-gray-400 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-emerald-400"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Social Icons with enhanced hover effects */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-5 sm:gap-6"
            >
              {socials.map(({ Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={color}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-400 transition-colors duration-200"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quote Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <div className="relative inline-block">
              <span className="absolute -left-6 -top-4 text-4xl text-emerald-500/30">"</span>
              <p className="text-gray-300 italic text-sm sm:text-base max-w-xl px-4">
                Success is where preparation meets opportunity — and persistence keeps the door open.
              </p>
              <span className="absolute -right-6 -bottom-6 text-4xl text-emerald-500/30">"</span>
            </div>
          </motion.div>

          {/* Bottom Section: Copyright & Heart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Arpit Gupta. All rights reserved.
            </p>
            
            <motion.p 
              whileHover={{ scale: 1.02 }}
              className="text-xs text-gray-500 flex items-center gap-1"
            >
              Made with <FaHeart className="text-red-500 text-xs animate-pulse" /> by Arpit
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      
    </footer>
  );
};

export default Footer;