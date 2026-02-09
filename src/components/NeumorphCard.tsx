import { motion } from 'framer-motion';

interface NeumorphCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'raised' | 'pressed' | 'inset';
  hoverEffect?: boolean;
}

export default function NeumorphCard({
  children,
  className = '',
  variant = 'raised',
  hoverEffect = true,
}: NeumorphCardProps) {
  const variants = {
    raised: {
      background: 'linear-gradient(145deg, #12121a, #0e0e14)',
      boxShadow: '8px 8px 16px #07070a, -8px -8px 16px #1d1d28',
    },
    pressed: {
      background: 'linear-gradient(145deg, #0e0e14, #12121a)',
      boxShadow: '4px 4px 8px #07070a, -4px -4px 8px #1d1d28',
    },
    inset: {
      background: '#12121a',
      boxShadow: 'inset 8px 8px 16px #07070a, inset -8px -8px 16px #1d1d28',
    },
  };

  return (
    <motion.div
      className={`rounded-2xl ${className}`}
      style={variants[variant]}
      whileHover={
        hoverEffect
          ? {
              boxShadow:
                variant === 'inset'
                  ? 'inset 12px 12px 24px #07070a, inset -12px -12px 24px #1d1d28'
                  : '12px 12px 24px #07070a, -12px -12px 24px #1d1d28',
              y: variant === 'raised' ? -4 : 0,
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
