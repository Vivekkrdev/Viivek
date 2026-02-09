import { motion } from 'framer-motion';

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'GraphQL', 'Redis', 'Docker',
  'AWS', 'Vercel', 'Git', 'Figma', 'Tailwind CSS',
  'Framer Motion', 'Three.js', 'GSAP', 'Python', 'TensorFlow',
];

export default function TechStack() {
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="py-20 relative overflow-hidden border-y border-zinc-800/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      
      {/* Glow effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/2 left-1/4 w-64 h-32 bg-[#6366f1]/10 blur-[80px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-64 h-32 bg-[#8b5cf6]/10 blur-[80px] -translate-y-1/2" />
      </div>

      <div className="relative">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs mono text-zinc-500 tracking-[0.3em] uppercase">
            Tech Stack
          </span>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

          {/* Scrolling Content */}
          <motion.div
            className="flex gap-12 items-center py-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedTech.map((tech, index) => (
              <motion.div
                key={`${tech}-${index}`}
                className="flex items-center gap-4 flex-shrink-0 group cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-2xl md:text-3xl font-semibold text-zinc-600 hover:text-[#6366f1] transition-colors duration-300 whitespace-nowrap">
                  {tech}
                </span>
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#6366f1]/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Duplicate for seamless loop */}
          <motion.div
            className="flex gap-12 items-center py-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedTech.map((tech, index) => (
              <motion.div
                key={`${tech}-dup-${index}`}
                className="flex items-center gap-4 flex-shrink-0 group cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-2xl md:text-3xl font-semibold text-zinc-600 hover:text-[#6366f1] transition-colors duration-300 whitespace-nowrap">
                  {tech}
                </span>
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#6366f1]/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
