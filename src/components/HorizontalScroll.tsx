import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
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
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
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
    <div ref={containerRef} className={`relative h-screen overflow-hidden ${className}`}>
      <div
        ref={scrollRef}
        className="flex items-center h-full gap-8 px-8"
        style={{ width: 'fit-content' }}
      >
        {children}
      </div>
    </div>
  );
}
