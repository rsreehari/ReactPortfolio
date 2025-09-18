import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './InteractiveCard.css';

const InteractiveCard = ({ children, className = '', intensity = 0.1, ...props }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10 * intensity;
      const rotateY = (x - centerX) / centerX * 10 * intensity;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      
      // Add glow effect
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      card.style.setProperty('--glow-x', `${glowX}%`);
      card.style.setProperty('--glow-y', `${glowY}%`);
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    };

    const handleMouseEnter = () => {
      card.style.transition = 'none';
    };

    const handleTransitionEnd = () => {
      card.style.transition = 'transform 0.3s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [intensity]);

  return (
    <motion.div
      ref={cardRef}
      className={`interactive-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      <div className="card-content">
        {children}
      </div>
      <div className="card-glow"></div>
    </motion.div>
  );
};

export default InteractiveCard;
