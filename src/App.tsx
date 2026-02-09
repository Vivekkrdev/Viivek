import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import HorizontalGallery from './sections/HorizontalGallery';
import Contact from './sections/Contact';
import TechStack from './sections/TechStack';
import Footer from './sections/Footer';
import AdvancedCursor from './components/AdvancedCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import { useLenis } from './hooks/useLenis';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0a0a0f] flex flex-col items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated logo */}
      <motion.div className="relative mb-12">
        <motion.div
          className="text-7xl md:text-9xl font-bold font-['Space_Grotesk']"
          animate={{
            textShadow: [
              '0 0 20px rgba(99, 102, 241, 0.5)',
              '0 0 60px rgba(99, 102, 241, 0.8)',
              '0 0 20px rgba(99, 102, 241, 0.5)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="gradient-text">V</span>
        </motion.div>
        
        {/* Orbiting dots */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#6366f1]"
              style={{
                transform: `rotate(${angle}deg) translateX(50px)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress text */}
      <motion.p className="mt-4 mono text-sm text-zinc-500">
        {Math.floor(progress)}%
      </motion.p>

      {/* Loading text with scramble effect */}
      <motion.div
        className="mt-2 text-xs text-zinc-600 mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {'INITIALIZING...'.split('').map((char, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#6366f1]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden"
      >
        {/* Advanced Custom Cursor */}
        <AdvancedCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative">
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <HorizontalGallery />
          <TechStack />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
