import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0a0a0f] flex flex-col items-center justify-center"
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo animation */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl md:text-8xl font-bold font-['Space_Grotesk']"
              animate={{
                textShadow: [
                  '0 0 20px rgba(99, 102, 241, 0.5)',
                  '0 0 40px rgba(99, 102, 241, 0.8)',
                  '0 0 20px rgba(99, 102, 241, 0.5)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="gradient-text">V</span>
            </motion.div>
            
            {/* Orbiting dots */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#6366f1]"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-4px',
                    marginLeft: '-4px',
                  }}
                  animate={{
                    x: Math.cos((i * 120 * Math.PI) / 180) * 60,
                    y: Math.sin((i * 120 * Math.PI) / 180) * 60,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress text */}
          <motion.p
            className="mt-4 mono text-sm text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.floor(progress)}%
          </motion.p>

          {/* Loading text with scramble effect */}
          <motion.div
            className="mt-2 text-xs text-zinc-600 mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {'LOADING...'.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#6366f1]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
