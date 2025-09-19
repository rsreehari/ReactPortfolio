import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header offset
      const headerEl = document.querySelector('.header');
      const headerOffset = headerEl ? headerEl.offsetHeight + 12 : 72;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, elementTop - headerOffset), behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-gradient">R Sreehari</span>
        </motion.div>

        <nav className="nav">
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('about')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('skills')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skills
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
          {/* Performance Mode Toggle */}
          <motion.button
            className="nav-link perf-toggle"
            onClick={() => window.dispatchEvent(new Event('togglePerformanceMode'))}
            title="Toggle Performance Mode"
            aria-label="Toggle Performance Mode"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
