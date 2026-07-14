import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  'Home', 'About', 'Education', 'Skills', 'Projects', 
  'Resume', 'Contact'
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Focus on middle area of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = navItems.find(
            (item) => item.toLowerCase() === id.toLowerCase()
          );
          if (matchedItem) {
            setActiveSection(matchedItem);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const targetId = id.toLowerCase();
    
    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection(id);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      setActiveSection(id);
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 80; // Offset by header height

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
          isScrolled ? "top-4" : "top-0"
        )}
      >
        <div 
          className={cn(
            "w-full transition-all duration-300 flex items-center justify-between pointer-events-auto",
            isScrolled 
              ? "max-w-5xl mx-4 px-6 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "container mx-auto px-6 py-6 bg-transparent"
          )}
        >
          {/* Logo */}
          <div 
            className="text-2xl font-black tracking-tighter cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 select-none hover:opacity-80 transition-opacity" 
            onClick={() => scrollTo('Home')}
          >
            KGSR<span className="text-pink-500 font-extrabold">.</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item, index) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full select-none",
                    isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  )}
                >
                  {/* Floating active background */}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover background */}
                  {hoveredIndex === index && !isActive && (
                    <motion.span
                      layoutId="hover-indicator"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 p-6 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={cn(
                  "py-3.5 text-center px-4 rounded-2xl text-base font-semibold border transition-all duration-300",
                  activeSection === item 
                    ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-white shadow-lg" 
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
