'use client'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface MenuItem {
    id: string;
    label: string;
    href: string;
}

export const Navigation: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [isScreenSize, setIsScreenSize] = useState("desktop");
    const [isScrolled, setIsScrolled] = useState(false)

    // Check if mobile
    useEffect(() => {
        const checkScreen = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setIsScreenSize("mobile")
            } else if (width < 1024) {
                setIsScreenSize("tablet")
            } else if (width < 1280) {
                setIsScreenSize("laptop")
            } else if (width < 1536) {
                setIsScreenSize("desktop")
            } else {
                setIsScreenSize("xl")
            }
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const getSidebarPosition = () => {
        switch (isScreenSize) {
            case 'mobile': return '0%';
            case 'tablet': return '45%';
            case 'laptop': return '55%';
            case 'desktop': return '65%';
            case 'xl': return '70%';
            default: return "65%"
        }
    }

    const menuItems: MenuItem[] = [
        { id: '01', label: 'HOME', href: '#hero' },
        { id: '02', label: 'SKILL', href: '#skills' },
        { id: '03', label: 'PROJECT', href: '#projects' },
        { id: '04', label: 'CONTACT', href: '#contact' },
    ];

    const socialItems = [
        { id: 'instagram', icon:(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551.034 551.034" width="48" height="48">
  <linearGradient id="IG-gradient" x1="275.517" x2="275.517" y1="0" y2="551.034" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#f58529"/>
    <stop offset="0.3" stop-color="#dd2a7b"/>
    <stop offset="0.6" stop-color="#8134af"/>
    <stop offset="1" stop-color="#515bd4"/>
  </linearGradient>
  <path fill="url(#IG-gradient)" d="M386.878,0H164.156C73.528,0,0,73.528,0,164.156v222.721
    c0,90.629,73.528,164.157,164.156,164.157h222.721c90.629,0,164.156-73.528,164.156-164.157V164.156
    C551.034,73.528,477.507,0,386.878,0z"/>
  <path fill="#fff" d="M275.517,134.053c-78.147,0-141.464,63.317-141.464,141.464
    s63.317,141.464,141.464,141.464s141.464-63.317,141.464-141.464S353.664,134.053,275.517,134.053z M275.517,366.29
    c-50.082,0-90.773-40.691-90.773-90.773s40.691-90.773,90.773-90.773s90.773,40.691,90.773,90.773S325.599,366.29,275.517,366.29z"/>
  <circle cx="418.31" cy="134.07" r="34.15" fill="#fff"/>
</svg>
), label: 'Instagram', href: 'https://www.instagram.com/ramdnk_' },
        { id: 'github', icon:(<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 98 96">
  <path fill="#181717" d="M49 0C22 0 0 22 0 49c0 21.6 14 40 33.5 46.5 2.5.5 3.4-1.1 3.4-2.4v-8.3c-13.6 3-16.5-5.8-16.5-5.8-2.3-6-5.5-7.6-5.5-7.6-4.5-3 .3-3 .3-3 5 .4 7.6 5.2 7.6 5.2 4.4 7.6 11.5 5.4 14.3 4.1.4-3.2 1.7-5.4 3-6.6-10.8-1.2-22.2-5.5-22.2-24.3 0-5.4 1.9-9.8 5.1-13.3-.5-1.2-2.2-6.1.5-12.8 0 0 4.1-1.3 13.5 5a46.6 46.6 0 0 1 24.6 0c9.4-6.3 13.5-5 13.5-5 2.7 6.7 1 11.6.5 12.8 3.2 3.5 5.1 7.9 5.1 13.3 0 18.9-11.5 23.1-22.3 24.3 1.7 1.5 3.3 4.5 3.3 9v13.3c0 1.3.9 2.9 3.5 2.4A49 49 0 0 0 98 49C98 22 76 0 49 0z"/>
</svg>
), label: 'GitHub', href: 'https://github.com/Aurelfrhs' },
        { id: 'linkedin', icon:(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <rect width="48" height="48" rx="8" fill="#0077B5"/>
  <path fill="#fff" d="M14.5 19h5v16h-5V19Zm2.5-7.6a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8ZM21 19h4.8v2.3h.1a5.2 5.2 0 0 1 4.7-2.6c5 0 5.9 3.3 5.9 7.6V35h-5v-7.3c0-1.8 0-4-2.4-4s-2.8 1.9-2.8 3.9V35H21V19Z"/>
</svg>
), label: 'LinkedIn', href: 'https://www.linkedin.com/in/aurel-fristian-ramdhani-hatorangan-simanjuntak'},
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarVariants: Variants = {
        closed: {
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        open: {
            x: getSidebarPosition(),
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const menuItemVariants: Variants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.6,
                ease: 'easeOut'
            }
        })
    };

    const letterVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    const buttonTextVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.03,
                duration: 0.2,
                ease: 'easeOut'
            }
        }),
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.1
            }
        }
    };

    const iconVariants: Variants = {
        menu: {
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        close: {
            rotate: 180,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <>
            {/* HEADER COMPONENT */}
            <header className={`fixed top-0 left-0 w-full z-50 transition-colors  ${isScrolled ? "bg-background" : "bg-transparent"}`}>
                <div className="flex items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <Link href='/' className="flex items-center space-x-2">
                        <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
                            <Image
                                src={'/aurel-portfolio-logo.svg'}
                                alt="Logo"
                                className="sm-logo-img block h-8 w-auto object-contain"
                                draggable={false}
                                width={110}
                                height={24}
                            />
                        </div>
                        <h1 className="font-extrabold font-big text-3xl text-foreground"><span className='font-[900]'>Aurel</span></h1>
                    </Link>

                    {/* MENU BUTTON */}
                    <motion.button
                        onClick={toggleSidebar}
                        className="flex items-center space-x-2 px-4 py-2 text-foreground text-2xl rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Animated Text */}
                        <div className="flex overflow-hidden">
                            <AnimatePresence mode="wait">
                                {(isSidebarOpen ? "Close" : "Menu").split('').map((letter, index) => (
                                    <motion.span
                                        key={`${isSidebarOpen ? 'close' : 'menu'}-${index}`}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={buttonTextVariants}
                                        className="font-medium inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Animated Icon */}
                        <motion.div
                            animate={isSidebarOpen ? 'close' : 'menu'}
                            variants={iconVariants}
                        >
                            {isSidebarOpen ? <X size={24} /> : <Plus size={24} />}
                        </motion.div>
                    </motion.button>
                </div>
            </header>

            {/* SIDEBAR COMPONENT */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        className="fixed top-0 right-0 w-full h-full z-40"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                    >

                        {/* LAYER 1 - Primary Color (Blue) */}
                        <motion.div
                            className="absolute inset-0 bg-primary"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />

                        {/* LAYER 2 - Secondary Color (Lighter Blue) */}
                        <motion.div
                            className="absolute inset-0 bg-[#0E0C0C]"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
                        />

                        {/* LAYER 3 - White Background (Content Area) */}
                        <motion.div
                            className="absolute -inset-0.5 bg-background"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
                        >
                            <div className="flex flex-col items-start h-full px-12 pt-24">
                                {/* Menu Items */}
                                <nav className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            variants={menuItemVariants}
                                            className="relative"
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <a
                                                href={item.href}
                                                className={`font-work flex gap-1.5 text-6xl font-bold transition-all duration-300 ${hoveredItem && hoveredItem !== item.id
                                                    ? 'text-foreground'
                                                    : hoveredItem === item.id
                                                        ? 'text-primary'
                                                        : 'text-foreground hover:text-primary'
                                                    }`}
                                            >
                                                <div className="flex">
                                                    {item.label.split('').map((letter, letterIndex) => (
                                                        <motion.span
                                                            key={letterIndex}
                                                            custom={letterIndex}
                                                            initial="hidden"
                                                            animate="visible"
                                                            variants={letterVariants}
                                                            className="inline-block"
                                                        >
                                                            {letter}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                                <motion.span
                                                    className='text-2xl font-light text-[#5227FF]'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.5 }}
                                                >
                                                    {item.id}
                                                </motion.span>
                                            </a>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Socials */}
<motion.div
    className="absolute bottom-16 left-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
>
    <h3 className="text-lg font-semibold text-primary mb-4">Socials</h3>
    <div className="flex flex-wrap gap-8 sm:gap-6 md:gap-8 lg:gap-10 items-center">
        {socialItems.map((social) => (
            <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center transition-all duration-300 ${
                    hoveredSocial && hoveredSocial !== social.id
                        ? 'opacity-50 scale-95'
                        : hoveredSocial === social.id
                        ? 'text-primary scale-110'
                        : 'text-foreground hover:text-primary'
                }`}
                onMouseEnter={() => setHoveredSocial(social.id)}
                onMouseLeave={() => setHoveredSocial(null)}
            >
                {/* Icon */}
                <div className="w-10 h-10 mb-2">{social.icon}</div>

                {/* Label */}
                <span className='text-xl tracking-wide'>{social.label}</span>
            </a>
        ))}
    </div>
</motion.div>


                                <motion.div
                                    className='absolute bottom-5 left-12'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <h4 className='text-sm font-semibold text-muted-foreground'>
                                        Copyright © 2025 Aurel Fristian. All rights reserved.
                                    </h4>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;