'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/ramdnk_" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/aurel-fristian-ramdhani-hatorangan-simanjuntak" },
    { icon: "github", label: "GitHub", href: "https://github.com/Aurelfrhs" },
    { icon: "email", label: "Email", href: "mailto:aurel.dev@email.com" }
  ];

  const navigationLinks = [
    { label: "Hero", href: "#hero" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    if (!footerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black text-white py-16 sm:py-20 border-t border-white/10 overflow-hidden"
    >
      {/* Background decoration - matching page.tsx aesthetic */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Vertical lines - matching ambient elements */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent opacity-50" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/4 to-transparent opacity-20" />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />
      
      <div ref={contentRef} className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-white/30"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold tracking-[0.2em]">AUREL</h3>
            </motion.div>
            
            <motion.p 
              className="text-white/60 leading-relaxed text-base lg:text-lg max-w-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Crafting visual narratives that transcend ordinary storytelling through modern web technologies and cinematic experiences.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(255,255,255,0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Navigation Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base lg:text-lg font-semibold text-white tracking-wider">Navigate</h4>
            <div className="flex flex-col space-y-3">
              {navigationLinks.map((link, index) => (
                <motion.a 
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-white transition-all duration-300 group flex items-center text-sm lg:text-base"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="w-0 group-hover:w-4 h-px bg-white/40 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base lg:text-lg font-semibold text-white tracking-wider">Connect</h4>
            <div className="space-y-3 text-white/50 text-sm lg:text-base">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                <span>aurel.dev@email.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                <span>Bandung, Indonesia</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                <span className="text-green-400/70">Available for projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-xs sm:text-sm tracking-wide">
              © 2025 Aurel Dev. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-white/50 text-xs sm:text-sm">
              <motion.a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms
              </motion.a>
              <span className="text-white/30">•</span>
              <span className="tracking-wider">Made with ❤️ and lots of ☕</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}