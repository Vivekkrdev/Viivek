import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 0.3,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white/10',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white/10',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white/10',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white/10',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay }}
            className={`absolute ${positionStyles[position]} z-50 pointer-events-none`}
          >
            <div className="px-4 py-2 bg-[#1a1a25]/95 backdrop-blur-md border border-white/10 rounded-xl text-sm text-zinc-300 whitespace-nowrap shadow-xl">
              {content}
              
              {/* Arrow */}
              <div
                className={`absolute w-0 h-0 border-4 border-transparent ${arrowStyles[position]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
