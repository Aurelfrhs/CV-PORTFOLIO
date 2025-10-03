// Enhanced Footer Component
export function Footer() {
  const socialLinks = [
    { icon: "instagram", label: "Instagram", href: "#" },
    { icon: "linkedin", label: "LinkedIn", href: "#" },
    { icon: "github", label: "GitHub", href: "#" },
    { icon: "email", label: "Email", href: "mailto:aurel.dev@email.com" }
  ];

  const navigationLinks = ["Craft", "Stories", "Vision"];

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold tracking-wider">AUREL</h3>
            </div>
            <p className="text-white/70 leading-relaxed text-lg max-w-md">
              Crafting visual narratives that transcend ordinary storytelling through modern web technologies and cinematic experiences.
            </p>
            <div className="flex space-x-4 pt-4">
              {/* Social Links with enhanced styling */}
              {socialLinks.map((social) => (
                <a 
                  key={social.icon}
                  href={social.href}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigate</h4>
            <div className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/60 hover:text-white transition-colors duration-200 group flex items-center"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-white/40 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="space-y-3 text-white/60">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>aurel.dev@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>Bandung, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>Available for projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with enhanced design */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2025 Aurel Dev. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span className="text-white/40">•</span>
              <span>Made with ❤️ and lots of ☕</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}