import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import Typewriter from 'typewriter-effect';
import { ArrowRight, Download, Mail } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const targetId = id.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="hero-content" className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-16 overflow-hidden container mx-auto px-6 gap-6 text-center">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Main Content */}
      <div className="w-full z-10 flex flex-col items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl flex flex-col items-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-lg md:text-xl font-bold tracking-widest text-cyan-400 uppercase mb-4"
          >
            Hi, I'm
          </motion.h2>
          
          <motion.h1 
            variants={itemVariants}
            className="font-black text-white mb-6 leading-[1.05] tracking-tighter" 
            style={{ fontSize: 'clamp(2.5rem, 5vw + 1.2rem, 5rem)' }}
          >
            Karur Gouri <br />
            <span className="text-gradient text-glow">Sankar Reddy</span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="text-lg md:text-2xl font-bold text-slate-300 h-16 mb-8 select-none font-mono"
          >
            <Typewriter
              options={{
                strings: [
                  'Machine Learning Enthusiast',
                  'Workflow Automation Developer',
                  'Deep Learning Developer'
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
                wrapperClassName: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-extrabold',
                cursorClassName: 'text-pink-500 font-extrabold text-glow'
              }}
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-6"
          >
            {/* View Projects CTA */}
            <motion.button 
              onClick={() => scrollTo('Projects')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-extrabold tracking-wide hover:from-white hover:to-white transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                View Projects 
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </span>
            </motion.button>
            
            {/* Download Resume CTA */}
            <motion.button 
              onClick={() => scrollTo('Resume')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-btn px-7 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold tracking-wide text-white flex items-center gap-2"
            >
              <span className="text-sm md:text-base">Download Resume</span>
              <Download size={18} />
            </motion.button>
            
            {/* Contact CTA */}
            <motion.button 
              onClick={() => scrollTo('Contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white hover:border-white/20 shadow-md"
              aria-label="Contact Me"
            >
              <Mail size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>


      
    </section>
  );
}
