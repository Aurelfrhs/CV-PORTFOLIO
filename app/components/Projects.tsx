'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Play, X, ArrowRight, Zap } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  videoUrl?: string;
  screenshots: string[];
  challenges: string[];
  outcomes: string[];
}

// Enhanced project card with GSAP animations
function ProjectCard({ 
  project, 
  index, 
  isActive, 
  onClick 
}: { 
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    // GSAP scroll-triggered animation
    gsap.fromTo(card, 
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer perspective-1000"
      onClick={onClick}
      layout
    >
      <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
        {/* Project image with overlay */}
        <div className="relative h-64 overflow-hidden">
          <div 
            ref={imageRef}
            className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-6xl opacity-50"
          >
            {project.category === 'Web Development' && '🌐'}
            {project.category === 'Visual Design' && '🎨'}
            {project.category === 'Frontend' && '⚛️'}
            {project.category === 'Full Stack' && '⚡'}
            {project.category === 'Motion Design' && '🎬'}
            {project.category === 'UI/UX Design' && '📱'}
          </div>
          
          {/* Overlay with play button */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active indicator */}
          {isActive && (
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full animate-pulse" />
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
              {project.category}
            </Badge>
            <span className="text-xs text-white/60 font-mono">{project.year}</span>
          </div>
          
          <CardTitle className="text-xl font-bold text-white font-playfair mb-3">
            {project.title}
          </CardTitle>
          
          <CardDescription className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </CardDescription>
          
          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: techIndex * 0.1 }}
                className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full font-mono"
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-white/60 text-xs">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ExternalLink className="w-4 h-4 mr-1" />
              Live
            </Button>
            <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <Github className="w-4 h-4 mr-1" />
              Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Enhanced project detail modal with tabs
function ProjectDetailModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border-white/20 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col"
        >
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {project.category === 'Web Development' && '🌐'}
                  {project.category === 'Visual Design' && '🎨'}
                  {project.category === 'Frontend' && '⚛️'}
                  {project.category === 'Full Stack' && '⚡'}
                  {project.category === 'Motion Design' && '🎬'}
                  {project.category === 'UI/UX Design' && '📱'}
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold font-playfair">
                    {project.title}
                  </DialogTitle>
                  <p className="text-white/60 font-mono">
                    {project.category} • {project.year}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" asChild className="bg-white text-black hover:bg-white/90">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto mt-6">
            <Tabs defaultValue="overview" className="h-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tech" className="text-white data-[state=active]:bg-white/20">
                  Technology
                </TabsTrigger>
                <TabsTrigger value="process" className="text-white data-[state=active]:bg-white/20">
                  Process
                </TabsTrigger>
                <TabsTrigger value="results" className="text-white data-[state=active]:bg-white/20">
                  Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 font-playfair">Project Description</h3>
                  <p className="text-white/80 leading-relaxed">{project.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 font-playfair">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-white/70"
                      >
                        <Zap className="w-4 h-4 text-white/50" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tech" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 font-playfair">Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 bg-white/10 rounded-lg text-center hover:bg-white/20 transition-colors"
                      >
                        <div className="text-sm font-mono text-white/90">{tech}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 font-playfair">Architecture & Performance</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-white mb-2">Frontend Architecture</h4>
                      <p className="text-white/70 text-sm">Component-based architecture with modern React patterns, optimized for performance and maintainability.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-white mb-2">Performance Optimization</h4>
                      <p className="text-white/70 text-sm">Lazy loading, code splitting, and efficient state management for optimal user experience.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 font-playfair">Development Process</h3>
                  <div className="space-y-4">
                    {['Planning & Research', 'Design & Prototyping', 'Development', 'Testing & Optimization'].map((phase, index) => (
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{phase}</h4>
                          <p className="text-white/60 text-sm">Detailed phase description would go here</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 font-playfair">Challenges & Solutions</h3>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-white/80 text-sm">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 font-playfair">Project Outcomes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Key Metrics</h4>
                      {['90% Performance Score', '100% Accessibility', '95% User Satisfaction', '50% Load Time Improvement'].map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                        >
                          <div className="text-green-400 font-semibold">{metric}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Impact</h4>
                      {project.outcomes.map((outcome, index) => (
                        <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-white/80 text-sm">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced projects filter with GSAP animations
function ProjectsFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filter = filterRef.current;
    if (!filter) return;

    gsap.fromTo(filter.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filter,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'default' : 'outline'}
          className={`${
            activeCategory === category
              ? 'bg-white text-black hover:bg-white/90'
              : 'border-white/30 text-white hover:bg-white/10 hover:border-white'
          } transition-all duration-300`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

// Main Enhanced Projects Component
export default function EnhancedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "Cinematic Web Experience",
      category: "Web Development",
      year: "2024",
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
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "/project1.jpg",
      screenshots: []
    },
    {
      id: 2,
      title: "Brand Identity System",
      category: "Visual Design",
      year: "2024",
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
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "/project2.jpg",
      screenshots: []
    },
    {
      id: 3,
      title: "Brand Identity System",
      category: "Frontend",
      year: "2024",
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
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "/project2.jpg",
      screenshots: []
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Section reveal animation
    gsap.fromTo('.section-header',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-gray-900/20 to-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/1 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="section-header text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <span className="text-white/80 font-mono text-sm tracking-widest uppercase">
                Chapter III: The Stories
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"></div>
            
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Each project tells a unique story of challenges overcome, creativity unleashed, 
              and solutions crafted with passion and precision.
            </motion.p>
          </div>

          {/* Projects filter */}
          <ProjectsFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Projects grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={selectedProject?.id === project.id}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View all projects button */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 hover:border-white text-white">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Project detail modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}