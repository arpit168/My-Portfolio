import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avator.png";
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaCode, 
  FaTerminal,
  FaBolt,
  FaCrown,
  FaRocket,
  FaShieldAlt,
  FaBrain
} from "react-icons/fa";
import { SiPython, SiReact, SiJavascript, SiTypescript, SiNodedotjs } from "react-icons/si";
import { VscDebug } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["⚡ Software Engineer", "🔥 Full Stack Developer", "💻 Code Architect", "🚀 Tech Innovator"],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Typing effect with glitch
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
        if (Math.random() > 0.9) setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 30 : 80);
    
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  // Matrix rain effect (simplified)
  const matrixChars = "10 01 11 00 101 010 110 001".split(" ");

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0">
        {/* Main grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.3
          }}
        />

        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-500/30 text-xs font-mono"
              style={{
                left: `${i * 5}%`,
                top: '-20%',
                writingMode: 'vertical-rl'
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            >
              {matrixChars.map((char, idx) => (
                <span key={idx} className="block">{char}</span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Glitch overlays */}
        <motion.div
          className="absolute inset-0 bg-cyan-500/10"
          animate={{
            opacity: glitchEffect ? [0, 0.3, 0] : 0,
            x: glitchEffect ? [-5, 5, -5, 0] : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute inset-0 bg-fuchsia-500/10"
          animate={{
            opacity: glitchEffect ? [0, 0.3, 0] : 0,
            x: glitchEffect ? [5, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { Icon: SiReact, top: '10%', left: '5%', color: '#61DAFB', delay: 0 },
          { Icon: SiPython, top: '20%', right: '10%', color: '#3776AB', delay: 1 },
          { Icon: SiJavascript, bottom: '15%', left: '8%', color: '#F7DF1E', delay: 2 },
          { Icon: SiTypescript, bottom: '25%', right: '15%', color: '#3178C6', delay: 1.5 },
          { Icon: SiNodedotjs, top: '40%', left: '12%', color: '#339933', delay: 0.5 },
        ].map(({ Icon, color, delay, ...position }, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-5xl"
            style={{ ...position, color: `${color}20` }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay,
              ease: "easeInOut"
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-cyan-500/30 backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-mono text-sm">STATUS: ONLINE</span>
              <FaTerminal className="text-cyan-400 ml-2" />
            </motion.div>

            {/* Code Comment */}
            <motion.div
              className="font-mono text-gray-500 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              &lt;!-- SYSTEM INITIALIZED --&gt;
            </motion.div>

            {/* Name with glitch effect */}
            <motion.h1
              className="relative text-5xl sm:text-6xl md:text-7xl font-black mb-4"
              animate={glitchEffect ? {
                x: [-5, 5, -5, 0],
                skewX: [0, 5, -5, 0],
              } : {}}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 text-cyan-500/50 blur-sm animate-pulse">
                  Arpit Gupta
                </span>
                <span className="absolute inset-0 text-fuchsia-500/50 blur-sm animate-pulse delay-75">
                  Arpit Gupta
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
                  Arpit Gupta
                </span>
              </span>
            </motion.h1>

            {/* Dynamic Role with Terminal Style */}
            <motion.div
              className="font-mono text-xl sm:text-2xl mb-6 p-4 bg-black/50 border border-cyan-500/30 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-cyan-400">$</span>{" "}
              <span className="text-green-400">./skills --display</span>
              <br />
              <span className="text-gray-400">{`>`}</span>{" "}
              <span className={glitchEffect ? 'glitch-text' : ''}>
                {roles[index].substring(0, subIndex)}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 text-cyan-400"
              >
                _
              </motion.span>
            </motion.div>

            {/* Description with Tech Stack */}
            <motion.p
              className="text-gray-300 max-w-lg mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-cyan-400">&lt;p&gt;</span><br />
              &nbsp;&nbsp;Building high-performance, scalable applications with 
              <span className="text-cyan-400"> enterprise-grade architecture</span> and 
              <span className="text-fuchsia-400"> cutting-edge technologies</span>.
              <br />
              <span className="text-cyan-400">&lt;/p&gt;</span>
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono border border-cyan-500/30 rounded-full text-cyan-400 bg-black/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, borderColor: '#00ffff', boxShadow: '0 0 15px #00ffff' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  &lt;{tech} /&gt;
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 rounded-lg font-mono text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 text-white">
                  <FaCode /> ./deploy --projects
                </span>
              </motion.a>
              
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 rounded-lg font-mono text-lg border border-cyan-500/30 hover:border-cyan-400 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2 text-cyan-400">
                  <FaTerminal /> ./connect --social
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { Icon: FaGithub, href: "#", color: "#fff" },
                { Icon: FaLinkedinIn, href: "#", color: "#0077B5" },
                { Icon: FaTwitter, href: "#", color: "#1DA1F2" },
                { Icon: VscDebug, href: "#", color: "#00ffff" },
              ].map(({ Icon, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative p-3 rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-sm group-hover:border-cyan-400 transition-all">
                    <Icon style={{ color }} className="w-5 h-5" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Avatar with Cyber Elements */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Rotating Cyber Rings */}
            <div className="relative w-[500px] h-[500px]">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                    style={{
                      top: '0%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-250px)`,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                  />
                ))}
              </motion.div>

              {/* Middle Ring */}
              <motion.div
                className="absolute inset-[50px] rounded-full border border-fuchsia-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Ring */}
              <motion.div
                className="absolute inset-[100px] rounded-full border border-blue-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar with Cyber Overlay */}
              <div className="absolute inset-[150px]">
                {/* Glitch effect overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-30 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Avatar */}
                <img
                  src={avatar}
                  alt="Arpit Gupta"
                  className="relative w-full h-full object-contain rounded-full border-2 border-cyan-500/50"
                />

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  initial={false}
                >
                  <motion.div
                    className="w-full h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                    animate={{ y: [-200, 400] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>

              {/* Floating Power Stats */}
              {[
                { icon: FaBolt, value: '99.9%', label: 'Uptime', top: '10%', right: '0' },
                { icon: FaShieldAlt, value: 'A+', label: 'Security', bottom: '10%', left: '0' },
                { icon: FaBrain, value: 'AI', label: 'Integrated', top: '40%', left: '-20px' },
                { icon: FaRocket, value: '10x', label: 'Speed', bottom: '40%', right: '-20px' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-black/80 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm"
                  style={{ top: stat.top, bottom: stat.bottom, left: stat.left, right: stat.right }}
                  whileHover={{ scale: 1.1, borderColor: '#00ffff' }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  <stat.icon className="text-cyan-400 text-xl mb-1" />
                  <div className="text-white font-bold text-sm">{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 bg-black/80 border-t border-cyan-500/30 backdrop-blur-sm"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">SYSTEM READY</span>
            <span className="text-gray-600">|</span>
            <span className="text-green-400">CPU: 23%</span>
            <span className="text-gray-600">|</span>
            <span className="text-blue-400">MEM: 1.2GB/8GB</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-fuchsia-400">v2.0.1</span>
            <span className="text-gray-600">|</span>
            <span className="text-cyan-400">PORTFOLIO_v2</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

export default Home;