'use client';

import { motion, useAnimation, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ============================================================================
// Constants
// ============================================================================

const SPRING_CONFIG = { damping: 25, stiffness: 150 };
const SCROLL_OFFSETS: ["start start", "end start"] = ["start start", "end start"];

const ANIMATION_VARIANTS = {
  title: {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.4,
        ease: [0.6, 0.05, 0.2, 0.9] as [number, number, number, number],
        staggerChildren: 0.08
      }
    }
  },
  letter: {
    hidden: { opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9,
        ease: [0.6, 0.05, 0.2, 0.9] as [number, number, number, number]
      }
    }
  },
  subtitle: {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2,
        delay: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  },
  scrollIndicator: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        delay: 1.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  }
};

// ============================================================================
// Hooks
// ============================================================================

const useMouseTracking = (heroRef: React.RefObject<HTMLDivElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, SPRING_CONFIG);
  const mouseYSpring = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          mouseX.set(x);
          mouseY.set(y);
        }
      });
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [heroRef, mouseX, mouseY]);

  return { mouseXSpring, mouseYSpring };
};

const useScrollAnimations = (heroRef: React.RefObject<HTMLDivElement | null>) => {
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: SCROLL_OFFSETS
  });

  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -250]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 8]);
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const titleOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, -80]);
  const subtitleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const bgRotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const gridX = useTransform(scrollY, [0, 1000], [0, -50]);
  const gridY = useTransform(scrollY, [0, 1000], [0, -50]);

  return {
    y1, y2, y3,
    opacity,
    scale,
    blur,
    titleY,
    titleScale,
    titleOpacity,
    subtitleY,
    subtitleOpacity,
    bgRotate,
    bgScale,
    gridX,
    gridY,
    scrollY,
    scrollYProgress
  };
};

// ============================================================================
// Sub Components
// ============================================================================

