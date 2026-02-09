import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SplitText from '../components/SplitText';
import MagneticElement from '../components/MagneticElement';
import GlassCard from '../components/GlassCard';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
          x: mouseX,
          y: mouseY,
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
          x: useTransform(mouseX, (v) => -v * 0.5),
          y: useTransform(mouseY, (v) => -v * 0.5),
          filter: 'blur(120px)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles size={16} className="text-[#6366f1]" />
              <span className="text-sm text-zinc-400">Available for freelance work</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
              <SplitText delay={0.2} animation="slide">
                Hi, I'm
              </SplitText>
              <br />
              <span className="gradient-text-animated">
                <SplitText delay={0.4} animation="rotate">
                  Viivek
                </SplitText>
              </span>
            </h1>

            <motion.p
              className="text-xl text-zinc-400 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Senior Web Developer crafting exceptional digital experiences with 8+ years of expertise in modern web technologies.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <MagneticElement strength={0.3}>
                <button
                  onClick={() => scrollToSection('#portfolio')}
                  className="btn-primary flex items-center gap-2 group"
                  data-cursor="View"
                >
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticElement>
              
              <MagneticElement strength={0.3}>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-secondary"
                  data-cursor="Contact"
                >
                  Get In Touch
                </button>
              </MagneticElement>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              className="flex flex-wrap gap-3 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {['React', 'TypeScript', 'Node.js', 'Next.js'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <GlassCard className="p-2" intensity="medium" hoverScale={1.02}>
              <div
                ref={imageRef}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden"
              >
                <img
                  src="/photo1.jpg"
                  alt="Viivek"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-2 border-[#6366f1]/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-zinc-500 mono uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2"
          animate={{ borderColor: ['#3f3f46', '#6366f1', '#3f3f46'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
