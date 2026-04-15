'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
// Tambahkan / edit project di sini
// ============================================================
export interface Project {
  slug: string;
  title: string;
  image: string;
  year?: string;
  category?: string;
  description: string;
  role?: string;
  techStack: { name: string; color?: string }[];
  liveUrl?: string;
  repoUrl?: string;
}

const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'ExposeFC Website',
    image: '/projects/ExposeFC.png',
    year: '2025',
    category: 'Web App',
    description:
    "A responsive football club website built for Expose FC, offering structured content such as team profiles, match schedules, and historical match data with an intuitive UI.",
    role: 'Laravel Developer',
    techStack: [
      { name: 'Laravel' },
    ],
    liveUrl: 'https://expolbansoccer.com/',
    repoUrl: 'https://github.com/Aurelfrhs',
  },
];

// ============================================================
// Tech badge color map
// ============================================================
const techColors: Record<string, string> = {
  'Next.js': 'bg-white/10 text-white/80 border-white/15',
  'React': 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  'TypeScript': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'Node.js': 'bg-green-500/10 text-green-300 border-green-500/20',
  'Express': 'bg-white/10 text-white/80 border-white/15',
  'PostgreSQL': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  'MySQL': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  'Prisma': 'bg-teal-500/10 text-teal-300 border-teal-500/20',
  'Tailwind CSS': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'Figma': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
};
const defaultBadge = 'bg-white/10 text-white/70 border-white/15';

// ============================================================
// Modal Component
// ============================================================
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto
                   bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl
                   animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge on image */}
          {project.category && (
            <span className="absolute top-4 left-4 text-xs text-white/70 border border-white/20 
                             bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full tracking-widest uppercase">
              {project.category}
            </span>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                       bg-black/50 backdrop-blur-sm border border-white/20 rounded-full
                       text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                {project.year && (
                  <span className="text-xs text-white/30 tracking-widest">{project.year}</span>
                )}
                {project.role && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs text-white/40">{project.role}</span>
                  </>
                )}
              </div>
            </div>

            {/* Action links */}
            <div className="flex items-center gap-2 shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/60
                             border border-white/15 rounded-full hover:border-white/40
                             hover:text-white transition-all duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 98 96" fill="currentColor">
                    <path d="M49 0C22 0 0 22 0 49c0 21.6 14 40 33.5 46.5 2.5.5 3.4-1.1 3.4-2.4v-8.3c-13.6 3-16.5-5.8-16.5-5.8-2.3-6-5.5-7.6-5.5-7.6-4.5-3 .3-3 .3-3 5 .4 7.6 5.2 7.6 5.2 4.4 7.6 11.5 5.4 14.3 4.1.4-3.2 1.7-5.4 3-6.6-10.8-1.2-22.2-5.5-22.2-24.3 0-5.4 1.9-9.8 5.1-13.3-.5-1.2-2.2-6.1.5-12.8 0 0 4.1-1.3 13.5 5a46.6 46.6 0 0 1 24.6 0c9.4-6.3 13.5-5 13.5-5 2.7 6.7 1 11.6.5 12.8 3.2 3.5 5.1 7.9 5.1 13.3 0 18.9-11.5 23.1-22.3 24.3 1.7 1.5 3.3 4.5 3.3 9v13.3c0 1.3.9 2.9 3.5 2.4A49 49 0 0 0 98 49C98 22 76 0 49 0z" />
                  </svg>
                  Repo
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white
                             bg-white/10 border border-white/20 rounded-full hover:bg-white/20
                             transition-all duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Live
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Description */}
          <p className="text-base text-white/60 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div>
            <p className="text-xs text-white/25 tracking-[0.25em] uppercase mb-4">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1.5 text-sm border rounded-full transition-all duration-200
                              ${techColors[tech.name] ?? defaultBadge}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Project Card
// ============================================================
function ProjectCard({
  project,
  index,
  isVisible,
  onClick,
}: {
  project: Project;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="block text-left group w-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-white/5 rounded-sm">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* "View Details" label on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span className="flex items-center gap-2 px-4 py-2 border border-white/50 rounded-full
                           text-sm text-white tracking-wide backdrop-blur-sm bg-white/5">
            View Details
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Category badge */}
        {project.category && (
          <span className="absolute top-3 left-3 text-[10px] text-white/50 border border-white/15
                           bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full tracking-widest uppercase">
            {project.category}
          </span>
        )}
      </div>

      {/* Title + year below */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-white/50 group-hover:text-white/90 transition-colors duration-300 tracking-wide">
          {project.title}
        </p>
        {project.year && (
          <span className="text-xs text-white/25">{project.year}</span>
        )}
      </div>

      {/* Mini tech badges below title */}
      <div className="mt-2 flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech.name} className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
            {tech.name}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-[10px] text-white/20 px-1">+{project.techStack.length - 3}</span>
        )}
      </div>
    </button>
  );
}

// ============================================================
// Main Projects Section
// ============================================================
export default function Projects() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <>
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                isVisible={isVisible}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={handleClose} />
      )}
    </>
  );
}