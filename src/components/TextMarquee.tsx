import { motion } from 'framer-motion';

interface TextMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function TextMarquee({
  items,
  direction = 'left',
  speed = 30,
  className = '',
}: TextMarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="text-6xl md:text-8xl font-bold text-zinc-800/50 hover:text-zinc-700/50 transition-colors duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
