import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowUpRight, FiStar } from 'react-icons/fi';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import ScrollReveal from './ScrollReveal';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [photoLoaded, setPhotoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Avoid scaling on scroll to keep text crisp
  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  
  const springConfig = { stiffness: 120, damping: 18, mass: 0.12 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  useEffect(() => {
    let rafId = null;
    let lastEvent = null;

    const updateParallax = () => {
      if (!lastEvent || !imageRef.current) return;
      const e = lastEvent;
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Softer offsets for smoother feel
      const deltaX = (e.clientX - centerX) * 0.06;
      const deltaY = (e.clientY - centerY) * 0.06;
      setMousePosition({ x: deltaX, y: deltaY });
      mouseX.set(deltaX);
      mouseY.set(deltaY);
      rafId = null;
    };

    const handleMouseMove = (e) => {
      lastEvent = e;
      if (rafId == null) rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 60, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -25 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1],
        delay: 0.3
      }
    }
  };
  
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <motion.div 
          className="bg-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="bg-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        <motion.div 
          className="bg-orb orb-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
      </div>
      
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ y, opacity }}
        >
          {/* Enhanced Image Section */}
          <motion.div 
            className="hero-image" 
            variants={imageVariants}
            ref={imageRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div 
              className="image-container"
              variants={floatingVariants}
              animate="animate"
              style={{
                x: mouseX,
                y: mouseY,
              }}
            >
              <motion.div
                className="image-frame"
                animate={{
                  rotateY: isHovering ? 3 : 0,
                  rotateX: isHovering ? -3 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/Sreehari.png"
                  alt="R Sreehari"
                  width="350"
                  height="350"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className={`hero-photo ${photoLoaded ? 'loaded' : ''}`}
                  onLoad={() => setPhotoLoaded(true)}
                  onError={() => setPhotoLoaded(true)}
                />
                <motion.div 
                  className="image-glow"
                  variants={glowVariants}
                  animate="animate"
                />
                <motion.div 
                  className="image-border"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              {/* Floating Elements around image */}
              <motion.div 
                className="floating-element elem-1"
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FiStar />
              </motion.div>
              
              <motion.div 
                className="floating-element elem-2"
                animate={{
                  y: [15, -15, 15],
                  x: [20, -20, 20],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <div className="code-symbol">{`</>`}</div>
              </motion.div>
              
              <motion.div 
                className="floating-element elem-3"
                animate={{
                  y: [-10, 25, -10],
                  x: [-15, 15, -15],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              >
                <div className="react-symbol">⚛️</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Text Section */}
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.div className="hero-badge" variants={itemVariants}>
              <motion.span 
                className="badge-dot"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              Available for opportunities
            </motion.div>
            
            <TextReveal className="hero-title">
              <span className="title-line-1">Building Digital</span>
              <span className="title-line-2">Experiences That</span>
              <span className="title-line-3 gradient-text">Matter</span>
            </TextReveal>
            
            <motion.div className="hero-subtitle-container" variants={itemVariants}>
              <motion.p className="hero-subtitle">
                <span className="subtitle-highlight">Computer Science Engineering Student</span>
                <span className="subtitle-separator">×</span>
                <span className="subtitle-highlight">React Native Developer</span>
              </motion.p>
            </motion.div>
            
            <motion.p className="hero-description" variants={itemVariants}>
              Passionate about crafting innovative digital solutions through code. 
              Specializing in <span className="highlight">web development</span>, 
              <span className="highlight"> mobile applications</span>, and 
              <span className="highlight"> emerging technologies</span>. 
              Currently pushing boundaries with React Native and modern web frameworks.
            </motion.p>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Coding</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Ideas Brewing</span>
              </div>
            </motion.div>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <MagneticButton>
                <motion.a 
                  href="#contact" 
                  className="button-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Let's Collaborate</span>
                  <FiArrowUpRight className="button-icon" />
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a 
                  href="#projects" 
                  className="button-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Work</span>
                  <FiDownload className="button-icon" />
                </motion.a>
              </MagneticButton>
            </motion.div>

            <motion.div className="social-links" variants={itemVariants}>
              <div className="social-label">Connect with me</div>
              <div className="social-icons">
                <MagneticButton>
                  <motion.a
                    href="https://github.com/rsreehari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub />
                    <span className="social-tooltip">GitHub</span>
                  </motion.a>
                </MagneticButton>
                <MagneticButton>
                  <motion.a
                    href="https://www.linkedin.com/in/rsreehari0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiLinkedin />
                    <span className="social-tooltip">LinkedIn</span>
                  </motion.a>
                </MagneticButton>
                <MagneticButton>
                  <motion.a
                    href="mailto:rsreehari091@gmail.com"
                    className="social-link"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiMail />
                    <span className="social-tooltip">Email</span>
                  </motion.a>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div 
            className="scroll-line"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.span
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
