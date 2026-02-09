import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  cursorText: string;
  cursorVariant: 'default' | 'large' | 'dot';
}

export default function AdvancedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorText: '',
    cursorVariant: 'default',
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const dotSpringConfig = { damping: 30, stiffness: 500, mass: 0.2 };
  const dotX = useSpring(0, dotSpringConfig);
  const dotY = useSpring(0, dotSpringConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.getAttribute('data-cursor');
      const cursorVariant = target.getAttribute('data-cursor-variant') as CursorState['cursorVariant'];
      
      setCursorState({
        isHovering: true,
        isClicking: false,
        cursorText: cursorLabel || '',
        cursorVariant: cursorVariant || 'default',
      });
    };

    const handleElementLeave = () => {
      setCursorState({
        isHovering: false,
        isClicking: false,
        cursorText: '',
        cursorVariant: 'default',
      });
    };

    const addListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });

      return interactiveElements;
    };

    let elements = addListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      elements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const getCursorSize = () => {
    switch (cursorState.cursorVariant) {
      case 'large':
        return cursorState.cursorText ? 100 : 80;
      case 'dot':
        return 20;
      default:
        return cursorState.isHovering ? (cursorState.cursorText ? 90 : 50) : 40;
    }
  };

  const size = getCursorSize();

  return (
    <>
      {/* Main cursor ring with blend mode */}
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
            width: size,
            height: size,
            scale: cursorState.isClicking ? 0.85 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: cursorState.isHovering
                ? `0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)`
                : `0 0 20px rgba(99, 102, 241, 0.3)`,
            }}
          />
          
          {/* Main ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            animate={{
              borderColor: cursorState.cursorText ? '#6366f1' : '#ffffff',
              opacity: cursorState.isHovering ? 1 : 0.6,
            }}
          />
          
          {/* Inner fill */}
          <motion.div
            className="absolute inset-3 rounded-full bg-white"
            animate={{
              opacity: cursorState.isHovering ? 0.15 : 0,
              scale: cursorState.isHovering ? 1 : 0.5,
            }}
          />

          {/* Cursor text */}
          <AnimatePresence>
            {cursorState.cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-semibold text-white uppercase tracking-wider whitespace-nowrap"
              >
                {cursorState.cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Fast following dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"
          animate={{
            scale: cursorState.isClicking ? 2.5 : 1,
            opacity: cursorState.isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Trail particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{ delay: (i + 1) * 0.025 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{
              background: `hsl(${240 + i * 10}, 70%, ${60 + i * 5}%)`,
            }}
            animate={{
              opacity: (0.4 - i * 0.06) * (cursorState.isHovering ? 0 : 1),
              scale: 1 - i * 0.12,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
