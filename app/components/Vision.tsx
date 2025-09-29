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

// Vision card component
function VisionCard({ 
  vision, 
  index, 
  delay = 0 
}: { 
  vision: any;
  index: number;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div 
      ref={ref}
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/2 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
            {vision.icon}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white font-playfair">
            {vision.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 leading-relaxed">
            {vision.description}
          </p>
          
          {/* Timeline */}
          <div className="flex items-center gap-2 text-sm">
            <div className="px-3 py-1 bg-white/10 text-white/80 rounded-full font-jetbrains">
              {vision.timeline}
            </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>
      </div>
    </div>
  );
}

// Timeline component
function Timeline() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  
  const milestones = [
    {
      year: "2024",
      title: "Current Focus",
      description: "Mastering cinematic web experiences and advanced storytelling techniques.",
      status: "active"
    },
    {
      year: "2025",
      title: "Creative Expansion",
      description: "Launch creative studio offering comprehensive digital storytelling services.",
      status: "upcoming"
    },
    {
      year: "2026",
      title: "Global Reach",
      description: "Collaborate with international brands on large-scale digital experiences.",
      status: "future"
    },
    {
      year: "2027+",
      title: "Industry Leadership",
      description: "Become a recognized voice in cinematic web design and creative technology.",
      status: "future"
    }
  ];

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair mb-4">
          The Journey Ahead
        </h3>
        <div className="w-24 h-px bg-white/30 mx-auto"></div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-white/40"></div>
        
        {/* Milestones */}
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.year}
              className={`relative flex items-start gap-8 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-white font-jetbrains ${
                milestone.status === 'active' 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/10 border-white/30'
              }`}>
                {milestone.year.slice(-2)}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                  <h4 className="text-lg font-bold text-white font-playfair mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-white/70">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Manifesto section
function Manifesto() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div 
      ref={ref}
      className={`relative p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
      </div>
      
      <div className="relative z-10 text-center space-y-8">
        <div className="text-6xl mb-6">🌟</div>
        
        <blockquote className="text-2xl md:text-3xl font-playfair text-white italic leading-relaxed max-w-4xl mx-auto">
          "The future belongs to those who dare to dream beyond the boundaries of conventional storytelling, 
          who embrace technology as a canvas for human emotion, and who never forget that behind every 
          pixel lies the potential to inspire, to move, and to transform."
        </blockquote>
        
        <div className="pt-6">
          <div className="w-32 h-px bg-white/50 mx-auto mb-4"></div>
          <p className="text-white/80 font-jetbrains tracking-widest uppercase text-sm">
            Personal Manifesto
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Vision Component  
export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  const visions = [
    {
      icon: "🚀",
      title: "Innovation Leadership",
      description: "Pioneer new approaches to digital storytelling that push the boundaries of what's possible in web experiences.",
      timeline: "2024-2025"
    },
    {
      icon: "🎭",
      title: "Creative Studio",
      description: "Establish a creative studio that specializes in cinematic web experiences for premium brands and storytellers.",
      timeline: "2025-2026"
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description: "Create digital experiences that reach and inspire audiences worldwide, transcending cultural and linguistic barriers.",
      timeline: "2026-2027"
    },
    {
      icon: "📚",
      title: "Knowledge Sharing",
      description: "Share insights and techniques through workshops, courses, and industry speaking engagements.",
      timeline: "2027+"
    },
    {
      icon: "🤝",
      title: "Community Building",
      description: "Foster a community of creative technologists who believe in the power of storytelling through code.",
      timeline: "Ongoing"
    },
    {
      icon: "🎯",
      title: "Purpose-Driven Work",
      description: "Focus on projects that create positive impact, whether through education, social causes, or cultural preservation.",
      timeline: "Always"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-gray-900/10 to-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-white/1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/2 rounded-full blur-2xl"></div>
        
        {/* Constellation dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-white/80 font-jetbrains text-sm tracking-widest uppercase">
                Chapter IV: The Vision
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-6">
              Future Aspirations
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              The journey of a thousand miles begins with a single step. Here's where that path leads, 
              illuminated by dreams and guided by purpose.
            </p>
          </div>

          {/* Vision cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {visions.map((vision, index) => (
              <VisionCard
                key={vision.title}
                vision={vision}
                index={index}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Timeline section */}
          <div className="mb-24">
            <Timeline />
          </div>

          {/* Manifesto */}
          <Manifesto />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}