import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Code, GitBranch, Briefcase } from 'lucide-react';

interface CounterProps {
  value: number;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  delay: number;
}

const Counter: React.FC<CounterProps> = ({ value, label, icon: Icon, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        delay: delay,
        ease: "easeOut",
        onUpdate(latest) {
          setCount(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, delay]);

  return (
    <div 
      ref={ref} 
      className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group border border-white/5 bg-slate-900/40"
    >
      {/* Dynamic ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="p-3 bg-white/5 rounded-full text-cyan-400 group-hover:text-pink-400 group-hover:bg-white/10 transition-all duration-300">
        <Icon size={24} />
      </div>
      <div className="text-4xl font-black text-white select-none tracking-tight">
        {count}
      </div>
      <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
        {label}
      </div>
    </div>
  );
};

export default function About() {
  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-[-150px] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Left: Holographic Image Frame */}
          <motion.div 
            variants={imageContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="relative w-80 h-96 group cursor-default select-none">
              {/* Pulsating backdrop glow */}
              <div className="absolute inset-[-4px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl transform rotate-3 group-hover:rotate-6 opacity-60 blur-md group-hover:opacity-80 transition-all duration-500"></div>
              
              {/* Glass Frame */}
              <div className="absolute inset-0 glass-card rounded-3xl border border-white/10 overflow-hidden z-10 p-2.5">
                <div className="w-full h-full bg-slate-950 rounded-2xl overflow-hidden relative">
                  <img 
                    src="/profile.jpg" 
                    alt="Karur Gouri Sankar Reddy" 
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-20 opacity-30"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Technical Biography & Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-white leading-tight">
              AI Driven Frontend Developer & <br />
              <span className="text-cyan-400">Workflow Automation Developer</span>
            </h3>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-medium">
              Computer Science undergraduate driven by a passion for software engineering and artificial intelligence. Experienced in developing AI-powered and full-stack web applications, with a focus on writing clean, efficient, and scalable code. Always eager to learn emerging technologies and build solutions that create meaningful impact.
            </p>

            {/* High-Contrast Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Counter value={4} label="Projects Completed" icon={Briefcase} delay={0.1} />
              <Counter value={2} label="Deployed Projects" icon={Code} delay={0.2} />
              <Counter value={4} label="GitHub Repos" icon={GitBranch} delay={0.3} />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
