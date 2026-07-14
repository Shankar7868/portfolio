import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-400 opacity-60"></div>
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 select-none">
              KGSR.
            </h2>
            <p className="text-slate-400 font-medium max-w-sm text-sm">
              Machine Learning & Automation Developer. Building intelligent systems for the modern web.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a 
              href="https://github.com/Shankar7868" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-colors shadow-lg"
            >
              <FaGithub size={20} />
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com/in/karurgourisankarreddy" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-500 hover:border-purple-400 transition-colors shadow-lg"
            >
              <FaLinkedin size={20} />
            </motion.a>
            
            <motion.a 
              href="mailto:karurgourisankarreddy@gmail.com" 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:border-pink-400 transition-colors shadow-lg"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Scroll to Top */}
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all group shadow-md"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Footer Sub-bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Karur Gouri Sankar Reddy. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Secure & Optimized Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
