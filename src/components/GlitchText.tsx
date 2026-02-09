import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

export default function GlitchText({
  text,
  className = '',
  glitchInterval = 3000,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [glitchInterval]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        className="relative z-10"
        animate={
          isGlitching
            ? {
                x: [0, -3, 3, -2, 2, 0],
                opacity: [1, 0.8, 1, 0.9, 1],
              }
            : {}
        }
        transition={{ duration: 0.1 }}
      >
        {text}
      </motion.span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-[#6366f1] opacity-70"
            style={{ clipPath: 'inset(20% 0 60% 0)' }}
            animate={{
              x: [0, 5, -5, 3, 0],
            }}
            transition={{ duration: 0.1 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[#ec4899] opacity-70"
            style={{ clipPath: 'inset(60% 0 20% 0)' }}
            animate={{
              x: [0, -5, 5, -3, 0],
            }}
            transition={{ duration: 0.1 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}
