import React from 'react';
import { useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Loader() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-navy-900"
    >
      <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-cyan to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>
      <div className="text-electric-cyan font-mono text-xl tracking-widest font-bold flex items-center gap-2">
        INITIALIZING <span className="text-white">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
}
