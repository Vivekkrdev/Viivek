import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
  rotate?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.5,
  scale = 1.1,
  rotate = 0,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, scale, 1]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scaleValue, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        style={{
          y: springY,
          scale: springScale,
          rotate: rotateValue,
          opacity,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/30 pointer-events-none" />
    </div>
  );
}
