// Importing React for building UI components
import React, { useState, useRef, useEffect } from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// Contact page component with attractive design and animations
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 });
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call (replace with actual endpoint)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send data to your backend
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  // Contact methods data
  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "hello@example.com",
      link: "mailto:hello@example.com",
      linear: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: "fab fa-linkedin",
      title: "LinkedIn",
      info: "linkedin.com/in/username",
      link: "https://linkedin.com/in/username",
      linear: "from-blue-600/20 to-indigo-600/20"
    },
    {
      icon: "fab fa-github",
      title: "GitHub",
      info: "github.com/username",
      link: "https://github.com/username",
      linear: "from-gray-600/20 to-gray-800/20"
    },
    {
      icon: "fab fa-twitter",
      title: "Twitter",
      info: "@username",
      link: "https://twitter.com/username",
      linear: "from-sky-500/20 to-blue-500/20"
    }
  ];
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        {/* linear Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-600/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </motion.div>
      
      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Section Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Get in Touch</span>
          </motion.div>
          
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>
          
          {/* Section Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
            Let's create something amazing together.
          </motion.p>
        </motion.div>
        
        {/* Contact Grid - Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form Card */}
          <motion.div
            ref={formRef}
            variants={cardVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/70 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <i className="fas fa-paper-plane text-cyan-400" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Your Name"
                  />
                </motion.div>
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              </div>
              
              {/* Email Field */}
              <div className="relative">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Email Address"
                  />
                </motion.div>
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              </div>
              
              {/* Subject Field */}
              <div className="relative">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Subject"
                  />
                </motion.div>
                <i className="fas fa-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              </div>
              
              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  placeholder="Your Message..."
                />
                <i className="fas fa-comment absolute left-4 top-4 text-gray-500 text-sm" />
              </div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-linear-to-r from-white to-gray-300 text-black hover:shadow-lg hover:shadow-white/20"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" />
                    Send Message
                  </>
                )}
              </motion.button>
              
              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-green-400 text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-check-circle" />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-exclamation-circle" />
                    Something went wrong. Please try again later.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
          
          {/* Contact Info Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Intro Card */}
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/70 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <i className="fas fa-code text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Available for Opportunities</h3>
                  <p className="text-gray-400 text-sm">Open to internships & collaborations</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I'm currently looking for exciting web development opportunities.
                Whether you have a project in mind or just want to connect, feel free to reach out!
              </p>
            </div>
            
            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={idx}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 transition-all cursor-pointer group hover:border-gray-500"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-linear-to-r ${method.linear} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`${method.icon} text-white text-lg`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">{method.title}</p>
                      <p className="text-sm font-medium text-white truncate max-w-37.5 sm:max-w-none">
                        {method.info}
                      </p>
                    </div>
                    <i className="fas fa-arrow-right text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
              </div>
              <span className="text-sm text-gray-300">
                Available for <span className="text-white font-medium">immediate response</span> during working hours
              </span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Bottom Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
};

export default Contact; 