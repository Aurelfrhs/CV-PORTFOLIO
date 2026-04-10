'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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

// ============================================================
// Tambahkan project Anda di sini
// slug akan digunakan sebagai URL: /project/[slug]
// image adalah path gambar dari folder /public/projects/
// ============================================================
const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    image: '/projects/project-one.jpg',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    image: '/projects/project-two.jpg',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    image: '/projects/project-three.jpg',
  }
];

function ProjectCard({
  slug,
  title,
  image,
  index,
  isVisible,
}: {
  slug: string;
  title: string;
  image: string;
  index: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/project/${slug}`}
      className="block group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-white/5 rounded-sm">
        {/* Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Arrow icon on hover */}
        <div
          className="absolute top-4 right-4 w-8 h-8 border border-white/80 rounded-full 
                     flex items-center justify-center text-white transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Title below image */}
      <p className="mt-3 text-sm text-white/50 group-hover:text-white/90 transition-colors duration-300 tracking-wide">
        {title}
      </p>
    </Link>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 bg-black">
      <div
        ref={ref}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Header */}
        <div
          className="mb-12 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-sm font-medium text-white/40 tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-none tracking-tight">
            Projects
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              image={project.image}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}