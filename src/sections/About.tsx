import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, TrendingUp, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import NeumorphCard from '../components/NeumorphCard';
import SplitText from '../components/SplitText';
import RevealOnScroll from '../components/RevealOnScroll';
import ParallaxImage from '../components/ParallaxImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, value: 8, suffix: '+', label: 'Years Experience' },
  { icon: Palette, value: 50, suffix: '+', label: 'Projects Done' },
  { icon: TrendingUp, value: 30, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 5, suffix: '', label: 'Awards Won' },
];

const skills = [
  { name: 'React / Next.js', level: 95, color: '#6366f1' },
  { name: 'TypeScript', level: 90, color: '#8b5cf6' },
  { name: 'Node.js / Express', level: 88, color: '#ec4899' },
  { name: 'MongoDB / PostgreSQL', level: 85, color: '#6366f1' },
  { name: 'Tailwind CSS', level: 95, color: '#8b5cf6' },
  { name: 'UI/UX Design', level: 80, color: '#ec4899' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skillsRef.current) return;

    const skillBars = skillsRef.current.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
      const level = skills[index]?.level || 0;
      
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <RevealOnScroll className="text-center mb-16">
          <span className="mono text-sm text-[#6366f1] tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mt-4">
            <SplitText animation="slide">Passionate Developer</SplitText>
            <br />
            <span className="gradient-text">
              <SplitText animation="slide" delay={0.2}>Creative Designer</SplitText>
            </span>
          </h2>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <RevealOnScroll direction="left" parallax parallaxSpeed={0.2}>
            <div className="relative">
              <ParallaxImage
                src="/photo2.jpg"
                alt="Viivek at work"
                className="rounded-3xl h-[500px]"
                speed={0.3}
                scale={1.15}
              />
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-zinc-400">Years Exp.</div>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Right - Content */}
          <RevealOnScroll direction="right">
            <div className="space-y-6">
              <p className="text-lg text-zinc-400 leading-relaxed">
                I'm a <span className="text-white font-medium">Senior Web Developer</span> from Ranchi, India, with a passion for creating exceptional digital experiences. My journey began with graphic design, which gives me a unique perspective on building beautiful, user-centric applications.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                With expertise in the <span className="text-[#6366f1]">MERN stack</span> and modern frontend technologies, I transform complex problems into elegant solutions. I believe in writing clean, maintainable code that scales.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or mentoring aspiring developers.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <RevealOnScroll key={stat.label} delay={index * 0.1}>
                <NeumorphCard className="p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <Icon size={32} className="mx-auto mb-4 text-[#6366f1] group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold gradient-text mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </NeumorphCard>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Skills */}
        <RevealOnScroll>
          <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-8 text-center">
            Technical <span className="gradient-text">Skills</span>
          </h3>
        </RevealOnScroll>

        <div ref={skillsRef} className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <RevealOnScroll key={skill.name} delay={index * 0.1}>
              <GlassCard className="p-4" intensity="light" enableTilt={false}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-zinc-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full rounded-full transition-all duration-1000"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                      width: '0%',
                    }}
                  />
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
