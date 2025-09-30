'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useAnimation, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother mouse parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll-based transformations
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Multiple scroll-triggered animations
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -250]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 8]);
  
  // Title scroll effects
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const titleOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  
  // Subtitle scroll effects
  const subtitleY = useTransform(scrollY, [0, 500], [0, -80]);
  const subtitleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // Background elements scroll
  const bgRotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  
  // Grid movement
  const gridX = useTransform(scrollY, [0, 1000], [0, -50]);
  const gridY = useTransform(scrollY, [0, 1000], [0, -50]);

   // Combined transforms for parallax elements
  const parallaxX = useTransform(
    [mouseXSpring, scrollY],
    ([mx, sy]: [number, number]) => mx * 40 + sy * 0.05
  );
  const parallaxY = useTransform(
    [mouseYSpring, scrollY],
    ([my, sy]: [number, number]) => my * 40 - sy * 0.1
  );

  // Optimized mouse tracking with RAF
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
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

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [mouseX, mouseY]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 300);

    return () => clearTimeout(timer);
  }, [controls]);

  // Memoized animation variants
  const titleVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.4,
        ease: [0.6, 0.05, 0.2, 0.9],
        staggerChildren: 0.08
      }
    }
  }), []);

  const letterVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: -90,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9,
        ease: [0.6, 0.05, 0.2, 0.9]
      }
    }
  }), []);

  const subtitleVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(12px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const scrollIndicatorVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        delay: 1.8,
        ease: "easeOut"
      }
    }
  }), []);

  const handleScrollClick = useCallback(() => {
    document.getElementById('prologue')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const title = "AUREL FRISTIAN";
  const subtitle = "Junior Frontend Developer";

  // Memoized floating particles
  const floatingParticles = useMemo(() => 
    [...Array(12)].map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 3,
      size: 1 + Math.random() * 2
    }))
  , []);

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ 
        opacity,
        scale
      }}
    >
      {/* Dynamic background with scroll effects */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          filter: useTransform(blur, (b) => `blur(${b}px)`)
        }}
      >
        {/* Animated gradient background with scroll */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
          style={{ scale: bgScale }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Parallax elements with scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: parallaxX,
            y: parallaxY,
          }}
        >
          {/* Floating geometric shapes with scroll */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full"
            style={{ 
              y: y1,
              rotate: bgRotate,
              scale: useTransform(scrollYProgress, [0, 1], [1, 0.5])
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-24 h-24 border border-white/5"
            style={{ 
              y: y2,
              rotate: useTransform(bgRotate, (r) => -r),
              scale: useTransform(scrollYProgress, [0, 1], [1, 0.3])
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl"
            style={{ 
              y: y3,
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.6])
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Additional scroll-reactive shapes */}
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-40 h-40 border-2 border-white/5 rounded-lg"
            style={{ 
              y: useTransform(scrollY, [0, 500], [0, 200]),
              rotate: useTransform(scrollY, [0, 500], [0, 180]),
              opacity: useTransform(scrollY, [0, 300], [0.3, 0])
            }}
          />
        </motion.div>

        {/* Grid overlay with scroll movement */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ x: gridX, y: gridY }}
        >
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }} 
          />
        </motion.div>
      </motion.div>

      {/* Main content with scroll triggers */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Subtitle with scroll */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate={controls}
          style={{ 
            y: subtitleY, 
            opacity: subtitleOpacity 
          }}
          className="mb-8"
        >
          <div className="text-xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wider">
            {subtitle.split(' ').map((word, index) => {
              const wordX = useTransform(
                [mouseXSpring, scrollY],
                ([mx, sy]) => mx * (index % 2 === 0 ? 15 : -15) - sy * 0.05
              );
              const wordY = useTransform(
                [mouseYSpring, scrollY],
                ([my, sy]) => my * (index % 2 === 0 ? -8 : 8) - sy * 0.03
              );
              
              return (
                <motion.span
                  key={`subtitle-${index}`}
                  className="inline-block mr-4"
                  style={{ x: wordX, y: wordY }}
                  whileHover={{
                    scale: 1.05,
                    color: "#ffffff",
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Title with enhanced scroll effects */}
        <motion.div
          className="mb-8"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          style={{ 
            y: titleY, 
            scale: titleScale,
            opacity: titleOpacity
          }}
        >
          <div className="text-6xl md:text-8xl lg:text-9xl text-white leading-none font-bold">
            {title.split(' ').map((word, wordIndex) => (
              <div key={`word-${wordIndex}`} className="flex justify-center">
                {word.split('').map((letter, letterIndex) => {
                  const letterX = useTransform(
                    [mouseXSpring, scrollY],
                    ([mx, sy]) => mx * (letterIndex - word.length / 2) * 3 - sy * 0.1
                  );
                  const letterY = useTransform(
                    [mouseYSpring, scrollY],
                    ([my, sy]) => my * (letterIndex % 2 === 0 ? -8 : 8) - sy * 0.15
                  );
                  const letterRotateY = useTransform(
                    scrollY,
                    [0, 500],
                    [0, letterIndex % 2 === 0 ? 20 : -20]
                  );
                  
                  return (
                    <motion.span
                      key={`letter-${wordIndex}-${letterIndex}`}
                      variants={letterVariants}
                      className="inline-block"
                      style={{
                        transformOrigin: "50% 50% -50px",
                        x: letterX,
                        y: letterY,
                        rotateY: letterRotateY
                      }}
                      whileHover={{
                        scale: 1.1,
                        color: "#ffffff",
                        textShadow: "0 0 20px rgba(255,255,255,0.5)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Description with scroll fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ 
            opacity: useTransform(scrollY, [0, 200], [1, 0]),
            y: useTransform(scrollY, [0, 300], [0, -50])
          }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Bandung Native,{' '}
            <span className="text-white/80 font-medium">Indonesia</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator with parallax */}
      <motion.div
        variants={scrollIndicatorVariants}
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
          onClick={handleScrollClick}
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

      {/* Ambient floating elements with scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingParticles.map((particle) => (
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

      {/* Background light effects with scroll */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1, 2]),
            opacity: useTransform(scrollY, [0, 400], [0.5, 0])
          }}
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1.2, 0.5]),
            opacity: useTransform(scrollY, [0, 300], [0.3, 0])
          }}
          animate={{
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  );
}