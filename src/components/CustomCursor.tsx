import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Handle hoverable elements
    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const cursorLabel = target.getAttribute('data-cursor');
      if (cursorLabel) setCursorText(cursorLabel);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor], input, textarea'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], input, textarea'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const cursorLabel = el.getAttribute('data-cursor');
          if (cursorLabel) setCursorText(cursorLabel);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? (cursorText ? 100 : 60) : 40,
            height: isHovering ? (cursorText ? 100 : 60) : 40,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{
              opacity: isHovering ? 1 : 0.5,
              borderColor: cursorText ? '#6366f1' : '#ffffff',
            }}
          />
          
          {/* Inner fill */}
          <motion.div
            className="absolute inset-2 rounded-full bg-white"
            animate={{
              opacity: isHovering ? 0.2 : 0,
              scale: isHovering ? 1 : 0.5,
            }}
          />

          {/* Cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-medium text-white whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{
            scale: isClicking ? 2 : 1,
            opacity: isHovering ? 0 : 1,
          }}
        />
      </motion.div>

      {/* Trail effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{ delay: (i + 1) * 0.03 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#6366f1]"
            animate={{
              opacity: (0.3 - i * 0.05) * (isHovering ? 0 : 1),
              scale: 1 - i * 0.15,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
