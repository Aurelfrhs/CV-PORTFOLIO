'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <p className="text-sm font-medium text-white/40 tracking-[0.3em] uppercase mb-10">
            About
          </p>

          {/* Main Content Grid — 3 columns: text | photo | bio+stack */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-start">

            {/* Left — Big Statement + Stats */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                Junior<br />
                Backend<br />
                Developer
              </h2>

              <div className="w-16 h-px bg-white/20 mt-10 mb-10" />

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

            {/* Center — Profile Photo */}
            <div
              className={`flex justify-center lg:justify-start transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="relative w-56 sm:w-64 lg:w-72 shrink-0">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 border border-white/10 rounded-sm" />
                <div className="absolute -inset-4 border border-white/5 rounded-sm" />

                {/* Photo container */}
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-white/5">
                  <Image
                    src="/about/aku.jpeg"
                    alt="Aurel Fristian"
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                    priority
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Name tag below photo */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/30 tracking-[0.25em] uppercase">
                    Aurel F.R.H.S
                  </span>
                  {/* Available dot */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-white/30">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Bio & Stack */}
            <div
              className={`space-y-10 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
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
                    'Laravel', 'React', 'Next.js', 'TypeScript', 'Node.js',
                    'Tailwind CSS', 'PostgreSQL', 'Figma',
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

              {/* Download CV */}
              <a
                href="/cv/aurel-cv.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white/70 border border-white/20
                           rounded-full hover:border-white/50 hover:text-white transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}