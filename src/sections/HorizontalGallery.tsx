import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../components/GlassCard';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    image: '/photo1.jpg',
    title: 'Dubai Experience',
    subtitle: 'International Exposure',
  },
  {
    image: '/photo2.jpg',
    title: 'Professional Portrait',
    subtitle: 'Business Ready',
  },
  {
    image: '/photo3.jpg',
    title: 'City Lights',
    subtitle: 'Urban Professional',
  },
  {
    image: '/coffee-app.jpg',
    title: 'Coffee App Design',
    subtitle: 'UI/UX Project',
  },
  {
    image: '/dashboard.jpg',
    title: 'Analytics Dashboard',
    subtitle: 'Data Visualization',
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    if (!container || !scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth - container.offsetWidth;

    const tween = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth * 1.5}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section className="relative bg-[#0a0a0f]">
      {/* Section Header */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="mono text-sm text-[#6366f1] tracking-widest uppercase">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mt-4">
            <SplitText animation="rotate">Visual Journey</SplitText>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Scroll horizontally to explore moments from my professional journey
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div
          ref={scrollRef}
          className="flex items-center h-full gap-8 px-8"
          style={{ width: 'fit-content' }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                className="w-[400px] md:w-[500px] h-[70vh] overflow-hidden"
                intensity="medium"
                hoverScale={1.02}
              >
                <div className="relative w-full h-full">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400">{item.subtitle}</p>
                    </motion.div>
                  </div>

                  {/* Index number */}
                  <div className="absolute top-6 right-6 glass rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-lg font-bold gradient-text">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}

          {/* End card */}
          <div className="flex-shrink-0 w-[400px] md:w-[500px] h-[70vh] flex items-center justify-center">
            <GlassCard className="p-12 text-center" intensity="strong">
              <h3 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">
                Let's Create
                <br />
                <span className="gradient-text">Together</span>
              </h3>
              <p className="text-zinc-400 mb-6">
                Have a project in mind? Let's discuss how we can work together.
              </p>
              <motion.a
                href="#contact"
                className="btn-primary inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </GlassCard>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-xs text-zinc-500 mono uppercase tracking-widest">Scroll</span>
          <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
