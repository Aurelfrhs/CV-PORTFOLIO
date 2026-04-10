'use client';

import { useEffect, useRef, useState } from 'react';

function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return { ref, isVisible };
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 bg-black overflow-hidden">
      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          <p className="text-sm font-medium text-white/40 tracking-[0.3em] uppercase mb-6">
            About
          </p>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Big Statement */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                Junior<br />
                Backend<br />
                Developer<br />
              </h2>

              {/* Divider */}
              <div className="w-16 h-px bg-white/20 mt-10 mb-10" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: '3+', label: 'Years Experience' },
                  { number: '-', label: 'Projects Built' },
                  { number: '-', label: 'Happy Clients' },
                  { number: '∞', label: 'Cups of Coffee' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/40 tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Bio & Stack */}
            <div className="space-y-10">
              {/* Bio */}
              <div>
                <p className="text-lg text-white/70 leading-relaxed mb-4">
                  Fresh graduate backend developer with a strong interest in building scalable and reliable systems.
                </p>
                <p className="text-base text-white/50 leading-relaxed">
                  Recently graduated from a vocational high school in Software Development. I have hands-on experience developing and improving backend systems, including building real-time applications, designing APIs, and managing databases. My experience includes contributing to an existing football club website (Expose FC) and developing a production leave management system during a 5-month internship.
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-xs text-white/30 tracking-[0.3em] uppercase mb-5">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React', 'Next.js', 'TypeScript', 'Node.js',
                    'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Figma',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm text-white/60 border border-white/10 rounded-full 
                                 hover:border-white/30 hover:text-white/90 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Currently */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-white/50">
                  Currently available for freelance & collaboration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}