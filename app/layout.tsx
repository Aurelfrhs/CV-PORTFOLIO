import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { Footer } from "./layouts/Footer";
import { Navigation } from "./layouts/Navigation";

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