import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const shapes = [
  { type: 'circle', size: 80, color: '#6366f1', x: '10%', y: '20%', delay: 0 },
  { type: 'square', size: 60, color: '#8b5cf6', x: '85%', y: '15%', delay: 0.5 },
  { type: 'circle', size: 40, color: '#ec4899', x: '75%', y: '60%', delay: 1 },
  { type: 'square', size: 100, color: '#6366f1', x: '5%', y: '70%', delay: 1.5 },
  { type: 'circle', size: 50, color: '#8b5cf6', x: '90%', y: '80%', delay: 2 },
  { type: 'square', size: 30, color: '#ec4899', x: '50%', y: '10%', delay: 2.5 },
];

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: shape.type === 'square' ? [0, 90, 180] : 0,
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          <div
            className={`w-full h-full ${
              shape.type === 'circle' ? 'rounded-full' : 'rounded-lg rotate-45'
            }`}
            style={{
              background: `linear-gradient(135deg, ${shape.color}20, ${shape.color}05)`,
              boxShadow: `0 0 ${shape.size}px ${shape.color}20`,
              backdropFilter: 'blur(2px)',
            }}
          />
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
