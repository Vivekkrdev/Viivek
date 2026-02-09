import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  hoverScale?: number;
  enableTilt?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  intensity = 'medium',
  hoverScale = 1.02,
  enableTilt = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const intensityStyles = {
    light: 'bg-white/5 border-white/10',
    medium: 'bg-white/10 border-white/15',
    strong: 'bg-white/15 border-white/20',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX((-mouseY / (rect.height / 2)) * 12);
    setRotateY((mouseX / (rect.width / 2)) * 12);
    
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl backdrop-blur-xl ${intensityStyles[intensity]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : 'none',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.3 }}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-3xl" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
