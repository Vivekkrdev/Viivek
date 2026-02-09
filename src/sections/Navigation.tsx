import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticElement from '../components/MagneticElement';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong py-4'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl font-bold font-['Space_Grotesk']">
                <motion.span
                  className="gradient-text"
                  whileHover={{
                    textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
                  }}
                >
                  VIIVEK
                </motion.span>
                <motion.span
                  className="text-[#6366f1]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  .
                </motion.span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {link.name}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#6366f1]/15 rounded-xl"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover underline */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticElement strength={0.3}>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary text-sm py-3 px-6"
                  data-cursor="Let's Talk"
                >
                  Let's Talk
                </button>
              </MagneticElement>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white relative w-10 h-10 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 glass-strong border-l border-zinc-800"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col p-8 pt-24 gap-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className={`text-2xl font-semibold py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'text-[#6366f1] bg-[#6366f1]/10'
                          : 'text-white hover:text-[#6366f1] hover:bg-zinc-800/50'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary mt-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Let's Talk
                </motion.button>
              </div>

              {/* Tech tags at bottom */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-3 justify-center flex-wrap">
                  {['React', 'Node', 'TypeScript'].map((tech) => (
                    <span key={tech} className="text-xs text-zinc-600 mono px-2 py-1 glass rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
