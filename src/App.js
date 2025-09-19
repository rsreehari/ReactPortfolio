import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import AuroraBackground from './components/AuroraBackground';
import './App.css';

// Lazy load components with error handling
const About = lazy(() => 
  import('./components/About').catch(err => {
    console.error('Failed to load About component:', err);
    return { default: () => <div>Error loading About section</div> };
  })
);
const Skills = lazy(() => 
  import('./components/Skills').catch(err => {
    console.error('Failed to load Skills component:', err);
    return { default: () => <div>Error loading Skills section</div> };
  })
);
const Projects = lazy(() => 
  import('./components/Projects').catch(err => {
    console.error('Failed to load Projects component:', err);
    return { default: () => <div>Error loading Projects section</div> };
  })
);
const Contact = lazy(() => 
  import('./components/Contact').catch(err => {
    console.error('Failed to load Contact component:', err);
    return { default: () => <div>Error loading Contact section</div> };
  })
);
const FloatingElements = lazy(() => 
  import('./components/FloatingElements').catch(err => {
    console.error('Failed to load FloatingElements component:', err);
    return { default: () => null };
  })
);
const ParticleField = lazy(() => 
  import('./components/ParticleField').catch(err => {
    console.error('Failed to load ParticleField component:', err);
    return { default: () => null };
  })
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please refresh the page to try again.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback = ({ height = 200 }) => (
  <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div
      className="loading-spinner-small"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    // Check reduced motion preference
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    media.addEventListener?.('change', onChange);
    
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Decide on performance mode based on device, but respect stored setting
      const lowMem = (navigator.deviceMemory && navigator.deviceMemory <= 4);
      const lowCPU = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      const autoPerf = media.matches || lowMem || lowCPU || (window.innerWidth <= 768);
      const stored = localStorage.getItem('performanceMode');
      if (stored === 'true' || stored === 'false') {
        setPerformanceMode(stored === 'true');
      } else {
        setPerformanceMode(autoPerf);
      }
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      media.removeEventListener?.('change', onChange);
      clearTimeout(timer);
    };
  }, []);

  // Listen for performance mode toggle/set events
  useEffect(() => {
    const onToggle = () => {
      setPerformanceMode(prev => {
        const next = !prev;
        localStorage.setItem('performanceMode', String(next));
        return next;
      });
    };
    const onSet = (e) => {
      const next = Boolean(e.detail?.value);
      setPerformanceMode(next);
      localStorage.setItem('performanceMode', String(next));
    };
    window.addEventListener('togglePerformanceMode', onToggle);
    window.addEventListener('setPerformanceMode', onSet);
    return () => {
      window.removeEventListener('togglePerformanceMode', onToggle);
      window.removeEventListener('setPerformanceMode', onSet);
    };
  }, []);

  // Ensure default cursor is used globally
  useEffect(() => {
    const body = document.body;
    body.classList.remove('use-custom-cursor');
    return () => body.classList.remove('use-custom-cursor');
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
    <ErrorBoundary>
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
              <ErrorBoundary>
                <Suspense fallback={null}>
                  <AuroraBackground />
                  {!(prefersReducedMotion || performanceMode) && (
                    <>
                      <ParticleField 
                        particleCount={isMobile ? 16 : 32}
                        interactive={!isMobile}
                        mouseRadius={80}
                        connectionDistance={80}
                        particleSpeed={0.22}
                      />
                      <FloatingElements />
                    </>
                  )}
                </Suspense>
              </ErrorBoundary>
              
              {/* Main Content */}
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              
              <main>
                <ErrorBoundary>
                  <Hero externalReduced={prefersReducedMotion || performanceMode} />
                </ErrorBoundary>
                
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback height={400} />}> 
                    <About />
                  </Suspense>
                </ErrorBoundary>
                
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback height={400} />}> 
                    <Skills />
                  </Suspense>
                </ErrorBoundary>
                
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback height={400} />}> 
                    <Projects />
                  </Suspense>
                </ErrorBoundary>
                
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback height={400} />}> 
                    <Contact />
                  </Suspense>
                </ErrorBoundary>
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
                aria-label="Scroll to top"
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
    </ErrorBoundary>
  );
}

export default App;
