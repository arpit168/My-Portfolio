// Importing React's useState hook for managing component state
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("project");

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

    if (formData.service && formData.service !== "other" && !formData.budget.trim())
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
      
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const services = [
    { id: "web", label: "Web Dev", icon: "🌐", color: "from-blue-500 to-cyan-500" },
    { id: "mobile", label: "Mobile", icon: "📱", color: "from-purple-500 to-pink-500" },
    { id: "design", label: "UI/UX", icon: "🎨", color: "from-orange-500 to-red-500" },
    { id: "brand", label: "Branding", icon: "✨", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section
      id="contact" 
      className="w-full min-h-screen relative bg-[#0a0a0a] overflow-hidden py-20 px-4 md:px-20 flex flex-col items-center"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <ParticlesBackground />
        {/* Grid Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-linear(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Header Section - Split Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Bold Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="sticky top-24">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <span className="text-8xl">👋</span>
              </motion.div>
              
              <h2 className="text-7xl md:text-8xl font-black leading-none">
                <span className="text-white">LET'S</span>
                <br />
                <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
                  CONNECT
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg mt-8 max-w-md">
                Got a wild idea? A project that needs some magic? 
                <span className="text-white font-bold"> I'm all ears.</span>
              </p>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { number: "24h", label: "Response Time" },
                  { number: "100+", label: "Projects" },
                  { number: "50+", label: "Clients" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Image Frame */}
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-2xl"></div>
              
              <div className="relative bg-linear-to-br from-gray-900 to-black p-1 rounded-3xl">
                <div className="bg-black rounded-3xl overflow-hidden">
                  <motion.img
                    src={Astra}
                    alt="Contact"
                    className="w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full shadow-xl"
              >
                ⚡ Available for work
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Form Section - Card Design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Background Card */}
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-linear-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
            
            {/* Tabs */}
            <div className="flex gap-4 mb-10 border-b border-white/10 pb-4">
              {[
                { id: "project", label: "New Project", icon: "🚀" },
                { id: "collab", label: "Collaboration", icon: "🤝" },
                { id: "other", label: "Just Say Hi", icon: "👋" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-yellow-400 to-orange-500 text-black"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    YOUR NAME <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-orange-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    EMAIL <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@domain.com"
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-orange-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Service Selection - Creative Card Style */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-400">
                  WHAT DO YOU NEED? <span className="text-orange-500">*</span>
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({...formData, service: service.label})}
                      className={`relative p-6 rounded-2xl border-2 transition-all ${
                        formData.service === service.label
                          ? `bg-linear-to-r ${service.color} border-transparent`
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <div className={`text-sm font-medium ${
                        formData.service === service.label ? 'text-white' : 'text-gray-400'
                      }`}>
                        {service.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                {errors.service && (
                  <p className="text-orange-500 text-xs">{errors.service}</p>
                )}
              </div>

              {/* Budget Slider Style */}
              {formData.service && formData.service !== "other" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-400">
                    BUDGET RANGE (USD) <span className="text-orange-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter your budget"
                      className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-all"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  </div>
                  
                  {errors.budget && (
                    <p className="text-orange-500 text-xs">{errors.budget}</p>
                  )}
                </motion.div>
              )}

              {/* Idea Field - Big Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  YOUR IDEA <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="idea"
                  rows={5}
                  value={formData.idea}
                  onChange={handleChange}
                  placeholder="Tell me everything... The more details, the better!"
                  className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-all resize-none"
                />
                {errors.idea && (
                  <p className="text-orange-500 text-xs">{errors.idea}</p>
                )}
              </div>

              {/* Character Counter */}
              <div className="text-right text-xs text-gray-600">
                {formData.idea.length}/500 characters
              </div>

              {/* Submit Area */}
              <div className="flex flex-col md:flex-row items-center gap-6 pt-6">
                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={status === "sending"}
                  type="submit"
                  className="relative group w-full md:w-auto"
                >
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Button Content */}
                  <div className="relative px-12 py-5 text-black font-bold text-lg rounded-2xl flex items-center gap-3">
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </div>
                </motion.button>

                {/* Status Message */}
                <AnimatePresence>
                  {status && status !== "sending" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`px-6 py-3 rounded-2xl ${
                        status === "success" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {status === "success" ? "✅ Message sent!" : "❌ Try again"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                <span className="text-sm text-gray-600">CONNECT WITH ME:</span>
                {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}