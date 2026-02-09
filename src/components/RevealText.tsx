import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars' | 'lines';
  staggerDelay?: number;
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateY: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export default function RevealText({
  children,
  className = '',
  delay = 0,
  type = 'words',
  staggerDelay = 0.05,
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (type === 'chars') {
    const chars = children.split('');
    return (
      <motion.span
        ref={ref}
        className={`inline-block ${className}`}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ perspective: '1000px' }}
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="inline-block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const words = children.split(' ');
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
