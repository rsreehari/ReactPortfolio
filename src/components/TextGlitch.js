import React from 'react';
import { motion } from 'framer-motion';
import './TextGlitch.css';

// TextGlitch: CSS-based glitch with subtle framer-motion reveal
// Usage: <TextGlitch>Glitch Title</TextGlitch>
const TextGlitch = ({ children, className = '', as: Tag = 'span', text }) => {
  // Attempt to derive text if not provided explicitly
  let overlayText = text;
  if (!overlayText) {
    if (typeof children === 'string') {
      overlayText = children;
    } else if (Array.isArray(children)) {
      overlayText = children.filter((c) => typeof c === 'string').join(' ');
    } else if (children && typeof children === 'object' && 'props' in children) {
      const inner = children.props?.children;
      if (typeof inner === 'string') overlayText = inner;
    }
  }
  return (
    <motion.span
      className={`text-glitch ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Tag className="text-glitch__inner" data-text={overlayText || ''}>
        {children}
      </Tag>
    </motion.span>
  );
};

export default TextGlitch;
