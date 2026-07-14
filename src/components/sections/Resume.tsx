import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-slate-900/10">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-4 md:p-6 rounded-3xl border border-white/5 bg-slate-900/20 overflow-hidden shadow-2xl relative"
          >
            {/* Top Toolbar actions */}
            <div className="w-full flex items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider">RESUME_PREVIEW.PDF</span>
              
              <div className="flex items-center gap-3">
                <motion.a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-full text-white transition-colors flex items-center justify-center"
                  aria-label="View Full Screen"
                >
                  <ExternalLink size={18} />
                </motion.a>
                
                <motion.a 
                  href="/resume.pdf" 
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-extrabold rounded-full shadow-[0_4px_15px_rgba(139,92,246,0.3)] flex items-center gap-2 text-xs md:text-sm select-none"
                >
                  Download <Download size={16} />
                </motion.a>
              </div>
            </div>

            <div className="w-full h-[550px] md:h-[750px] bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative">
              <iframe 
                src="/resume.pdf" 
                title="Resume Preview"
                className="w-full h-full border-none rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
