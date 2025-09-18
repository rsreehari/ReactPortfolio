import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './TextReveal.css';

const TextReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  animationType = 'slideUp', // slideUp, slideDown, fade, blur, scale, rotate3d
  staggerDelay = 0.08,
  once = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Handle different text types (string vs JSX elements)
  const processChildren = (children) => {
    if (typeof children === 'string') {
      return children.split(' ');
    }
    
    // Handle JSX elements with spans
    if (React.isValidElement(children)) {
      const childrenArray = React.Children.toArray(children);
      return childrenArray.map(child => {
        if (typeof child === 'string') {
          return child.split(' ');
        }
        return child;
      }).flat();
    }
    
    // Handle array of JSX elements
    if (Array.isArray(children)) {
      return children.map(child => {
        if (typeof child === 'string') {
          return child.split(' ');
        }
        return child;
      }).flat();
    }
    
    return [children];
  };

  const elements = processChildren(children);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const getAnimationVariants = () => {
    const baseTransition = {
      duration: duration,
      ease: [0.215, 0.61, 0.355, 1], // React Bits easing
    };

    switch (animationType) {
      case 'slideUp':
        return {
          hidden: {
            y: 100,
            opacity: 0,
            rotateX: -15,
            scale: 0.9,
          },
          visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            transition: baseTransition,
          },
        };
      
      case 'slideDown':
        return {
          hidden: {
            y: -100,
            opacity: 0,
            rotateX: 15,
            scale: 0.9,
          },
          visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            transition: baseTransition,
          },
        };
      
      case 'fade':
        return {
          hidden: {
            opacity: 0,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      
      case 'blur':
        return {
          hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 1.1,
          },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            transition: baseTransition,
          },
        };
      
      case 'scale':
        return {
          hidden: {
            opacity: 0,
            scale: 0.5,
            rotateZ: -10,
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            transition: baseTransition,
          },
        };
      
      case 'rotate3d':
        return {
          hidden: {
            opacity: 0,
            rotateY: -90,
            rotateX: -45,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            transition: baseTransition,
          },
        };
      
      default:
        return {
          hidden: {
            y: 50,
            opacity: 0,
            rotateX: -90,
          },
          visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: baseTransition,
          },
        };
    }
  };

  const elementVariants = getAnimationVariants();

  const hoverVariants = {
    hover: {
      scale: 1.05,
      rotateZ: Math.random() * 4 - 2, // Random slight rotation
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`text-reveal ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {elements.map((element, index) => {
        // Handle JSX elements
        if (React.isValidElement(element)) {
          return (
            <motion.span
              key={index}
              className="text-reveal-element"
              variants={elementVariants}
              whileHover={hoverVariants.hover}
            >
              {element}
            </motion.span>
          );
        }
        
        // Handle text strings
        if (typeof element === 'string') {
          return (
            <motion.span
              key={index}
              className="text-reveal-word"
              variants={elementVariants}
              whileHover={hoverVariants.hover}
            >
              {element}
              {index < elements.length - 1 && '\u00A0'}
            </motion.span>
          );
        }
        
        return null;
      })}
    </motion.div>
  );
};

export default TextReveal;
