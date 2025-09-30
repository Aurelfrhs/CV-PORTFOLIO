'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

// Simplified icons (no external dependencies)
const Icons = {
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Github: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Play: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

const projects = [
  {
    id: 1,
    title: "Cinematic Web Experience",
    category: "Web Development",
    year: "2024",
    emoji: "🌐",
    description: "An immersive web platform featuring cinematic storytelling, smooth animations, and interactive elements.",
    longDescription: "A comprehensive web experience that combines cinematic storytelling with modern web technologies. Features include scroll-triggered animations, 3D elements, and progressive narrative structure.",
    tech: ["Next.js", "Three.js", "GSAP", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Scroll-triggered animations",
      "3D interactive elements", 
      "Progressive storytelling",
      "Mobile-optimized experience",
      "Performance optimization",
      "Accessibility compliance"
    ],
    challenges: [
      "Balancing performance with visual complexity",
      "Cross-browser animation compatibility",
      "Mobile optimization for heavy animations"
    ],
    outcomes: [
      "40% increase in user engagement",
      "95% performance score",
      "Featured in design showcases"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Visual Design",
    year: "2024",
    emoji: "🎨",
    description: "Complete brand identity design including logo, color palette, typography, and visual guidelines.",
    longDescription: "Comprehensive brand identity system developed for a modern tech startup, including all visual elements and brand guidelines.",
    tech: ["Figma", "Adobe Illustrator", "After Effects", "Photoshop"],
    features: [
      "Logo design & variations",
      "Brand guidelines",
      "Marketing materials",
      "Motion graphics",
      "Digital asset library",
      "Style guide documentation"
    ],
    challenges: [
      "Creating scalable brand system",
      "Ensuring consistency across mediums",
      "Balancing modern with timeless appeal"
    ],
    outcomes: [
      "20% increase in brand recognition",
      "Streamlined design process",
      "Award-winning logo design"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 3,
    title: "React Dashboard Platform",
    category: "Frontend",
    year: "2024",
    emoji: "⚛️",
    description: "Modern admin dashboard with real-time data visualization and intuitive user interface.",
    longDescription: "Feature-rich dashboard platform built with React, featuring real-time analytics, data visualization, and comprehensive admin tools.",
    tech: ["React", "TypeScript", "Recharts", "Zustand", "React Query", "Vite"],
    features: [
      "Real-time analytics",
      "Interactive charts",
      "Role-based access",
      "Dark mode support",
      "Responsive design",
      "API integration"
    ],
    challenges: [
      "Managing complex state",
      "Optimizing render performance",
      "Data synchronization"
    ],
    outcomes: [
      "Improved admin efficiency by 60%",
      "Reduced page load time by 45%",
      "Enhanced user satisfaction scores"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    emoji: "🛒",
    description: "Modern e-commerce solution with payment integration and inventory management.",
    longDescription: "Complete e-commerce platform with user authentication, payment processing, order management, and real-time inventory tracking.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    features: [
      "Secure payment processing",
      "Real-time inventory",
      "Order tracking",
      "User authentication",
      "Admin dashboard",
      "Email notifications"
    ],
    challenges: [
      "Payment security implementation",
      "Scalable architecture design",
      "Real-time data synchronization"
    ],
    outcomes: [
      "Processing 1000+ orders daily",
      "99.9% uptime achieved",
      "5-star customer satisfaction"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 5,
    title: "Mobile App Design",
    category: "UI/UX Design",
    year: "2023",
    emoji: "📱",
    description: "Intuitive mobile application design with focus on user experience and modern aesthetics.",
    longDescription: "User-centered mobile app design featuring intuitive navigation, beautiful UI, and seamless user flows across iOS and Android platforms.",
    tech: ["Figma", "Sketch", "Principle", "Adobe XD"],
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "High-fidelity mockups",
      "Interactive prototypes",
      "Design system",
      "Usability testing"
    ],
    challenges: [
      "Cross-platform consistency",
      "Accessibility requirements",
      "Complex user flows"
    ],
    outcomes: [
      "4.8 star app rating",
      "30% increase in retention",
      "Design award finalist"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 6,
    title: "AI Content Generator",
    category: "AI/ML",
    year: "2024",
    emoji: "🤖",
    description: "AI-powered content generation tool using advanced machine learning models.",
    longDescription: "Intelligent content generation platform leveraging state-of-the-art AI models to create high-quality written content, images, and multimedia assets.",
    tech: ["Python", "TensorFlow", "OpenAI API", "FastAPI", "React", "MongoDB"],
    features: [
      "Multiple content types",
      "Custom AI training",
      "Batch processing",
      "API integration",
      "Content analytics",
      "Export options"
    ],
    challenges: [
      "Model optimization",
      "API cost management",
      "Content quality control"
    ],
    outcomes: [
      "10,000+ users onboarded",
      "95% content approval rate",
      "50% time savings reported"
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  }
];

export default function ResponsiveProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const modalRef = useRef(null);

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(projects.map(p => p.category)))], 
    []
  );

  const filteredProjects = useMemo(() => 
    activeCategory === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === 'Escape') setSelectedProject(null);
  //   };
  //   window.addEventListener('keydown', handleEscape);
  //   return () => window.removeEventListener('keydown', handleEscape);
  // }, []);

  // useEffect(() => {
  //   if (selectedProject) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [selectedProject]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeIn">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                Projects
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
              {categories.map((category, idx) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  // onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                  style={{
                    animation: 'slideUp 0.6s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/20 h-full">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-800">
                      <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70">
                        {project.emoji}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Icons.Play />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 sm:px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                        <span className="text-xs text-white/60 font-mono">{project.year}</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.tech.slice(0, 3).map((tech, idx) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 sm:py-1 bg-white/10 text-white/80 text-xs rounded-full font-mono backdrop-blur-sm"
                            style={{
                              animation: 'fadeIn 0.4s ease-out forwards',
                              animationDelay: `${idx * 0.1}s`,
                              opacity: 0
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-0.5 sm:py-1 text-white/60 text-xs">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, '_blank');
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Icons.ExternalLink />
                          <span className="hidden sm:inline">Live</span>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank');
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          <Icons.Github />
                          <span className="hidden sm:inline">Code</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                View All Projects
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <Icons.ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>

        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedProject(null)}
          >
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-slideUp"
            >
              <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* <div className="text-3xl sm:text-4xl flex-shrink-0">{selectedProject.emoji}</div> */}
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                        {/* {selectedProject.title} */}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60">
                        {/* {selectedProject.category} • {selectedProject.year} */}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Icons.Close />
                  </button>
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    // href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-black hover:bg-white/90 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105"
                  >
                    <Icons.ExternalLink />
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </a>
                  <a
                    // href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/30 text-white hover:bg-white/10 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105"
                  >
                    <Icons.Github />
                    <span className="hidden sm:inline">Source Code</span>
                    <span className="sm:hidden">Code</span>
                  </a>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-180px)] sm:max-h-[calc(90vh-200px)]">
                <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {['overview', 'tech', 'process', 'results'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-[80px] px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium capitalize transition-all ${
                          activeTab === tab
                            ? 'bg-white/20 text-white border-b-2 border-white'
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Project Description</h4>
                        {/* <p className="text-sm sm:text-base text-white/80 leading-relaxed">{selectedProject.longDescription}</p> */}
                      </div>
                      
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Key Features</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {/* {selectedProject.features.map((feature, index) => (
                            <div 
                              key={index} 
                              className="flex items-center gap-2 text-xs sm:text-sm text-white/70 p-2 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                              style={{
                                animation: 'slideIn 0.4s ease-out forwards',
                                animationDelay: `${index * 0.05}s`,
                                opacity: 0
                              }}
                            >
                              <Icons.Zap />
                              <span>{feature}</span>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Technology Stack</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                          {/* {selectedProject.tech.map((tech, idx) => (
                            <div
                              key={tech}
                              className="p-2 sm:p-3 bg-white/10 rounded-lg text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer"
                              style={{
                                animation: 'scaleIn 0.4s ease-out forwards',
                                animationDelay: `${idx * 0.05}s`,
                                opacity: 0
                              }}
                            >
                              <div className="text-xs sm:text-sm text-white/90 font-mono">{tech}</div>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'process' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Challenges & Solutions</h4>
                        <div className="space-y-2 sm:space-y-3">
                          {/* {selectedProject.challenges.map((challenge, index) => (
                            <div 
                              key={index} 
                              className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/15 transition-colors"
                              style={{
                                animation: 'slideIn 0.4s ease-out forwards',
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                              }}
                            >
                              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{challenge}</p>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Project Outcomes</h4>
                        <div className="space-y-2 sm:space-y-3">
                          {/* {selectedProject.outcomes.map((outcome, index) => (
                            <div 
                              key={index} 
                              className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/15 transition-colors"
                              style={{
                                animation: 'slideIn 0.4s ease-out forwards',
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                              }}
                            >
                              <p className="text-xs sm:text-sm text-white/80 font-semibold">{outcome}</p>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}