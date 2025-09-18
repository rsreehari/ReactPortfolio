import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const FloatingElements = lazy(() => import('./components/FloatingElements'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ParticleField = lazy(() => import('./components/ParticleField'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const loadingVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="loading-screen"
            variants={loadingVariants}
            initial="initial"
            exit="exit"
          >
            <motion.div 
              className="loading-content"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="loading-logo">RS</div>
              <div className="loading-text">Crafting Digital Experiences</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Background Effects */}
            <Suspense fallback={null}>
              <ParticleField 
                particleCount={isMobile ? 30 : 60}
                interactive={!isMobile}
                mouseRadius={120}
                connectionDistance={100}
                particleSpeed={0.3}
              />
              <FloatingElements />
            </Suspense>
            
            {/* Custom Cursor - Only on desktop */}
            {!isMobile && (
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>
            )}
            
            {/* Main Content */}
            <Header />
            <main>
              <Hero />
              <Suspense fallback={<div style={{height: 200}} />}> 
                <About />
                <Skills />
                <Projects />
                <Contact />
              </Suspense>
            </main>
            
            {/* Scroll to top button */}
            <motion.button
              className="scroll-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor="pointer"
              data-cursor-text="Top"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 19V5M5 12L12 5L19 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
