import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Eye, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SplitText from '../components/SplitText';
import RevealOnScroll from '../components/RevealOnScroll';
import MagneticElement from '../components/MagneticElement';
import Tooltip from '../components/Tooltip';

const projects = [
  {
    id: 1,
    title: 'Coffee App',
    description: 'A sleek React-based application for coffee lovers with modern UI and smooth animations.',
    image: '/coffee-app.jpg',
    tags: ['React', 'CSS3', 'Framer Motion'],
    category: 'web',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'Good Food Resto',
    description: 'High-performance restaurant site with GSAP animations and elegant design.',
    image: '/restaurant-site.jpg',
    tags: ['HTML5', 'JS', 'GSAP'],
    category: 'web',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Meal Plan App',
    description: 'Full-stack MERN application for health-conscious users with meal tracking.',
    image: '/meal-app.jpg',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    category: 'fullstack',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description: 'Modern shopping experience with seamless checkout and product management.',
    image: '/ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    category: 'fullstack',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with real-time charts and insights.',
    image: '/dashboard.jpg',
    tags: ['React', 'D3.js', 'TypeScript'],
    category: 'web',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 6,
    title: 'Brand Identity',
    description: 'Complete branding project including logo, guidelines, and marketing materials.',
    image: '/branding.jpg',
    tags: ['Photoshop', 'Illustrator', 'Figma'],
    category: 'design',
    liveUrl: '#',
    codeUrl: '#',
  },
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'design', label: 'Design' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <RevealOnScroll className="text-center mb-12">
          <span className="mono text-sm text-[#ec4899] tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mt-4">
            <SplitText animation="slide">Featured Works</SplitText>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and creativity
          </p>
        </RevealOnScroll>

        {/* Filter Tabs */}
        <RevealOnScroll delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeFilter === filter.id
                  ? 'text-white'
                  : 'glass text-zinc-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                  layoutId="activePortfolioFilter"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </motion.button>
          ))}
        </RevealOnScroll>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassCard
                  className="overflow-hidden group h-full"
                  intensity="light"
                  hoverScale={1.02}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-[#0a0a0f]/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Tooltip content="View Live Demo">
                        <motion.a
                          href={project.liveUrl}
                          className="p-3 bg-[#6366f1] rounded-full text-white hover:bg-[#818cf8] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          data-cursor="View"
                        >
                          <Eye size={20} />
                        </motion.a>
                      </Tooltip>
                      
                      <Tooltip content="View Source Code">
                        <motion.a
                          href={project.codeUrl}
                          className="p-3 bg-zinc-800 rounded-full text-white hover:bg-zinc-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          data-cursor="Code"
                        >
                          <Github size={20} />
                        </motion.a>
                      </Tooltip>
                    </motion.div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs text-zinc-300 capitalize">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2 group-hover:text-[#6366f1] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-tag text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More CTA */}
        <RevealOnScroll delay={0.4} className="mt-16 text-center">
          <MagneticElement strength={0.3}>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 glass rounded-full text-zinc-300 hover:text-white transition-all group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="GitHub"
            >
              <Github size={20} />
              <span>View More on GitHub</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={18} className="group-hover:rotate-45 transition-transform" />
              </motion.span>
            </motion.a>
          </MagneticElement>
        </RevealOnScroll>
      </div>
    </section>
  );
}
