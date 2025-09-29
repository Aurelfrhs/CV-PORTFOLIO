"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";

const bigFont = localFont({
  src: "/fonts/Big.woff2", 
  variable: "--font-big",
  weight: "100 900",
  style: "normal"
});

const workFont = localFont({
  src: "/fonts/Work.woff2", 
  variable: "--font-work",
  weight: "700",
  style: "normal"
});

// Enhanced metadata for SEO and social sharing
export const Metadata = {
  title: {
    default: "Aurelrmdh | Portfolio",
    template: "%s | Aurel Dev Portfolio"
  },
  description: "Experience the art of digital storytelling through cinematic web experiences. A portfolio showcasing creative development, visual narratives, and immersive digital solutions.",
  keywords: [
    "aurel dev", 
    "portfolio", 
    "web developer", 
    "ui designer", 
    "creative developer",
    "cinematic", 
    "storytelling", 
    "next.js", 
    "typescript",
    "framer motion",
    "gsap"
  ],
  authors: [{ name: "Aurel Dev", url: "https://aureldev.com" }],
  creator: "Aurel Dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aureldev.com",
    siteName: "Aurel Dev Portfolio",
    title: "Aurel Dev - Cinematic Storytelling Portfolio",
    description: "Experience the art of digital storytelling through cinematic web experiences and creative development.",
    images: [
      {
        url: "/og-aurel-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Aurel Dev Portfolio - Cinematic Storytelling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurel Dev - Cinematic Portfolio",
    description: "A cinematic journey through creative storytelling and visual narratives.",
    images: ["/twitter-aurel-portfolio.jpg"],
    creator: "@aureldev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

// Enhanced Loading Screen with cinematic animation
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative mb-8">
        {/* Multi-layered loading rings */}
        <div className="w-20 h-20 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div 
          className="absolute inset-0 w-20 h-20 border-2 border-transparent border-b-white/40 rounded-full animate-spin" 
          style={{animationDuration: '1.5s', animationDirection: 'reverse'}}
        ></div>
        <div 
          className="absolute inset-2 w-16 h-16 border border-white/10 border-r-white/30 rounded-full animate-spin" 
          style={{animationDuration: '2s'}}
        ></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="text-center space-y-2">
        <div className="text-white/80 text-lg tracking-widest">
          AUREL
        </div>
        <div className="text-white/60 text-sm tracking-wider animate-pulse">
          Crafting Visual Stories...
        </div>
      </div>
    </div>
  );
}

// Navigation Component
const Navigation = () => {
  const handleMenuClose = () => {
    const checkbox = document.getElementById("menu-toggle") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white tracking-wider">
            AUREL
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <input type="checkbox" id="menu-toggle" className="hidden peer" />

          <label
            htmlFor="menu-toggle"
            className="cursor-pointer text-white/80 hover:text-white px-8 py-4 rounded-full transition-all duration-300 bg-white/5 backdrop-blur-sm text-xl md:text-2xl flex items-center space-x-3 relative z-50 select-none hover:bg-white/10"
          >
            <span className="peer-checked:hidden">Menu</span>
            <span className="hidden peer-checked:inline">Close</span>

            <div className="peer-checked:hidden">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>

            <div className="hidden peer-checked:block">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </label>

          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300 z-40"></div>

          {/* Slider Panel */}
          <div className="fixed top-0 right-0 h-full w-96 md:w-[450px] bg-black/95 backdrop-blur-xl transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out z-50 border-l border-white/10">

            {/* Close Button in Panel */}
            <div className="absolute top-6 right-6">
              <label htmlFor="menu-toggle" className="cursor-pointer w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </div>

            {/* Menu Content */}
            <div className="pt-20 px-10">
              <nav className="space-y-3">
                {[
                  { href: "#home", label: "HOME", number: "01" },
                  { href: "#about", label: "ABOUT", number: "02" },
                  { href: "#projects", label: "PROJECT", number: "03" },
                  { href: "#contact", label: "CONTACT", number: "04" },
                ].map((item) => (
                  <label key={item.href} htmlFor="menu-toggle" className="block">
                    <a
                      href={item.href}
                      onClick={handleMenuClose}
                      className="flex items-center justify-between py-5 px-6 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex items-center space-x-5">
                        <span className="text-blue-400 text-base font-mono bg-blue-400/10 px-3 py-1 rounded">
                          {item.number}
                        </span>
                        <span className="text-2xl font-medium">{item.label}</span>
                      </div>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </label>
                ))}
              </nav>

              {/* Social Links */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <h4 className="text-blue-400 text-base font-medium mb-6 tracking-wide">Socials</h4>
                <div className="flex flex-col space-y-4">
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-base py-2">Instagram</a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-base py-2">GitHub</a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-base py-2">LinkedIn</a>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-white/40 text-sm">
                    Copyright © 2025 Aurel Fristian. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced Footer Component
function Footer() {
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

// Enhanced Motion Wrapper with better background effects
function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced grain texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-10 mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Multiple gradient overlays for depth */}
      <div 
        className="fixed inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent pointer-events-none z-5 animate-pulse" 
        style={{animationDuration: '4s'}}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 pointer-events-none z-5" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none z-5" />
      
      {/* Floating light orbs */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div 
          className="absolute top-1/4 left-1/5 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl animate-pulse" 
          style={{animationDelay: '0s', animationDuration: '8s'}}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/[0.005] rounded-full blur-3xl animate-pulse" 
          style={{animationDelay: '4s', animationDuration: '10s'}}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/[0.008] rounded-full blur-3xl animate-pulse" 
          style={{animationDelay: '2s', animationDuration: '6s'}}
        />
      </div>
      
      {children}
    </div>
  );
}

// Main Layout Component with Suspense for better loading
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${bigFont.variable} ${workFont.variable} font-sans antialiased`}>
        <Suspense fallback={<LoadingScreen />}>
          <MotionWrapper>
            <Navigation />
            <main className="relative z-20">
              {children}
            </main>
            <Footer />
          </MotionWrapper>
        </Suspense>
      </body>
    </html>
  );
}