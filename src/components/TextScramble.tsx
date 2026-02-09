import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({
  text,
  className = '',
  delay = 0,
  duration = 2000,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const timeout = setTimeout(() => {
      setHasAnimated(true);
      let iteration = 0;
      const totalIterations = text.length * 3;
      const intervalDuration = duration / totalIterations;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration >= totalIterations) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, intervalDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay, duration, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayText || text.split('').map(() => ' ').join('')}
    </motion.span>
  );
}
