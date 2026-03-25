import { FaJava, FaReact } from 'react-icons/fa';
import { SiNodedotjs, SiJavascript, SiTailwindcss, SiFastapi, SiMongodb, SiCss } from 'react-icons/si';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiCss />, name: "CSS" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiMongodb />, name: "MongoDB" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);

    window.addEventListener('wheel', onWheel);
    return () => window.removeEventListener('wheel', onWheel);
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-16 flex flex-col items-center justify-center bg-black text-text overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-2 text-primary"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mb-10 text-secondary text-base sm:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-12"
          style={{ x, whiteSpace: 'nowrap' }}
        >
          {repeated.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center min-w-[120px] p-5 rounded-2xl bg-secondary border border-primary/20 hover:bg-secondary-hover transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.15 }}
            >
              <div className="text-5xl text-primary mb-3">
                {s.icon}
              </div>
              <p className="text-sm text-text/80">{s.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