const BackgroundElements = ({ 
  y1, y2, y3, 
  bgRotate, bgScale, 
  scrollY, scrollYProgress,
  gridX, gridY,
  blur
}: {
  y1: any;
  y2: any;
  y3: any;
  bgRotate: any;
  bgScale: any;
  scrollY: any;
  scrollYProgress: any;
  gridX: any;
  gridY: any;
  blur: any;
}) => (
  <motion.div className="absolute inset-0" style={{ filter: useTransform(blur, (b: number) => `blur(${b}px)`) }}>
    <motion.div
      className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
      style={{ scale: bgScale }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div className="absolute inset-0">
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full"
        style={{ y: y1, rotate: bgRotate, scale: useTransform(scrollYProgress, [0, 1], [1, 0.5]) }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-24 h-24 border border-white/5"
        style={{ y: y2, rotate: useTransform(bgRotate, (r: number) => -r), scale: useTransform(scrollYProgress, [0, 1], [1, 0.3]) }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl"
        style={{ y: y3, scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.6]) }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-40 h-40 border-2 border-white/5 rounded-lg"
        style={{ 
          y: useTransform(scrollY, [0, 500], [0, 200]),
          rotate: useTransform(scrollY, [0, 500], [0, 180]),
          opacity: useTransform(scrollY, [0, 300], [0.3, 0])
        }}
      />
    </motion.div>

    <motion.div className="absolute inset-0 opacity-[0.02]" style={{ x: gridX, y: gridY }}>
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />
    </motion.div>
  </motion.div>
);

const FloatingParticles = ({ scrollY }: { scrollY: any }) => {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 2
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/10 rounded-full"
          style={{
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            left: particle.left,
            top: particle.top,
            y: useTransform(scrollY, [0, 1000], [0, -500 + particle.id * 50]),
            opacity: useTransform(scrollY, [0, 300], [0.3, 0])
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const DecorativeEffects = ({ scrollY, scrollYProgress }: { scrollY: any; scrollYProgress: any }) => (
  <>
    {/* Morphing Ring System */}
    <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <motion.svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        className="absolute"
        style={{
          opacity: useTransform(scrollY, [0, 400], [0.6, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
        }}
      >
        {[200, 250, 300].map((r, i) => (
          <motion.circle
            key={r}
            cx="400"
            cy="400"
            r={r}
            fill="none"
            stroke={`rgba(255,255,255,${0.1 - i * 0.03})`}
            strokeWidth={2 - i * 0.5}
            strokeDasharray={`${10 + i * 5} ${20 + i * 5}`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.svg>
    </motion.div>

    {/* Binary Rain Effect */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-white/5 font-mono text-xs"
          style={{ left: `${i * 5}%`, top: '-10%' }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
        </motion.div>
      ))}
    </div>

    {/* Holographic Scanner */}
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        boxShadow: "0 0 20px rgba(255,255,255,0.5)",
        opacity: useTransform(scrollY, [0, 300], [0.7, 0])
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />

    {/* Vignette Pulse */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        opacity: useTransform(scrollY, [0, 300], [1, 0.5])
      }}
      animate={{ opacity: [0.8, 0.95, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

const ScrollIndicator = ({ controls, scrollY }: any) => {
  const handleClick = useCallback(() => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.scrollIndicator}
      initial="hidden"
      animate={controls}
      style={{ 
        opacity: useTransform(scrollY, [0, 150], [1, 0]),
        y: useTransform(scrollY, [0, 200], [0, 100])
      }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        className="flex flex-col items-center space-y-4 cursor-pointer"
        onClick={handleClick}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-white/60 text-sm tracking-wider uppercase">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{
            borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.3)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  const { mouseXSpring, mouseYSpring } = useMouseTracking(heroRef);
  const scrollAnimations = useScrollAnimations(heroRef);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 300);
    return () => clearTimeout(timer);
  }, [controls]);

  const title = "AUREL FRISTIAN";
  const subtitle = "Junior Frontend Developer";

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ opacity: scrollAnimations.opacity, scale: scrollAnimations.scale }}
    >
      <BackgroundElements {...scrollAnimations} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Subtitle */}
        <motion.div
          variants={ANIMATION_VARIANTS.subtitle}
          initial="hidden"
          animate={controls}
          style={{ y: scrollAnimations.subtitleY, opacity: scrollAnimations.subtitleOpacity }}
          className="mb-8"
        >
          <div className="font-work text-xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wider">
            {subtitle.split(' ').map((word, index) => (
              <motion.span
                key={`subtitle-${index}`}
                className="inline-block mr-4"
                whileHover={{ scale: 1.05, color: "#ffffff", transition: { duration: 0.2 } }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-8"
          variants={ANIMATION_VARIANTS.title}
          initial="hidden"
          animate={controls}
          style={{ 
            y: scrollAnimations.titleY, 
            scale: scrollAnimations.titleScale,
            opacity: scrollAnimations.titleOpacity
          }}
        >
          <div className="text-6xl md:text-8xl lg:text-9xl text-white leading-none font-bold">
            {title.split(' ').map((word, wordIndex) => (
              <div key={`word-${wordIndex}`} className="flex justify-center">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`letter-${wordIndex}-${letterIndex}`}
                    variants={ANIMATION_VARIANTS.letter}
                    className="inline-block"
                    whileHover={{
                      scale: 1.1,
                      color: "#ffffff",
                      textShadow: "0 0 20px rgba(255,255,255,0.5)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ 
            opacity: useTransform(scrollAnimations.scrollY, [0, 200], [1, 0]),
            y: useTransform(scrollAnimations.scrollY, [0, 300], [0, -50])
          }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Bandung Native, <span className="text-white/80 font-medium">Indonesia</span>
          </p>
        </motion.div>
      </div>

      <ScrollIndicator controls={controls} scrollY={scrollAnimations.scrollY} />
      <FloatingParticles scrollY={scrollAnimations.scrollY} />
      <DecorativeEffects scrollY={scrollAnimations.scrollY} scrollYProgress={scrollAnimations.scale} />
    </motion.div>
  );
};