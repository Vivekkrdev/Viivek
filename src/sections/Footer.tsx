import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import MagneticElement from '../components/MagneticElement';
import TextMarquee from '../components/TextMarquee';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Marquee */}
      <div className="py-12 border-y border-zinc-800/50">
        <TextMarquee
          items={['VIIVEK', 'DEVELOPER', 'DESIGNER', 'CREATOR', 'INNOVATOR']}
          speed={25}
        />
      </div>

      {/* Main footer */}
      <div className="py-16 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        
        {/* Top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start gap-3"
            >
              <motion.a
                href="#home"
                className="text-3xl font-bold font-['Space_Grotesk']"
                whileHover={{ scale: 1.05 }}
              >
                <span className="gradient-text">VIIVEK</span>
                <motion.span
                  className="text-[#6366f1]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  .
                </motion.span>
              </motion.a>
              <p className="text-sm text-zinc-500 flex items-center gap-2">
                © 2026 Crafted with
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={14} className="text-[#ec4899] fill-[#ec4899]" />
                </motion.span>
                and lots of
                <Code2 size={14} className="text-[#6366f1]" />
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-zinc-500 hover:text-[#6366f1] transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.nav>

            {/* Back to Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MagneticElement strength={0.5}>
                <motion.button
                  onClick={scrollToTop}
                  className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-zinc-400 hover:text-[#6366f1] transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor="Top"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUp size={20} />
                  </motion.div>
                </motion.button>
              </MagneticElement>
            </motion.div>
          </div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-zinc-800/50 text-center"
          >
            <p className="text-xs text-zinc-600 flex items-center justify-center gap-2">
              Built with
              <span className="text-[#6366f1]">React</span>
              <span className="text-zinc-700">•</span>
              <span className="text-[#8b5cf6]">TypeScript</span>
              <span className="text-zinc-700">•</span>
              <span className="text-[#ec4899]">Tailwind CSS</span>
              <span className="text-zinc-700">•</span>
              <span className="text-[#6366f1]">Framer Motion</span>
              <span className="text-zinc-700">•</span>
              <span className="text-[#8b5cf6]">Three.js</span>
              <span className="text-zinc-700">•</span>
              <span className="text-[#ec4899]">GSAP</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
