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

// Contact form component
function ContactForm() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', project: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (you can replace this with proper notification)
    alert('Message sent successfully! I\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name and Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-white/80 font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none"
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white/80 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Project type */}
        <div className="space-y-2">
          <label className="block text-white/80 font-medium">Project Type</label>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white/50 text-white backdrop-blur-sm transition-all duration-300 focus:outline-none"
          >
            <option value="" className="bg-gray-900">Select a project type</option>
            <option value="web-development" className="bg-gray-900">Web Development</option>
            <option value="ui-ux-design" className="bg-gray-900">UI/UX Design</option>
            <option value="brand-identity" className="bg-gray-900">Brand Identity</option>
            <option value="motion-graphics" className="bg-gray-900">Motion Graphics</option>
            <option value="consultation" className="bg-gray-900">Consultation</option>
            <option value="other" className="bg-gray-900">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-white/80 font-medium">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none resize-none"
            placeholder="Tell me about your project, vision, or how we can work together..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              Sending Message...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Contact information
function ContactInfo() {
  const { ref, isVisible } = useScrollAnimation(0.3);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@yourname.com",
      action: "mailto:hello@yourname.com"
    },
    {
      icon: "📱",
      title: "Phone",  
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: "🌍",
      title: "Location",
      value: "Available Worldwide",
      action: null
    },
    {
      icon: "⏰",
      title: "Response Time",
      value: "Within 24 hours",
      action: null
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/yourname' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourname' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/yourname' },
    { name: 'GitHub', icon: '👨‍💻', url: 'https://github.com/yourname' },
    { name: 'Dribbble', icon: '🏀', url: 'https://dribbble.com/yourname' },
    { name: 'Behance', icon: '🎨', url: 'https://behance.net/yourname' }
  ];

  return (
    <div 
      ref={ref}
      className={`space-y-8 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Contact methods */}
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div 
            key={method.title}
            className={`flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 ${
              method.action ? 'cursor-pointer' : ''
            }`}
            onClick={() => method.action && window.open(method.action, '_blank')}
          >
            <div className="text-2xl">{method.icon}</div>
            <div>
              <div className="text-white/60 text-sm">{method.title}</div>
              <div className="text-white font-medium">{method.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white font-playfair">Connect With Me</h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${600 + (index * 100)}ms` }}
            >
              <span className="text-lg">{social.icon}</span>
              <span className="text-white/80 text-sm">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Call to action section
function CallToAction() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div 
      ref={ref}
      className={`text-center space-y-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Main CTA */}
      <div className="space-y-6">
        <div className="text-5xl mb-6">✨</div>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-playfair">
          Ready to Create Something Amazing?
        </h3>
        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Whether you have a clear vision or just a spark of an idea, 
          let's collaborate to bring your story to life through compelling digital experiences.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
        <button 
          onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
        >
          Start a Project
        </button>
        
        <a 
          href="mailto:hello@yourname.com"
          className="px-8 py-4 border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
        >
          Say Hello
        </a>
      </div>
    </div>
  );
}

// Main Contact Component
export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-gray-900/5 to-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-white/2 rounded-full blur-2xl"></div>
        
        {/* Connection lines */}
        <div className="absolute top-20 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-20 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="text-white/80 font-jetbrains text-sm tracking-widest uppercase">
                Epilogue: The Connection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-6">
              Let's Connect
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"></div>
          </div>

          {/* Call to action */}
          <div className="mb-20">
            <CallToAction />
          </div>

          {/* Contact content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white font-playfair mb-4">
                  Send a Message
                </h3>
                <p className="text-white/70">
                  Tell me about your project and let's discuss how we can work together 
                  to create something extraordinary.
                </p>
              </div>
              <ContactForm />
            </div>
            
            {/* Contact info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white font-playfair mb-4">
                  Get in Touch
                </h3>
                <p className="text-white/70">
                  Multiple ways to reach me. I'm always excited to discuss new opportunities 
                  and creative collaborations.
                </p>
              </div>
              <ContactInfo />
            </div>
          </div>

          {/* Final message */}
          <div className="text-center mt-20 pt-12 border-t border-white/10">
            <p className="text-white/60 italic font-playfair text-lg">
              "Every great story begins with a conversation. Let's start ours."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}