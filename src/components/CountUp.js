import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

// Lightweight CountUp using framer-motion animate
// Props: end (number), start (number), duration (sec), suffix, prefix
const CountUp = ({
  start = 0,
  end = 100,
  duration = 2,
  ease = [0.215, 0.61, 0.355, 1],
  prefix = '',
  suffix = '+',
  className = '',
}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (hasAnimated) return;
    const controls = animate(start, end, {
      duration,
      ease,
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    setHasAnimated(true);
    return () => controls.stop();
  }, [hasAnimated, start, end, duration, ease]);

  return (
    <span ref={ref} className={`count-up ${className}`}>
      {prefix}{value}{suffix}
    </span>
  );
};

export default CountUp;
