'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';
import Contact from './components/Contact';
import { Hero } from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { Footer } from './layouts/Footer';
import { Navigation } from './layouts/Navigation';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// TYPES
// ============================================================================

interface Section {
  id: string;
  label: string;
}

interface MousePosition {
  x: number;
  y: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const SCROLL_CONFIG = {
  OFFSET: 80,
  DURATION: 1.5,
  EASE: 'power2.inOut'
} as const;

const ANIMATION_CONFIG = {
  SCENE_DURATION: 1.2,
  SCENE_Y: 60,
  SCENE_SCALE: 0.95,
  PARALLAX: -10,
  LOADING_INTERVAL: 100,
  LOADING_DURATION: 900
} as const;

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useMouseTracking() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progressRef;
}

function useActiveSection(sections: Section[]) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
}

function useLoadingProgress(onComplete: () => void) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, ANIMATION_CONFIG.LOADING_INTERVAL);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, ANIMATION_CONFIG.LOADING_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return progress;
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

function ScrollProgress() {
  const progressRef = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20 backdrop-blur-sm">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white via-gray-200 to-white origin-left shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

interface SceneTransitionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

function SceneTransition({ children, id, className = "" }: SceneTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: ANIMATION_CONFIG.SCENE_Y, 
          scale: ANIMATION_CONFIG.SCENE_SCALE 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_CONFIG.SCENE_DURATION,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.to(sectionRef.current, {
        yPercent: ANIMATION_CONFIG.PARALLAX,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto opacity-0">
        {children}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />
    </section>
  );
}

function NavigationDots() {
  const activeSection = useActiveSection(SECTIONS);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    gsap.fromTo(
      Array.from(dotsRef.current.children),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        ease: 'power2.out'
      }
    );
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: SCROLL_CONFIG.DURATION,
        scrollTo: { y: element, offsetY: SCROLL_CONFIG.OFFSET },
        ease: SCROLL_CONFIG.EASE
      });
    }
  }, []);

  return (
    <nav
      ref={dotsRef}
      className="fixed right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block"
      aria-label="Section navigation"
    >
      <div className="flex flex-col space-y-3 lg:space-y-4">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full border-2 transition-all duration-300 opacity-0 hover:scale-125 ${
              activeSection === id
                ? 'bg-white border-white shadow-lg shadow-white/50'
                : 'bg-transparent border-white/40 hover:border-white/80'
            }`}
            aria-label={`Go to ${label} section`}
            aria-current={activeSection === id ? 'true' : 'false'}
          />
        ))}
      </div>
    </nav>
  );
}

function LoadingProgress({ progress }: { progress: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            className="transition-all duration-200 ease-out"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/80 text-sm sm:text-base font-mono font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <motion.div
        className="text-white/70 text-sm sm:text-base tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.div>
    </div>
  );
}

interface StartButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
}

function StartButton({ onClick, label, variant = 'primary' }: StartButtonProps) {
  if (variant === 'secondary') {
    return (
      <motion.button
        onClick={onClick}
        className="group relative text-white/50 hover:text-white/90 text-xs tracking-[0.2em] transition-all duration-300 px-3 py-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative">
          {label}
          <motion.span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className="group relative px-8 lg:px-10 py-2.5 bg-transparent border-2 border-white/30 text-white font-medium text-xs lg:text-sm tracking-[0.15em] overflow-hidden backdrop-blur-sm transition-all duration-500"
      whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 1)' }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div className="absolute inset-0 bg-transparent group-hover:bg-white transition-all duration-500" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold group-hover:text-black transition-colors duration-500">
        {label}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

interface SplashScreenProps {
  isVisible: boolean;
  onStart: (withMusic: boolean) => void;
}

function SplashScreen({ isVisible, onStart }: SplashScreenProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');

  const handleLoadingComplete = useCallback(() => {
    setPhase('ready');
  }, []);

  const progress = useLoadingProgress(handleLoadingComplete);

  const handleStart = useCallback((withMusic: boolean) => {
    if (splashRef.current) {
      gsap.to(splashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => onStart(withMusic)
      });
    }
  }, [onStart]);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-4"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <LoadingProgress progress={progress} />
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-white text-4xl font-extrabold tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              READY
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <StartButton onClick={() => handleStart(true)} label="START" />
              <StartButton
                onClick={() => handleStart(false)}
                label="Continue without music"
                variant="secondary"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmbientElements({ mousePosition }: { mousePosition: MousePosition }) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const ctx = gsap.context(() => {
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
    }, particlesRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-[0.02] blur-3xl"
        style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
        animate={{ x: mousePosition.x * 50, y: mousePosition.y * 50 }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
      <div ref={particlesRef} className="hidden sm:block">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{ left: `${20 + (i * 15)}%`, top: `${10 + (i * 20)}%` }}
          />
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
        <div className="absolute top-0 right-1/3 w-px h-screen bg-gradient-to-b from-transparent via-white/3 to-transparent opacity-50" />
        <div className="absolute top-0 left-2/3 w-px h-screen bg-gradient-to-b from-transparent via-white/4 to-transparent opacity-20" />
      </div>
    </div>
  );
}

function BackToTopButton() {
  const scrollToTop = useCallback(() => {
    gsap.to(window, {
      duration: SCROLL_CONFIG.DURATION,
      scrollTo: { y: 0 },
      ease: SCROLL_CONFIG.EASE
    });
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
      aria-label="Back to top"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
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
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const mousePosition = useMouseTracking();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = useCallback((withMusic: boolean) => {
    setShowSplash(false);
    setHasStarted(true);
    
    if (withMusic) {
      console.log('Starting with music...');
    }
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    ScrollTrigger.refresh();

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          gsap.to(window, {
            duration: SCROLL_CONFIG.DURATION,
            scrollTo: { y: targetElement, offsetY: SCROLL_CONFIG.OFFSET },
            ease: SCROLL_CONFIG.EASE
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick as EventListener);

    return () => {
      document.removeEventListener('click', handleAnchorClick as EventListener);
      ScrollTrigger.killAll();
    };
  }, [hasStarted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <SplashScreen isVisible={showSplash} onStart={handleStart} />

      {hasStarted && (
        <>
          <Navigation />
          <ScrollProgress />
          <NavigationDots />
          <AmbientElements mousePosition={mousePosition} />

          <main className="relative z-20">
            <SceneTransition id="hero" className="!min-h-screen">
              <Hero />
            </SceneTransition>

            <SceneTransition id="skills">
              <Skills />
            </SceneTransition>

            <SceneTransition id="projects">
              <Projects />
            </SceneTransition>

            <SceneTransition id="contact">
              <Contact />
            </SceneTransition>
          </main>

          <Footer />
          <BackToTopButton />
        </>
      )}
    </>
  );
}