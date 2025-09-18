import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      const cursorType = target.getAttribute('data-cursor');
      const cursorTextAttr = target.getAttribute('data-cursor-text');
      
      if (cursorType) {
        setCursorVariant(cursorType);
        setIsHovering(true);
      }
      
      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
      }
      
      // Check for interactive elements
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('magnetic-button')) {
        setCursorVariant('pointer');
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      const cursorType = target.getAttribute('data-cursor');
      
      if (cursorType || target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('magnetic-button')) {
        setCursorVariant('default');
        setIsHovering(false);
        setCursorText('');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor], .magnetic-button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(120, 119, 198, 0.8)',
      mixBlendMode: 'difference',
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(255, 119, 198, 0.8)',
      mixBlendMode: 'difference',
    },
    text: {
      scale: 0.5,
      backgroundColor: 'rgba(120, 219, 255, 0.8)',
      mixBlendMode: 'difference',
    },
    view: {
      scale: 2,
      backgroundColor: 'transparent',
      border: '2px solid rgba(120, 119, 198, 0.8)',
    },
    hidden: {
      scale: 0,
      opacity: 0,
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
    }
  };

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`custom-cursor ${cursorVariant} ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {/* Inner dot */}
        <motion.div 
          className="cursor-dot"
          animate={{
            scale: isClicking ? 0.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
          }}
        />
        
        {/* Cursor text */}
        {cursorText && (
          <motion.div
            className="cursor-text"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {cursorText}
          </motion.div>
        )}
        
        {/* Magnetic field visualization */}
        <motion.div 
          className="cursor-field"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        />
      </motion.div>
      
      {/* Trail effect */}
      <motion.div
        className="cursor-trail"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0.8 : 0.5,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8
        }}
      />
    </>
  );
};

export default CustomCursor;
