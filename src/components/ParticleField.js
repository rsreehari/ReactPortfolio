import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ParticleField.css';

const ParticleField = ({ 
  particleCount = 50, 
  interactive = true, 
  mouseRadius = 100,
  connectionDistance = 120,
  particleSpeed = 0.5 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isRunningRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      this.vx = (Math.random() - 0.5) * particleSpeed;
      this.vy = (Math.random() - 0.5) * particleSpeed;
      this.life = Math.random() * 100;
      this.maxLife = 100;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update(mouse) {
      // Age the particle
      this.life++;
      if (this.life > this.maxLife) {
        this.life = 0;
        this.reset();
      }

      // Mouse interaction
      if (interactive && mouse) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.01;
          this.vy -= Math.sin(angle) * force * 0.01;
        }
      }

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // Apply friction
      this.vx *= 0.99;
      this.vy *= 0.99;

      // Boundary conditions
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

      // Keep particles in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx) {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      );
      
      gradient.addColorStop(0, `rgba(120, 119, 198, ${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 119, 198, ${this.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(120, 219, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize particles
  const initParticles = (canvas) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }
    return particles;
  };

  // Draw connections between nearby particles
  const drawConnections = (ctx, particles) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.1;
          ctx.strokeStyle = `rgba(120, 119, 198, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  // Animation loop
  const animate = (ts = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isRunningRef.current) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    // Cap FPS ~30
    const last = lastFrameTimeRef.current || 0;
    if (ts - last < 33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = ts;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update(interactive ? mouseRef.current : null);
      particle.draw(ctx);
    });

    // Draw connections
    drawConnections(ctx, particles);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive]);

  // Handle resize + devicePixelRatio
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    // Manage DPR for crispness without overwork
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(dimensions.width * dpr);
    canvas.height = Math.floor(dimensions.height * dpr);
    canvas.style.width = dimensions.width + 'px';
    canvas.style.height = dimensions.height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Initialize particles
    particlesRef.current = initParticles(canvas);

    // Start animation
    isRunningRef.current = true;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      isRunningRef.current = false;
    };
  }, [dimensions, particleCount]);

  // Pause when tab hidden to save CPU
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        isRunningRef.current = false;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      } else {
        isRunningRef.current = true;
        lastFrameTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="particle-field"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    />
  );
};

export default ParticleField;
