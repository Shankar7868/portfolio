import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  align: 'left' | 'right';
}

const educationData: EducationItem[] = [
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "SASTRA Deemed to be University",
    duration: "2023 - 2027",
    score: "CGPA: 9.28",
    align: "left"
  },
  {
    degree: "Class XII (Intermediate)",
    institution: "Sri Chaitanya Junior College",
    duration: "2023",
    score: "97.6%",
    align: "right"
  },
  {
    degree: "Class X (SSC)",
    institution: "Montessori Elite School",
    duration: "2021",
    score: "99.8%",
    align: "left"
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Animate the height of the timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div ref={containerRef} className="max-w-4xl mx-auto relative min-h-[600px]">
          {/* Static Background Line */}
          <div className="absolute left-4 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-1 bg-white/5 rounded-full"></div>
          
          {/* Animated Glowing Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 md:-ml-0.5 top-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)] origin-top z-10"
          ></motion.div>

          {educationData.map((edu, idx) => {
            const isLeft = edu.align === 'left';
            return (
              <div 
                key={idx}
                className={`mb-16 flex justify-between items-center w-full relative ${
                  isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Spacer column */}
                <div className="hidden md:block md:w-5/12"></div>
                
                {/* Timeline Node Point */}
                <motion.div 
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 100, delay: idx * 0.15 }}
                  className="absolute left-4 md:left-1/2 -translate-x-[11px] md:-translate-x-1/2 w-6 h-6 rounded-full bg-slate-950 border-4 border-cyan-400 z-20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </motion.div>

                {/* Content Card with Animation */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 90, delay: idx * 0.1 }}
                  className="w-full pl-12 md:pl-0 md:w-5/12"
                >
                  <div className="glass-card p-7 rounded-3xl border border-white/5 bg-slate-900/30 group hover:border-cyan-400/40 relative">
                    {/* Corner accent glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-tr-3xl pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-3 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300">
                      <GraduationCap size={22} />
                      <span className="font-extrabold text-sm tracking-widest uppercase font-mono">{edu.duration}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-300">
                      {edu.degree}
                    </h3>
                    
                    <h4 className="text-base text-slate-400 font-semibold mb-6">
                      {edu.institution}
                    </h4>
                    
                    <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-400/10 text-cyan-400 font-extrabold text-xs tracking-wider border border-cyan-400/20 select-none">
                      {edu.score}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
