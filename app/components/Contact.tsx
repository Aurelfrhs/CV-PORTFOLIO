'use client';

import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// Main Contact Component
export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 bg-black overflow-hidden"
    >
      <div 
        ref={ref}
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Get In Touch */}
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-gray-500 mb-8">
              Get In Touch
            </h2>
            
            {/* Contact Me - Main Title */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
              Contact Me
            </h1>
          </div>

          {/* Email and LinkedIn */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8">
            {/* Email */}
            <a 
              href="mailto:aurelfristian10@gmail.com"
              className="group flex items-center gap-3 hover:opacity-70 transition-opacity duration-300"
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-lg sm:text-xl text-white font-normal">
                aurelfristian10@gmail.com
              </span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/yourname"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 hover:opacity-70 transition-opacity duration-300"
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-lg sm:text-xl text-white font-normal">
                Linkedin
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}