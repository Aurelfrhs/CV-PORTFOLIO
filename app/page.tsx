'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import Contact from './components/Contact';
import { Hero } from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfaces
interface Section {
  id: string;
  label: string;
}

interface MousePosition {
  x: number;
  y: number;
}

// Constants
const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const LOADING_DURATION = 1500;
const SCROLL_OFFSET = 80;

// Enhanced scroll progress component
const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progress,
          duration: 0.1,
          ease: 'none'
        });
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20 backdrop-blur-sm">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white via-gray-200 to-white origin-left"
        style={{
          transform: 'scaleX(0)',
          boxShadow: '0 0 20px rgba(255,255,255,0.3)',
          filter: 'brightness(1.2)'
        }}
      />
    </div>
  );
};

// Enhanced scene transition with GSAP
const SceneTransition = ({
  children,
  id,
  className = ""
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      // Fade in on scroll
      gsap.fromTo(content,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            markers: false
          }
        }
      );

      // Parallax effect
      gsap.to(section, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full opacity-0">
        {children}
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
    </section>
  );
};

// Enhanced chapter divider with GSAP
const ChapterDivider = ({
  chapter,
  title,
  subtitle
}: {
  chapter: string;
  title: string;
  subtitle?: string;
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dividerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate line
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
      )
      // Animate content
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=1'
      )
      // Animate dots
      .fromTo(dotsRef.current?.children ? Array.from(dotsRef.current.children) : [],
        { opacity: 0, scale: 0 },
        { opacity: 0.6, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.3'
      );
    }, dividerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dividerRef} className="relative py-24 flex items-center justify-center">
      {/* Animated line */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={lineRef}
          className="w-full border-t border-white/20 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative bg-black px-12 py-6 text-center border border-white/10 rounded-lg backdrop-blur-sm opacity-0"
      >
        <div className="text-sm text-white/60 font-mono tracking-widest uppercase mb-3">
          {chapter}
        </div>
        <div className="text-2xl text-white font-cinematic tracking-wide mb-2">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-white/50 font-light">
            {subtitle}
          </div>
        )}
      </div>

      {/* Dots */}
      <div
        ref={dotsRef}
        className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 flex space-x-4"
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 bg-white rounded-full opacity-0"
            style={{ transform: 'scale(0)' }}
          />
        ))}
      </div>
    </div>
  );
};

// Navigation dots with GSAP
const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    // Animate dots entrance
    gsap.fromTo(Array.from(dotsRef.current.children),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 2,
        ease: 'power2.out'
      }
    );

    // Setup scroll detection
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      SECTIONS.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: SCROLL_OFFSET },
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <div
      ref={dotsRef}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col space-y-4">
        {SECTIONS.map(({ id }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 opacity-0 ${
              activeSection === id
                ? 'bg-white border-white shadow-lg shadow-white/50'
                : 'bg-transparent border-white/40 hover:border-white/80'
            }`}
            aria-label={`Go to ${id} section`}
          />
        ))}
      </div>
    </div>
  );
};

// Loading screen component
const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline();
      
      tl.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 20 })
        .to(spinnerRef.current, { rotation: 360, duration: 2, repeat: -1, ease: 'none' })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }, 0.5)
        .to(subtitleRef.current, { opacity: 1, duration: 0.8, delay: 0.5 }, 1);

      // Exit animation
      if (!isVisible) {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        });
      }
    }, loadingRef.current);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          ref={loadingRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <div ref={spinnerRef} className="relative mb-8">
            <div className="w-20 h-20 border-2 border-white/20 border-t-white rounded-full" />
          </div>
          <div
            ref={titleRef}
            className="text-white font-cinematic text-xl tracking-widest opacity-0"
          >
            AUREL DEV
          </div>
          <div
            ref={subtitleRef}
            className="text-white/60 text-sm tracking-wider mt-2 opacity-0"
          >
            Crafting Visual Stories...
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Ambient elements component
const AmbientElements = ({ mousePosition }: { mousePosition: MousePosition }) => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current || !raysRef.current) return;

    const ctx = gsap.context(() => {
      // Animate particles
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: '+=40',
            opacity: 0.3,
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
          });
        });
      }

      // Animate rays
      const rays = raysRef.current?.children;
      if (rays) {
        Array.from(rays).forEach((ray, index) => {
          gsap.to(ray, {
            opacity: 0.1 + (index * 0.05),
            duration: 6 + (index * 2),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 2
          });
        });
      }
    }, [particlesRef.current, raysRef.current]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Mouse-following light */}
      <motion.div
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-[0.02] blur-3xl"
        style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          left: mousePosition.x * 100 + 'px',
          top: mousePosition.y * 100 + 'px',
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      {/* Particles */}
      <div ref={particlesRef}>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${10 + (index * 20)}%`,
            }}
          />
        ))}
      </div>

      {/* Light rays */}
      <div ref={raysRef}>
        <div className="absolute top-0 left-1/4 w-px h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
        <div className="absolute top-0 right-1/3 w-px h-screen bg-gradient-to-b from-transparent via-white/3 to-transparent opacity-50" />
        <div className="absolute top-0 left-2/3 w-px h-screen bg-gradient-to-b from-transparent via-white/4 to-transparent opacity-20" />
      </div>
    </div>
  );
};

// Main component
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const mainRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, []);

  // GSAP initialization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetElement, offsetY: SCROLL_OFFSET },
            ease: 'power2.inOut'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick as EventListener);

    return () => {
      document.removeEventListener('click', handleAnchorClick as EventListener);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation Dots */}
      <NavigationDots />

      {/* Ambient Elements */}
      <AmbientElements mousePosition={mousePosition} />

      {/* Main Content */}
      <SceneTransition id="hero" className="!min-h-screen">
        <Hero />
      </SceneTransition>

      <ChapterDivider
        chapter="Chapter II"
        title="SKILLS"
      />

      <SceneTransition id="skills">
        <Skills />
      </SceneTransition>

      <ChapterDivider
        chapter="Chapter III"
        title="Projects"
      />

      <SceneTransition id="projects">
        <Projects />
      </SceneTransition>

      <ChapterDivider
        chapter="End"
        title="Contact"
      />

      <SceneTransition id="contact">
        <Contact />
      </SceneTransition>

      {/* Back to top button */}
      <motion.button
        onClick={() => {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: 'power2.inOut'
          });
        }}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 group shadow-lg"
        aria-label="Back to top"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{
          scale: 1.1,
          borderColor: 'rgba(255,255,255,0.4)',
          boxShadow: '0 0 20px rgba(255,255,255,0.2)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
}