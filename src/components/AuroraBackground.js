import React from 'react';
import { motion } from 'framer-motion';
import './AuroraBackground.css';

// Aurora style animated beams/rays background
// Lightweight CSS gradients animated with framer-motion
const AuroraBackground = ({ className = '' }) => {
  return (
    <div className={`aurora-wrapper ${className}`} aria-hidden>
      <motion.div
        className="aurora-layer layer-1"
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-3%', '3%', '-3%'],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="aurora-layer layer-2"
        animate={{
          x: ['3%', '-3%', '3%'],
          y: ['5%', '-5%', '5%'],
          rotate: [2, -2, 2],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="aurora-layer layer-3"
        animate={{
          x: ['-2%', '2%', '-2%'],
          y: ['-4%', '4%', '-4%'],
          rotate: [-1, 1, -1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <div className="aurora-vignette" />
    </div>
  );
};

export default AuroraBackground;
