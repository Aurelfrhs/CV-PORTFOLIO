'use client';

import { useEffect, useState } from 'react';

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta',
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-white/70 tabular-nums tracking-wider text-sm">
      {time || '--:--:--'}
    </span>
  );
}

export function Footer() {
  const navLinks = [
    { label: 'Hero', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/Aurelfrhs',
      icon: (
        <svg width="18" height="18" viewBox="0 0 98 96" fill="currentColor">
          <path d="M49 0C22 0 0 22 0 49c0 21.6 14 40 33.5 46.5 2.5.5 3.4-1.1 3.4-2.4v-8.3c-13.6 3-16.5-5.8-16.5-5.8-2.3-6-5.5-7.6-5.5-7.6-4.5-3 .3-3 .3-3 5 .4 7.6 5.2 7.6 5.2 4.4 7.6 11.5 5.4 14.3 4.1.4-3.2 1.7-5.4 3-6.6-10.8-1.2-22.2-5.5-22.2-24.3 0-5.4 1.9-9.8 5.1-13.3-.5-1.2-2.2-6.1.5-12.8 0 0 4.1-1.3 13.5 5a46.6 46.6 0 0 1 24.6 0c9.4-6.3 13.5-5 13.5-5 2.7 6.7 1 11.6.5 12.8 3.2 3.5 5.1 7.9 5.1 13.3 0 18.9-11.5 23.1-22.3 24.3 1.7 1.5 3.3 4.5 3.3 9v13.3c0 1.3.9 2.9 3.5 2.4A49 49 0 0 0 98 49C98 22 76 0 49 0z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aurel-fristian-ramdhani-hatorangan-simanjuntak',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/ramdnk_',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 py-12 sm:py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-10">

          {/* Navigation */}
          <div>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-5">
              Social
            </p>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                      {social.icon}
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-5">
              Info
            </p>
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-white/30 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-white/50">Bandung, Indonesia</span>
              </div>

              {/* Live Clock */}
              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-white/30 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <LiveClock />
                <span className="text-xs text-white/25">WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25 tracking-wide">
            © 2025 Aurel Fristian Ramdhani Hatorangan Simanjuntak. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            BUILT WITH NEXTJS
          </p>
        </div>
      </div>
    </footer>
  );
}