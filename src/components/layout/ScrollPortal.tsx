import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollPortalProps {
  children: React.ReactNode[];
}

export default function ScrollPortal({ children }: ScrollPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire scroll height container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const N = children.length;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      style={{ height: `${N * 100}vh` }}
    >
      {/* Sticky Full-Screen Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-background z-10">
        {children.map((child, index) => {
          // Calculate input range boundary keys for this specific section
          const start = (index - 1) / N;
          const active = index / N;
          const exitFade = active + 0.22 / N; // Accelerate fade out to eliminate overlapping text
          const end = (index + 1) / N;
          
          // Set strictly increasing boundaries
          const inputRange: number[] = [];
          const scaleRange: number[] = [];
          const opacityRange: number[] = [];
          const zIndexRange: number[] = [];

          if (index === 0) {
            // First Section: starts active, zooms out
            inputRange.push(0, 0.22 / N, 1 / N);
            scaleRange.push(1.0, 2.0, 6.0);
            opacityRange.push(1.0, 0.0, 0.0);
            zIndexRange.push(20, 10, 10);
          } else if (index === N - 1) {
            // Last Section: zooms in, remains active
            inputRange.push((N - 2) / N, (N - 1) / N, 1.0);
            scaleRange.push(0.4, 1.0, 1.0);
            opacityRange.push(0.0, 1.0, 1.0);
            zIndexRange.push(10, 20, 20);
          } else {
            // Middle Sections: zooms in, active, zooms out
            inputRange.push(start, active, exitFade, end);
            scaleRange.push(0.4, 1.0, 2.0, 6.0);
            opacityRange.push(0.0, 1.0, 0.0, 0.0);
            zIndexRange.push(10, 20, 10, 10);
          }

          // Framer Motion scroll transform mappings
          const scale = useTransform(scrollYProgress, inputRange, scaleRange);
          const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
          const zIndex = useTransform(scrollYProgress, inputRange, zIndexRange);

          // Enable pointer interactions only when the section is the closest active viewport
          const pointerEvents = useTransform(scrollYProgress, (progress) => {
            const distance = Math.abs(progress - active);
            if (distance < 0.5 / N) {
              return "auto";
            }
            return "none";
          });

          // Optimize rendering and eliminate visual overlapping by hiding off-screen elements
          const visibility = useTransform(scrollYProgress, (progress) => {
            const distance = Math.abs(progress - active);
            if (distance < 0.95 / N) {
              return "visible";
            }
            return "hidden";
          });

          return (
            <motion.div
              key={index}
              style={{
                scale,
                opacity,
                zIndex,
                pointerEvents,
                visibility,
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                transformOrigin: "center center",
              }}
              className="will-change-transform transform-gpu flex flex-col items-center justify-center overflow-y-auto no-scrollbar"
            >
              <div className="w-full h-full min-h-screen flex flex-col justify-center py-12">
                {child}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Snap Placeholders for Native Browser CSS Snapping */}
      <div className="absolute inset-0 pointer-events-none flex flex-col z-0">
        {Array.from({ length: N }).map((_, i) => (
          <div 
            key={i} 
            className="w-full h-screen" 
            style={{ scrollSnapAlign: "start" }} 
          />
        ))}
      </div>
    </div>
  );
}
