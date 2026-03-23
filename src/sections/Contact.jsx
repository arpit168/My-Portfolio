// Importing React's useState hook for managing component state
import { useState, useEffect } from "react";

// Importing motion component from Framer Motion for animations
import { motion, AnimatePresence } from "framer-motion";

// Importing EmailJS SDK
import emailjs from "@emailjs/browser";

// Importing Particles Background (same as Home component)
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

// Reading EmailJS credentials from environment variables (Vite)
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    if (formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({name: "",email: "",service: "",budget: "",idea: ""});
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
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

  const formFieldVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="contact" 
      className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-black overflow-hidden text-white py-20 px-6 md:px-20"
    >
      {/* Enhanced Particles Background */}
      <ParticlesBackground />
      
      {/* Animated linear Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-linear(rgba(28,216,210,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(28,216,210,0.02)_1px,transparent_1px)] bg-sixe-[50px_50px] pointer-events-none" />

      {/* Contact Section Content */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Get in Touch</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent"
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Have a project in mind? Let's bring your ideas to life with cutting-edge solutions
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Animated Image Section - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.img
                src={Astra}
                alt="Contact"
                className="relative w-80 lg:w-125 rounded-3xl shadow-2xl object-cover"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
              />
              
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/10 group-hover:border-cyan-500/30 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Right Side Contact Form - Enhanced Glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2"
          >
            <div className="bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <i className="fas fa-paper-plane text-white text-lg" />
                </div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Send a Message
                </h2>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Name field */}
                <motion.div 
                  variants={formFieldVariants}
                  className="group"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                >
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 pl-11 rounded-xl bg-white/5 border-2 transition-all duration-300 ${
                        errors.name 
                          ? "border-red-500 focus:border-red-500" 
                          : focusedField === "name"
                          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                          : "border-white/10 focus:border-cyan-500"
                      } text-white focus:outline-none`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <i className="fas fa-exclamation-circle text-xs" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email field */}
                <motion.div 
                  variants={formFieldVariants}
                  className="group"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                >
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 pl-11 rounded-xl bg-white/5 border-2 transition-all duration-300 ${
                        errors.email 
                          ? "border-red-500 focus:border-red-500" 
                          : focusedField === "email"
                          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                          : "border-white/10 focus:border-cyan-500"
                      } text-white focus:outline-none`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <i className="fas fa-exclamation-circle text-xs" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Service dropdown */}
                <motion.div 
                  variants={formFieldVariants}
                  className="group"
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                >
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Service Needed <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-code absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full p-3 pl-11 rounded-xl bg-white/5 border-2 transition-all duration-300 appearance-none cursor-pointer ${
                        errors.service 
                          ? "border-red-500" 
                          : focusedField === "service"
                          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                          : "border-white/10 focus:border-cyan-500"
                      } text-white focus:outline-none`}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a service
                      </option>
                      <option value="Web Development" className="text-black">🌐 Web Development</option>
                      <option value="Mobile Application" className="text-black">📱 Mobile Application</option>
                      <option value="Others" className="text-black">💡 Others</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
                  </div>
                  <AnimatePresence>
                    {errors.service && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <i className="fas fa-exclamation-circle text-xs" />
                        {errors.service}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Budget field */}
                {formData.service && formData.service !== "other" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="group"
                    onFocus={() => setFocusedField("budget")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Budget (USD) <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <i className="fas fa-dollar-sign absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="text"
                        name="budget"
                        placeholder="5000"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full p-3 pl-11 rounded-xl bg-white/5 border-2 transition-all duration-300 ${
                          errors.budget 
                            ? "border-red-500" 
                            : focusedField === "budget"
                            ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                            : "border-white/10 focus:border-cyan-500"
                        } text-white focus:outline-none`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.budget && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        >
                          <i className="fas fa-exclamation-circle text-xs" />
                          {errors.budget}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Idea textarea */}
                <motion.div 
                  variants={formFieldVariants}
                  className="group"
                  onFocus={() => setFocusedField("idea")}
                  onBlur={() => setFocusedField(null)}
                >
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Your Idea <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-lightbulb absolute left-4 top-4 text-gray-500 text-sm" />
                    <textarea
                      name="idea"
                      rows={4}
                      placeholder="Tell me about your amazing project idea..."
                      value={formData.idea}
                      onChange={handleChange}
                      className={`w-full p-3 pl-11 rounded-xl bg-white/5 border-2 transition-all duration-300 resize-none ${
                        errors.idea 
                          ? "border-red-500" 
                          : focusedField === "idea"
                          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                          : "border-white/10 focus:border-cyan-500"
                      } text-white focus:outline-none`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.idea && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <i className="fas fa-exclamation-circle text-xs" />
                        {errors.idea}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Status message */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className={`rounded-xl p-4 text-sm flex items-center gap-3 ${
                        status === "sending"
                          ? "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                          : status === "success"
                          ? "bg-green-500/20 border border-green-500/30 text-green-400"
                          : "bg-red-500/20 border border-red-500/30 text-red-400"
                      }`}
                    >
                      <i className={`fas ${
                        status === "sending" ? "fa-spinner fa-spin" : 
                        status === "success" ? "fa-check-circle" : "fa-exclamation-circle"
                      } text-lg`} />
                      <span>
                        {status === "sending"
                          ? "Sending your message..."
                          : status === "success"
                          ? "Message sent successfully! I'll get back to you soon. ✅"
                          : "Something went wrong. Please try again later. ❌"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                  type="submit"
                  className={`
                    relative overflow-hidden group
                    w-full py-4 rounded-xl font-semibold text-lg 
                    transition-all duration-300
                    ${status === "sending" 
                      ? "bg-gray-600 cursor-not-allowed opacity-60" 
                      : "bg-linear-to-r from-cyan-500 to-blue-600 hover:shadow-2xl hover:shadow-cyan-500/30"
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" />
                        Send Message
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  
                  {/* Button Hover Effect */}
                  {status !== "sending" && (
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Bottom Element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
}