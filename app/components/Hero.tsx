'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.6, 0.05, 0.2, 0.9],
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.05, 0.2, 0.9]
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1,
        ease: "easeOut"
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1.5,
        ease: "easeOut"
      }
    }
  };

  const title = "AUREL DEV";
  const subtitle = "Junior Frontend Developer";

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Parallax elements */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
        >
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full"
            style={{ y: y1 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-24 h-24 border border-white/5"
            style={{ y: y2 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl"
            style={{ y: y1 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }} 
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
{/* Subtitle */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate={controls}
          className="font-work mt-12"
        >
          <div className="text-1xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wider">
            {subtitle.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4"
                whileHover={{
                  scale: 1.05,
                  color: "#ffffff",
                  transition: { duration: 0.2 }
                }}
                style={{
                  x: mousePosition.x * (index % 2 === 0 ? 10 : -10),
                  y: mousePosition.y * (index % 2 === 0 ? -5 : 5),
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

  <motion.div
  className="font-big mb-8"
  variants={titleVariants}
  initial="hidden"
  animate={controls}
>
  <div className="text-[9rem] md:text-[10rem] lg:text-[12rem] text-white leading-none">
    {title.split(' ').map((word, wordIndex) => (
      <div key={wordIndex} className="flex justify-center">
        {word.split('').map((letter, letterIndex) => (
          <motion.span
            key={letterIndex}
            variants={letterVariants}
            className="inline-block"
            style={{
              transformOrigin: "50% 50% -50px",
              x: mousePosition.x * (letterIndex - word.length / 2) * 2,
              y: mousePosition.y * (letterIndex % 2 === 0 ? -5 : 5),
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
        ))}
      </div>
    ))}
  </div>
</motion.div>


        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-work mb-8"
        >
          <p className="font-geits-mono text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Bandung Native,{' '}
            <span className="text-white/80 font-medium">Indonesia</span>{' '}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={controls}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center space-y-4 cursor-pointer"
          onClick={() => document.getElementById('prologue')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* Ambient floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  );
};