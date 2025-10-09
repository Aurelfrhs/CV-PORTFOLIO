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

// Types
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

const SCROLL_OFFSET = 80;

// Scroll Progress Component
const ScrollProgress = () => {
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20 backdrop-blur-sm">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white via-gray-200 to-white origin-left shadow-[0_0_20px_rgba(255,255,255,0.3)] brightness-120"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

// Scene Transition Component
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

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
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
        yPercent: -10,
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
};

// Chapter Divider Component
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

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
      )
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=1'
      )
      .fromTo(dotsRef.current?.children ? Array.from(dotsRef.current.children) : [],
        { opacity: 0, scale: 0 },
        { opacity: 0.6, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.3'
      );
    }, dividerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dividerRef} className="relative py-12 sm:py-16 lg:py-20 flex items-center justify-center px-4">
      <div className="absolute inset-0 flex items-center">
        <div
          ref={lineRef}
          className="w-full border-t border-white/20 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div
        ref={contentRef}
        className="relative bg-black px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 text-center border border-white/10 rounded-lg backdrop-blur-sm opacity-0"
      >
        <div className="text-[10px] sm:text-xs text-white/60 font-mono tracking-widest uppercase mb-1.5 sm:mb-2">
          {chapter}
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl text-white font-cinematic tracking-wide mb-1">
          {title}
        </div>
        {subtitle && (
          <div className="text-[10px] sm:text-xs text-white/50 font-light">
            {subtitle}
          </div>
        )}
      </div>

      <div
        ref={dotsRef}
        className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 flex space-x-2 sm:space-x-3"
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-1 h-1 bg-white rounded-full opacity-0"
            style={{ transform: 'scale(0)' }}
          />
        ))}
      </div>
    </div>
  );
};

// Navigation Dots Component
const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    gsap.fromTo(Array.from(dotsRef.current.children),
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: SCROLL_OFFSET },
        ease: 'power2.inOut'
      });
    }
  }, []);

  return (
    <nav
      ref={dotsRef}
      className="fixed right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
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
};

// Loading Component with Progress
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation (10% increments)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Complete after loading
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 900);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Animated Circle with Progress */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        {/* Outer rotating ring */}
        <svg className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            className="sm:hidden"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            className="hidden sm:block"
          />
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
            className="transition-all duration-200 ease-out sm:hidden"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
            }}
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 58}`}
            strokeDashoffset={`${2 * Math.PI * 58 * (1 - progress / 100)}`}
            className="transition-all duration-200 ease-out hidden sm:block"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
            }}
          />
        </svg>

        {/* Progress percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/80 text-sm sm:text-base font-mono font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <motion.div
          className="text-white/70 text-sm sm:text-base tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          LOADING...
        </motion.div>
      </div>
    </div>
  );
};

// Splash Screen Component with Music Options
const SplashScreen = ({ 
  isVisible, 
  onStart 
}: { 
  isVisible: boolean; 
  onStart: (withMusic: boolean) => void;
}) => {
  const splashRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');

  const handleLoadingComplete = useCallback(() => {
    setPhase('ready');
  }, []);

  const handleStart = useCallback((withMusic: boolean) => {
    if (splashRef.current) {
      gsap.to(splashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          onStart(withMusic);
        }
      });
    }
  }, [onStart]);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-4"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'loading' ? (
          <motion.div
            key="loading-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="ready-phase"
            className="text-center space-y-8 sm:space-y-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >

            {/* Buttons */}
            <motion.div 
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
            {/* Ready indicator */}
            <motion.div
  className="text-white text-3xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  READY
</motion.div>


              {/* Transparent Start Button */}
<motion.button
  onClick={() => handleStart(true)}
  className="group relative px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 bg-transparent border-2 border-white/30 text-white font-medium text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] overflow-hidden backdrop-blur-sm transition-all duration-500"
  whileHover={{ 
    scale: 1.05,
    borderColor: 'rgba(255, 255, 255, 1)',
  }}
  whileTap={{ scale: 0.98 }}
>
  {/* Background putih saat hover */}
  <motion.div
    className="absolute inset-0 bg-transparent group-hover:bg-white transition-all duration-500"
  />

  {/* Efek kilau */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
    initial={{ x: '-100%' }}
    whileHover={{ x: '200%' }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  />

  {/* Teks berubah hitam saat hover */}
  <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold group-hover:text-black transition-colors duration-500">
    START
    <motion.span
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      →
    </motion.span>
  </span>
</motion.button>



              {/* Start Without Music */}
              <motion.button
                onClick={() => handleStart(false)}
                className="group relative text-white/50 hover:text-white/90 text-[10px] sm:text-xs mb-10 tracking-[0.2em] transition-all duration-300 px-3 py-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative">
                  Continue without music
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Ambient Elements Component
const AmbientElements = ({ mousePosition }: { mousePosition: MousePosition }) => {
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
      {/* Mouse-following light */}
      <motion.div
        className="fixed pointer-events-none w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full opacity-[0.02] blur-3xl"
        style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      {/* Particles */}
      <div ref={particlesRef} className="hidden sm:block">
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
      <div className="hidden lg:block">
        <div className="absolute top-0 left-1/4 w-px h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
        <div className="absolute top-0 right-1/3 w-px h-screen bg-gradient-to-b from-transparent via-white/3 to-transparent opacity-50" />
        <div className="absolute top-0 left-2/3 w-px h-screen bg-gradient-to-b from-transparent via-white/4 to-transparent opacity-20" />
      </div>
    </div>
  );
};

// Main Component
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mouse tracking
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

  // Handle start
  const handleStart = useCallback((withMusic: boolean) => {
    setShowSplash(false);
    setHasStarted(true);
    
    // Music implementation
    if (withMusic) {
      // You can add your music file here
      // Example: audioRef.current = new Audio('/path-to-your-music.mp3');
      // audioRef.current.loop = true;
      // audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      console.log('Starting with music...');
    }
  }, []);

  // GSAP initialization
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
  }, [hasStarted]);

  // Cleanup audio on unmount
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
      {/* Splash Screen */}
      <SplashScreen isVisible={showSplash} onStart={handleStart} />

      {/* Main Content - Only render when started */}
      {hasStarted && (
        <>
          {/* Navigation - Import from layout */}
          <Navigation />
          
          <div className="relative">
            <ScrollProgress />
            <NavigationDots />
            <AmbientElements mousePosition={mousePosition} />

            <main className="relative z-20">
              <SceneTransition id="hero" className="!min-h-screen">
                <Hero />
              </SceneTransition>

              <ChapterDivider chapter="Chapter II" title="SKILLS" />

              <SceneTransition id="skills">
                <Skills />
              </SceneTransition>

              <ChapterDivider chapter="Chapter III" title="Projects" />

              <SceneTransition id="projects">
                <Projects />
              </SceneTransition>

              <ChapterDivider chapter="End" title="Contact" />

              <SceneTransition id="contact">
                <Contact />
              </SceneTransition>
            </main>

            {/* Footer - Import from layout */}
            <Footer />

            {/* Back to top button */}
            <motion.button
              onClick={() => {
                gsap.to(window, {
                  duration: 1.5,
                  scrollTo: { y: 0 },
                  ease: 'power2.inOut'
                });
              }}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
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
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </>
      )}
    </>
  );
}