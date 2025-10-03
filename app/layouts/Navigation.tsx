'use client'

// Navigation Component
export const Navigation = () => {
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
                  { href: "#hero", label: "HOME", number: "01" },
                  { href: "#skills", label: "SKILL", number: "02" },
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