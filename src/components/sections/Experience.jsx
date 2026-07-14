import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    role: "AI Developer / Intern (Placeholder)",
    company: "Company Name",
    duration: "2024 - Present",
    description: "Developing intelligent workflow automation systems using n8n and Gemini API. Building full-stack React applications and optimizing deep learning pipelines."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional <span className="text-gradient">Experience</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-cyan to-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-0">
            {experienceData.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="mb-12 relative pl-8 md:pl-0 md:flex md:justify-between items-center w-full"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] top-0 md:top-auto w-4 h-4 rounded-full bg-electric-cyan shadow-[0_0_10px_#06b6d4] z-10 border-2 border-navy-900"></div>

                {/* Content */}
                <div className="md:w-[45%] glass-panel p-6 rounded-xl border border-white/10 hover:border-electric-cyan/50 transition-colors group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-2 text-electric-cyan mb-2">
                    <Briefcase size={18} />
                    <span className="font-semibold">{exp.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-lg text-primary mb-4">{exp.company}</h4>
                  <p className="text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                
                {/* Spacer for alternate timeline alignment in desktop */}
                <div className="hidden md:block md:w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
