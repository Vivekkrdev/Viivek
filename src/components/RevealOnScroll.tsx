import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  amount = 0.3,
  parallax = false,
  parallaxSpeed = 0.3,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * parallaxSpeed, -100 * parallaxSpeed]
  );

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={parallax ? { y: parallaxY } : undefined}
    >
      {children}
    </motion.div>
  );
}
