import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';

export default function WorkspaceZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the 250vh zoom container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale of the screen content inside the monitor
  // Start at 0.58 and zoom into 1.0 (covering the screen)
  const screenScale = useTransform(scrollYProgress, [0, 0.85], [0.58, 1.0], { clamp: true });
  
  // Border radius of the screen content
  // Start with rounded corners inside the monitor, and flatten out at full screen
  const screenBorderRadius = useTransform(scrollYProgress, [0, 0.85], ["16px", "0px"], { clamp: true });

  // Scale of the monitor bezel and stand
  // Scales up proportionally: 1.0 / 0.58 = 1.724
  const monitorScale = useTransform(scrollYProgress, [0, 0.85], [1.0, 1.724], { clamp: true });
  
  // Monitor bezel and stand opacity: fades out at the very end of the zoom
  const monitorOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0], { clamp: true });

  // Desk and surrounding office items scale and translation
  const deskScale = useTransform(scrollYProgress, [0, 0.85], [1.0, 2.2], { clamp: true });
  const deskOpacity = useTransform(scrollYProgress, [0.5, 0.82], [1, 0], { clamp: true });

  // Desk elements translations (move outwards and downwards)
  const keyboardY = useTransform(scrollYProgress, [0, 0.85], [0, 250], { clamp: true });
  const mouseX = useTransform(scrollYProgress, [0, 0.85], [0, 150], { clamp: true });
  const mouseY = useTransform(scrollYProgress, [0, 0.85], [0, 250], { clamp: true });
  const coffeeX = useTransform(scrollYProgress, [0, 0.85], [0, -150], { clamp: true });
  const coffeeY = useTransform(scrollYProgress, [0, 0.85], [0, 250], { clamp: true });
  const plantX = useTransform(scrollYProgress, [0, 0.85], [0, 200], { clamp: true });
  const plantY = useTransform(scrollYProgress, [0, 0.85], [0, 250], { clamp: true });

  // Background wall elements scale and opacity
  const wallScale = useTransform(scrollYProgress, [0, 0.85], [1.0, 1.4], { clamp: true });
  const wallOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0.9, 0], { clamp: true });

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-[250vh] bg-[#030712]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-20">
        
        {/* Futuristic Grid Wall Background */}
        <motion.div 
          style={{ scale: wallScale, opacity: wallOpacity }}
          className="absolute inset-0 bg-[#030712] pointer-events-none -z-30"
        >
          {/* Neon Radial Lights */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[110px]" />
          
          {/* Wall Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
        </motion.div>

        {/* ================= MONITOR BEZEL & STAND (Zooming Out) ================= */}
        <motion.div
          style={{
            scale: monitorScale,
            opacity: monitorOpacity,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center animate-workspace-fade"
        >
          {/* Screen Border & Bezel */}
          <div 
            className="w-[60vw] h-[60vh] border-[14px] border-slate-800 rounded-t-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_4px_10px_rgba(255,255,255,0.05)] bg-slate-900 relative flex flex-col items-center justify-between"
            style={{
              boxShadow: "0 25px 60px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.1), 0 0 40px rgba(139,92,246,0.05)"
            }}
          >
            {/* Webcam / Sensor dot */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-2.5 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-black border border-slate-700" />
              <div className="w-1 h-1 rounded-full bg-green-500/80 animate-pulse" />
            </div>

            {/* Empty center where the actual screen content sits */}
            <div className="w-full h-full rounded-t-xl overflow-hidden bg-transparent" />

            {/* Aluminum Chin at bottom */}
            <div className="w-[calc(60vw+28px)] h-11 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-b-3xl border-t border-slate-600/30 flex items-center justify-center relative -bottom-[14px] left-[0px]">
              {/* Glowing power LED or brand logo */}
              <div className="w-6 h-1.5 rounded-full bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
            </div>
          </div>

          {/* Sleek Aluminum Monitor Stand */}
          <div className="w-20 h-28 bg-gradient-to-b from-slate-700 to-slate-800 border-x border-slate-600/30 -z-10 shadow-lg relative -top-3">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-900 rounded-full shadow" />
          </div>
        </motion.div>


        {/* ================= ACTUAL SCREEN CONTENT (Zooming In) ================= */}
        <motion.div
          style={{
            scale: screenScale,
            borderRadius: screenBorderRadius,
            transformOrigin: "center center",
          }}
          className="absolute top-0 left-0 w-screen h-screen z-0 overflow-hidden"
        >
          {/* Render the full portfolio Hero section inside */}
          <div className="w-full h-full overflow-hidden select-text pointer-events-auto">
            <Hero />
          </div>
          
          {/* Glossy Screen Reflection Overlay (fades out as we zoom) */}
          <motion.div 
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0], { clamp: true })
            }}
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none mix-blend-overlay"
          />
        </motion.div>


        {/* ================= WORKSPACE DESK & ITEMS ================= */}
        <motion.div
          style={{
            scale: deskScale,
            opacity: deskOpacity,
          }}
          className="absolute bottom-0 left-0 right-0 h-[20vh] z-20 pointer-events-none origin-bottom"
        >
          {/* Wood Grain Desk Surface */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900 to-[#1e1c18] border-t border-zinc-700/40 shadow-[0_-15px_30px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:10px_100%] opacity-20" />
          </div>

          {/* Premium Leather Desk Pad */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72vw] h-[16vh] bg-[#0c101a]/95 border border-white/5 rounded-t-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
            
            {/* Keyboard Mockup (Moves down) */}
            <motion.div 
              style={{ y: keyboardY }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[30vw] h-[6vh] bg-slate-950 rounded-xl border border-slate-800 p-1 flex flex-col justify-between gap-1 shadow-2xl"
            >
              {/* Row representation in keys */}
              <div className="flex gap-1 h-3">
                <div className="flex-1 bg-zinc-800 rounded-sm border-b border-zinc-700/50 animate-pulse" />
                <div className="flex-1 bg-zinc-800 rounded-sm border-b border-zinc-700/50" />
                <div className="flex-1 bg-zinc-800 rounded-sm border-b border-zinc-700/50" />
                <div className="flex-1 bg-zinc-800 rounded-sm border-b border-zinc-700/50 font-sans text-[6px] text-zinc-500 flex items-center justify-center">ESC</div>
                <div className="w-[12%] bg-purple-700/50 rounded-sm border-b border-purple-600/50" />
              </div>
              <div className="flex gap-1 h-3">
                <div className="w-[8%] bg-zinc-800 rounded-sm" />
                <div className="flex-1 bg-zinc-900/80 rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-cyan-400/20" />
                <div className="flex-1 bg-zinc-900/80 rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                <div className="flex-1 bg-zinc-900/80 rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                <div className="w-[10%] bg-zinc-800 rounded-sm" />
              </div>
              <div className="flex gap-1 h-3">
                <div className="w-[12%] bg-zinc-800 rounded-sm" />
                <div className="w-[50%] bg-zinc-900 rounded-sm border border-white/5" />
                <div className="flex-1 bg-zinc-800 rounded-sm" />
                <div className="w-[12%] bg-purple-700/50 rounded-sm" />
              </div>
            </motion.div>

            {/* Glowing RGB Mouse (Moves right and down) */}
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              className="absolute bottom-4 right-[8vw] w-[3.2vw] h-[6vh] bg-zinc-900 border border-zinc-800 rounded-full shadow-lg flex flex-col items-center pt-2 relative overflow-hidden"
            >
              {/* Scroll Wheel */}
              <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_4px_#22d3ee]" />
              {/* Subtle center divider */}
              <div className="w-[0.5px] h-3 bg-zinc-800 mt-1" />
              {/* RGB Underglow strip */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
            </motion.div>

            {/* Steaming Coffee Mug (Moves left and down) */}
            <motion.div
              style={{ x: coffeeX, y: coffeeY }}
              className="absolute bottom-5 left-[8vw] w-[3.8vw] h-[5.5vh] bg-rose-800 rounded-lg shadow-md border border-rose-700 flex items-center justify-center animate-workspace-fade"
            >
              {/* Cup Handle */}
              <div className="absolute -left-2.5 top-1.5 w-3 h-5 border-l-4 border-y-4 border-rose-800 rounded-l-md" />
              
              {/* Black coffee content */}
              <div className="w-[85%] h-[85%] rounded-md bg-[#2d120a] border border-[#4e2213] flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full opacity-35 bg-[radial-gradient(circle_at_30%_20%,_#fff_0%,_transparent_50%)]" />
              </div>

              {/* Rising Steam CSS Animation */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 h-6">
                <div className="w-[1.5px] bg-white/20 rounded-full animate-steam-wave" style={{ animationDelay: '0.1s' }} />
                <div className="w-[1.5px] bg-white/30 rounded-full animate-steam-wave animate-duration-1000" style={{ animationDelay: '0.4s' }} />
                <div className="w-[1.5px] bg-white/15 rounded-full animate-steam-wave" style={{ animationDelay: '0.7s' }} />
              </div>
            </motion.div>

            {/* Modern Succulent Desk Plant (Moves right and down) */}
            <motion.div
              style={{ x: plantX, y: plantY }}
              className="absolute bottom-5 right-[14vw] flex flex-col items-center"
            >
              {/* Succulent Leaves */}
              <div className="relative w-9 h-6 -bottom-1 z-10 flex justify-center">
                <div className="absolute w-4 h-4 bg-emerald-600 border border-emerald-500 rounded-full rotate-45 transform origin-center shadow-sm" />
                <div className="absolute w-4 h-4 bg-teal-600 border border-teal-500 rounded-full -rotate-12 transform origin-center -left-1" />
                <div className="absolute w-4 h-4 bg-green-600 border border-green-500 rounded-full rotate-12 transform origin-center -right-1" />
                <div className="absolute w-2 h-2 bg-emerald-500 border border-emerald-400 rounded-full top-1" />
              </div>
              {/* Terracotta/Grey Pot */}
              <div className="w-[3vw] h-[3.8vh] bg-stone-800 border border-stone-700 rounded-b-lg shadow-inner flex flex-col justify-end" />
            </motion.div>
            
          </div>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator helper on bottom center (fades out early) */}
      <motion.div 
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0], { clamp: true })
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400/80">Scroll to Enter</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-2 bg-cyan-400 rounded-full shadow-[0_0_4px_#22d3ee]" 
          />
        </div>
      </motion.div>
    </div>
  );
}
