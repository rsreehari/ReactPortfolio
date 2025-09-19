import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import './MagneticButton.css';

const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.25, 
  range = 80,
  springConfig = { stiffness: 120, damping: 20, mass: 0.15 },
  disabled = false,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  
  // Motion values for smooth magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Transform values for magnetic effect
  const magneticX = useTransform(springX, [-range, range], [-strength * range, strength * range]);
  const magneticY = useTransform(springY, [-range, range], [-strength * range, strength * range]);
  
  // Rotation based on mouse position for extra dynamism
  const rotateX = useTransform(springY, [-range, range], [5, -5]);
  const rotateY = useTransform(springX, [-range, range], [-5, 5]);
  
  // Respect reduced motion and small screens
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    onChange();
    media.addEventListener?.('change', onChange);
    const onResize = () => setIsSmall(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      media.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const autoDisabled = disabled || reducedMotion || isSmall;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || autoDisabled) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < range) {
        setMousePosition({ x: deltaX, y: deltaY });
        mouseX.set(deltaX);
        mouseY.set(deltaY);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
      mouseX.set(0);
      mouseY.set(0);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      // Attach mousemove only when hovered, detach on leave
      document.addEventListener('mousemove', handleMouseMove);
    };

    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, range, autoDisabled]);

  const hoverVariants = {
    rest: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    hover: {
      scale: 1.03,
      z: 50,
      transition: {
        duration: 0.35,
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    rest: {
      opacity: 0,
      scale: 0.8,
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={buttonRef}
      className={`magnetic-button ${className} ${autoDisabled ? 'disabled' : ''}`}
      variants={hoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={{
        x: magneticX,
        y: magneticY,
        rotateX: autoDisabled ? 0 : rotateX,
        rotateY: autoDisabled ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformOrigin: "center center"
      }}
      {...props}
    >
      {/* Magnetic glow effect */}
      <motion.div 
        className="magnetic-glow"
        variants={glowVariants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      />
      
      {/* Ripple effect on click */}
      <motion.div 
        className="magnetic-ripple"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ 
          scale: 2, 
          opacity: 0,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      />
      
      {/* Content wrapper for additional effects */}
      <motion.div 
        className="magnetic-content"
        style={{
          transform: isHovered ? `translateZ(20px)` : `translateZ(0px)`,
        }}
        transition={{
          duration: 0.3,
          ease: [0.215, 0.61, 0.355, 1]
        }}
      >
        {children}
      </motion.div>
      
      {/* Particle effects for extra flair */}
      {isHovered && !autoDisabled && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="magnetic-particle"
              initial={{ 
                scale: 0, 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 6) * 30,
                y: Math.sin((i * Math.PI * 2) / 6) * 30,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default MagneticButton;
