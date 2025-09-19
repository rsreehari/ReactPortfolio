import React, { useEffect, useRef, useState } from 'react';

// Gentle text scramble effect that respects reduced motion
// Usage: <TextScramble>Heading Text</TextScramble>
const CHARS = '!<>-_\/[]{}—=+*^?#________';

const TextScramble = ({ children, className = '', duration = 600, intensity = 0.2 }) => {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    onChange();
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const original = (typeof children === 'string') ? children : el.textContent;
    if (!original) return;

    if (reduced) {
      el.textContent = original;
      return;
    }

    let frame = 0;
    const total = Math.max(30, Math.floor((duration / 1000) * 60));
    const queue = original.split('').map((char, i) => {
      const start = Math.floor(Math.random() * (total * intensity));
      const end = start + Math.floor(total * (0.3 + Math.random() * 0.4));
      return { from: '', to: char, start, end, char };
    });

    cancelAnimationFrame((el).__scrambleRAF);

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          output += from || ' ';
        }
      }
      el.textContent = output;
      frame++;
      if (complete === queue.length) return;
      (el).__scrambleRAF = requestAnimationFrame(update);
    };

    (el).__scrambleRAF = requestAnimationFrame(update);
    return () => cancelAnimationFrame((el).__scrambleRAF);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, reduced, duration, intensity]);

  return (
    <span ref={ref} className={`text-scramble ${className}`}>{children}</span>
  );
};

export default TextScramble;
