import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const elements = container.querySelectorAll('.floating-element');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - innerWidth / 2) * speed;
        const y = (clientY - innerHeight / 2) * speed;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="floating-elements-container">
      <motion.div
        className="floating-element element-1"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0s' }}
      >
        <div className="floating-shape circle"></div>
      </motion.div>
      
      <motion.div
        className="floating-element element-2"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <div className="floating-shape triangle"></div>
      </motion.div>
      
      <motion.div
        className="floating-element element-3"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
      >
        <div className="floating-shape square"></div>
      </motion.div>
      
      <motion.div
        className="floating-element element-4"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '6s' }}
      >
        <div className="floating-shape hexagon"></div>
      </motion.div>
    </div>
  );
};

export default FloatingElements;
