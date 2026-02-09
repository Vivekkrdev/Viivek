import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'typewriter';
  staggerDelay?: number;
  once?: boolean;
}

const animations = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotateX: -90, y: 20 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

export default function SplitText({
  children,
  className = '',
  delay = 0,
  type = 'chars',
  animation = 'slide',
  staggerDelay = 0.03,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState('');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  useEffect(() => {
    if (isInView) {
      if (animation === 'typewriter') {
        let index = 0;
        const text = children;
        const interval = setInterval(() => {
          if (index <= text.length) {
            setDisplayText(text.slice(0, index));
            index++;
          } else {
            clearInterval(interval);
            setIsTypewriterComplete(true);
          }
        }, 50);
        return () => clearInterval(interval);
      } else {
        controls.start('visible');
      }
    }
  }, [isInView, animation, children, controls]);

  if (animation === 'typewriter') {
    return (
      <motion.span
        ref={ref}
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        {displayText}
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-[#6366f1] ml-1 align-middle"
          animate={{ opacity: isTypewriterComplete ? [1, 0] : [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.span>
    );
  }

  const items = type === 'chars' ? children.split('') : children.split(' ');
  const selectedAnimation = animations[animation];

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      style={{ perspective: '1000px' }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={selectedAnimation}
          className={`inline-block ${type === 'words' ? 'mr-[0.25em]' : ''}`}
          transition={{
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
