import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SpotlightCarousel.css';

// SpotlightCarousel: horizontal snapping carousel with spotlight glare on cards
export const SpotlightCard = ({ children, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchmove', (e) => {
      if (!e.touches?.[0]) return;
      const t = e.touches[0];
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${t.clientX - rect.left}px`);
      el.style.setProperty('--my', `${t.clientY - rect.top}px`);
    }, { passive: true });

    return () => {
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="spotlight-glare" />
      <div className="spotlight-inner">
        {children}
      </div>
    </motion.div>
  );
};

const SpotlightCarousel = ({ items = [], renderItem }) => {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(480, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="spotlight-carousel">
      <button className="nav prev" aria-label="Previous" onClick={() => scrollBy(-1)}>
        ‹
      </button>
      <div className="spotlight-scroller" ref={scrollerRef}>
        {items.map((it, i) => (
          <div className="spotlight-slide" key={i}>
            {renderItem(it, i)}
          </div>
        ))}
      </div>
      <button className="nav next" aria-label="Next" onClick={() => scrollBy(1)}>
        ›
      </button>
    </div>
  );
};

export default SpotlightCarousel;
