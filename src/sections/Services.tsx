import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SplitText from '../components/SplitText';
import RevealOnScroll from '../components/RevealOnScroll';
import MagneticElement from '../components/MagneticElement';
import Tooltip from '../components/Tooltip';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building scalable, high-performance web applications with modern technologies. From concept to deployment, I deliver robust solutions.',
    features: ['React & Next.js', 'Node.js Backend', 'API Development', 'Database Design'],
    color: '#6366f1',
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive, visually stunning interfaces that delight users and drive engagement. Design that converts.',
    features: ['Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6] to-[#ec4899]',
  },
  {
    icon: TrendingUp,
    title: 'Digital Strategy',
    description: 'Data-driven strategies to grow your online presence and achieve measurable business results.',
    features: ['SEO Optimization', 'Analytics', 'Content Strategy', 'Growth Hacking'],
    color: '#ec4899',
    gradient: 'from-[#ec4899] to-[#6366f1]',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-[#8b5cf6]" />
            <span className="text-sm text-zinc-400">What I Do Best</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            <SplitText animation="rotate">My Services</SplitText>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to bring your vision to life
          </p>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={service.title} delay={index * 0.15}>
                <GlassCard
                  className="h-full p-8 group"
                  intensity="medium"
                  hoverScale={1.03}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-4 group-hover:text-[#6366f1] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <Tooltip key={feature} content={`Learn more about ${feature}`}>
                        <span className="px-3 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-[#6366f1]/50 hover:text-zinc-300 transition-colors cursor-help">
                          {feature}
                        </span>
                      </Tooltip>
                    ))}
                  </div>

                  {/* CTA */}
                  <MagneticElement strength={0.2}>
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[#6366f1] font-medium group/link"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowUpRight
                        size={18}
                        className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                      />
                    </motion.a>
                  </MagneticElement>
                </GlassCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
