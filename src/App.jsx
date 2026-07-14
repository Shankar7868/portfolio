import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Global Layout Components
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import Loader from './components/layout/Loader';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';

import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';




function App() {
  // Theme setup - default to dark
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen animated-gradient-bg no-scrollbar">
      <CustomCursor />
      <Loader />
      <Navbar />

      <main className="relative z-10 w-full">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />

          <Resume />
          <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
