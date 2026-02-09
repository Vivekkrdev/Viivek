import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 0 1px rgba(99, 102, 241, 0.3)`,
        }}
      />

      {children}
    </motion.div>
  );
}
