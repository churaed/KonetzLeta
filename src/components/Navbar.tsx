import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const HOVER_DELAY = 600; // ms

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [navbarPinned, setNavbarPinned] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);

  
  const navRef = useRef<HTMLDivElement>(null);
  
  // Calculate height of the navbar for HeroSection content top padding
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        const height = rect.height
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Effect for scroll and mouse move detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar visibility logic with threshold to prevent jittery behavior
      if (currentScrollY < 50) {
        // Always show navbar at the top
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down - hide navbar (with 10px threshold). Un-pin the navbar when scrolling down
        setNavVisible(false);
        setNavbarPinned(false);
        setIsMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY - 10) {
        // Scrolling up - show navbar (with 10px threshold)
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // This function's ONLY job is now to report if the mouse is in the hover zone.
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        setIsHovering(e.clientY < 100);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);


  // This effect runs ONLY when the `isHovering` state changes.
  useEffect(() => {
    if (isHovering) {
      // If user is hovering, start a timer.
      hoverTimerRef.current = window.setTimeout(() => {
        setNavbarPinned(true); // After the delay, pin the navbar.
      }, HOVER_DELAY);
    } else {
      // If user stops hovering, clear any existing timer.
      // This prevents the navbar from appearing if they leave the area too soon.
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    }

    // Cleanup function: clear the timer if the component unmounts.
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isHovering]);


  const navItems = [
    { name: 'Начало', subtitle: 'Лета', href: '#hero' },
    { name: 'О Нас', subtitle: 'И нашем Саде', href: '#about' },
    { name: 'Шоурил', subtitle: 'Всходов', href: '#showreel' },
    { name: 'Проекты', subtitle: 'и Заготовки', href: '#portfolio' },
    { name: 'Услуги', subtitle: 'и Продукты', href: '#services' },
    { name: 'Связаться', subtitle: 'с нами', href: '#contact' },
    { name: 'Конец', subtitle: 'Лета', href: '#hero' },
  ];

  // Add this new function inside your Navbar component
  const handleMobileNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Use a small delay to close the menu.
    // This gives the browser time to start the scroll before the menu disappears.
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300); // 300ms is a safe delay
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Modified visibility logic:
  const shouldShow = navVisible || navbarPinned;

  return (
    <>
      {/* Hover indicator for desktop */}
      {!navVisible && window.innerWidth >= 1024 && (
        <motion.div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            y: isHovering ? 5 : -20
          }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <div className="bg-white/10 rounded-b-lg px-4 py-2">
            <div className="w-8 h-1 bg-white/50 rounded-full mx-auto" />
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-linear-to-b from-black/90 to-black/60"
        initial={{ y: -100 }}
        animate={{
          y: shouldShow ? 0 : -100,
        }}
        transition={{ duration: 0.2, delay: 0.25, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 @md:h-24 flex justify-between items-center">
          {/* Left Side - Studio Description + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="lg:hidden order-first"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            
          </div>

          {/* Desktop Navigation - Centered nav items with responsive spacing */}
            <div className="
              hidden lg:flex items-center justify-center
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              gap-x-6 md:gap-x-8 lg:gap-x-12 xl:gap-x-16
            ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }
                }}
                className="group relative text-sm font-mono tracking-wider text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {/* This container moves up on hover to keep the whole block centered */}
                <div className="relative transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  <span className="block text-center">{item.name}</span>
                  <span className="
                    block text-center text-xs text-red-400
                    absolute top-full left-1/2 -translate-x-1/2 mt-1
                    opacity-0 transition-opacity duration-300 group-hover:opacity-100
                  ">
                    {item.subtitle}
                  </span>
                </div>
              </Link>
            ))}
            </div>

           
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <div className="bg-black/95 backdrop-blur-md px-6 py-4 space-y-4 border-t border-white/10">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleMobileNavClick(item.href)}
                className="block w-full text-left text-sm font-mono tracking-wider group transition-colors duration-300"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <span className="text-white/80 group-hover:text-white">{item.name}</span>
                  <span className="text-red-400/80 ml-2 group-hover:text-red-400">{item.subtitle}</span>
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}