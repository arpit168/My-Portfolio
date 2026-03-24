import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiAward, FiChevronRight, FiStar, FiCompass } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose, hamburgerRef }) {
  // Get hamburger button position for animation origin
  const getOrigin = () => {
    if (typeof window === "undefined" || !hamburgerRef?.current) return "50% 50%";
    
    const rect = hamburgerRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
    const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
    
    return `${x}% ${y}%`;
  };

  const menuItems = [
    { name: "Home", icon: FiHome, color: "from-pink-500 to-rose-500", gradient: "from-pink-400 to-rose-400", description: "Welcome back", glow: "shadow-pink-500/30" },
    { name: "About", icon: FiUser, color: "from-purple-500 to-indigo-500", gradient: "from-purple-400 to-indigo-400", description: "Who I am", glow: "shadow-purple-500/30" },
    { name: "Skills", icon: FiCode, color: "from-blue-500 to-cyan-500", gradient: "from-blue-400 to-cyan-400", description: "What I do", glow: "shadow-blue-500/30" },
    { name: "Projects", icon: FiBriefcase, color: "from-emerald-500 to-teal-500", gradient: "from-emerald-400 to-teal-400", description: "My work", glow: "shadow-emerald-500/30" },
    { name: "Experience", icon: FiAward, color: "from-orange-500 to-amber-500", gradient: "from-orange-400 to-amber-400", description: "Journey so far", glow: "shadow-orange-500/30" },
    { name: "Contact", icon: FiMail, color: "from-red-500 to-pink-500", gradient: "from-red-400 to-pink-400", description: "Let's talk", glow: "shadow-red-500/30" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with enhanced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            initial={{ clipPath: `circle(0% at ${getOrigin()})` }}
            animate={{ clipPath: `circle(150% at ${getOrigin()})` }}
            exit={{ clipPath: `circle(0% at ${getOrigin()})` }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ background: "radial-gradient(circle at 30% 20%, #0a0a1a, #050510)" }}
          >
            {/* Animated Particles - Enhanced */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating orbs */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${i % 2 === 0 ? '#ec489a' : '#8b5cf6'}, transparent 70%)`,
                  }}
                  animate={{
                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                    y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
              
              {/* Star particles */}
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    y: [null, -50, null],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Close Button - Enhanced */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
              className="absolute top-6 right-6 z-50 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/30 hover:border-white/60 transition-all shadow-lg">
                  <FiX className="text-white text-xl" />
                </div>
              </div>
            </motion.button>

            {/* Menu Content */}
            <div className="w-full max-w-6xl mx-auto px-4 mt-16 mb-8 sm:px-6 lg:px-8">
              {/* Header with Glow Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 20 }}
                className="text-center mb-12 sm:mb-16"
              >
                <motion.div
                  animate={{ 
                    textShadow: ["0 0 0px rgba(236,72,153,0)", "0 0 20px rgba(236,72,153,0.5)", "0 0 0px rgba(236,72,153,0)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Explore
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-400 mt-4 text-sm sm:text-base"
                >
                  Choose your destination
                </motion.p>
              </motion.div>

              {/* Menu Items - Modern Grid with Hover Effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30, rotateY: -10 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ delay: 0.3 + index * 0.08, type: "spring", damping: 25 }}
                      className="relative group"
                    >
                      <a
                        href={`#${item.name.toLowerCase()}`}
                        onClick={onClose}
                        className="block relative"
                      >
                        {/* 3D Card Effect */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white/20 via-white/5 to-transparent group-hover:from-white/40 transition-all duration-500">
                          <div className="relative bg-[#0a0a1a]/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                            {/* Animated Gradient Background */}
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                            />
                            
                            {/* Glow Effect on Hover */}
                            <motion.div
                              className={`absolute -inset-1 bg-gradient-to-r ${item.color} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                            />
                            
                            {/* Content */}
                            <div className="relative flex items-center space-x-4">
                              {/* Icon with 3D Rotation */}
                              <motion.div
                                whileHover={{ rotateY: 360, scale: 1.1 }}
                                transition={{ duration: 0.6, type: "spring" }}
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-xl shrink-0`}
                              >
                                <div className="w-full h-full bg-[#0a0a1a] rounded-xl flex items-center justify-center backdrop-blur-sm">
                                  <Icon className="text-2xl sm:text-3xl text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              </motion.div>
                              
                              {/* Text content */}
                              <div className="flex-1 min-w-0">
                                <motion.h3 
                                  className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                                  whileHover={{ x: 5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.name}
                                </motion.h3>
                                <p className="text-sm text-gray-400 truncate">
                                  {item.description}
                                </p>
                              </div>

                              {/* Animated Arrow */}
                              <motion.div
                                initial={{ x: -5, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="hidden sm:block"
                              >
                                <FiChevronRight className={`text-2xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`} />
                              </motion.div>
                            </div>

                            {/* Progress bar animation on hover */}
                            <motion.div
                              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${item.color}`}
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {/* Mobile touch feedback */}
                        <div className="absolute inset-0 rounded-2xl sm:hidden">
                          <div className="w-full h-full active:bg-white/10 transition-colors" />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer with animated compass */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-12 sm:mt-16 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-3"
                >
                  <FiCompass className="text-gray-500 text-xl" />
                </motion.div>
                <p className="text-sm text-gray-500 font-mono">
                  {">"} NAVIGATE_WITH_CONFIDENCE {"<"}
                </p>
              </motion.div>
            </div>

            {/* Decorative corner elements - Animated */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-pink-500/40 rounded-tl-3xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -left-1 w-2 h-2 bg-pink-500 rounded-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute bottom-12 right-12 w-24 h-24 border-r-2 border-b-2 border-purple-500/40 rounded-br-3xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"
              />
            </motion.div>

            {/* Floating code particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {["{ }", "< />", "() =>", "const", "function", "import", "export", "return"].map((code, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/5 font-mono text-sm"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    y: [null, -100, null],
                    x: [null, Math.random() * 100 - 50, null],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  {code}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}