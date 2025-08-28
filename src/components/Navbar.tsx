import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for background styling
      setScrolled(currentScrollY > 50);

      // Navbar visibility logic with threshold to prevent jittery behavior
      if (currentScrollY < 50) {
        // Always show navbar at the top
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down - hide navbar (with 10px threshold)
        setNavVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY - 10) {
        // Scrolling up - show navbar (with 10px threshold)
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar on hover near top of screen (desktop only)
      if (window.innerWidth >= 1024) {
        setIsHovering(e.clientY < 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  const navItems = [
    { name: 'Начало', subtitle: 'Лета', href: '#hero' },
    { name: 'О Нас', subtitle: 'И нашем Саде', href: '#about' },
    { name: 'Шоурил', subtitle: 'Всходов', href: '#showreel' },
    { name: 'Проекты', subtitle: 'и Заготовки', href: '#portfolio' },
    { name: 'Услуги', subtitle: 'и Продукты', href: '#services' },
    { name: 'Связаться', subtitle: 'с нами', href: '#contact' },
    { name: 'Конец', subtitle: 'Лета', href: '#hero' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Show navbar if visible by scroll logic OR hovering near top (desktop only)
  const shouldShow = navVisible || (isHovering && window.innerWidth >= 1024);

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
          <div className="bg-white/10 backdrop-blur-sm rounded-b-lg px-4 py-2 border-x border-b border-white/20">
            <div className="w-8 h-1 bg-white/50 rounded-full mx-auto" />
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{
          y: shouldShow ? 0 : -100,
        }}
        transition={{ duration: 0.2, delay: 0.25, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* Left Side - Studio Description + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button - moved to left */}
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

            {/* Studio Description */}
            <motion.div
              className="font-mono text-sm tracking-wider text-gray-300"
              whileHover={{ color: '#ffffff' }}
              transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            >
              {/* Desktop version */}
              <span className="hidden xl:inline">
                Авангардная <span className="text-red-400">Студия Анимации</span>
              </span>
              {/* Tablet version */}
              <span className="hidden lg:inline xl:hidden">
                Авангардная <span className="text-red-400">Студия</span>
              </span>
              {/* Mobile version - hidden when menu is closed */}
              <span className="lg:hidden">
              </span>
            </motion.div>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative rounded-md px-4 py-2 text-sm font-mono tracking-wider text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap"
                whileHover="hover"
                initial="rest"
                variants={{ rest: { y: 0 }, hover: { y: -1 } }}
                transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <div className="flex flex-col items-center">
                  <span>{item.name}</span>
                  <motion.div
                    className="text-sm font-mono text-red-400 overflow-hidden"
                    variants={{
                      rest: { opacity: 0, height: 0 },
                      hover: { opacity: 1, height: 'auto' },
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="pt-1">{item.subtitle}</div>
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Side - Logo */}
          <motion.div
            className="text-3xl font-cormorant italic cursor-pointer"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2, delay: 0.25, ease: 'easeInOut' }}
            onClick={() => scrollToSection('#hero')}
          >
            <span className="text-white">Конец</span>
            <span className="text-red-400 ml-2">лета</span>
          </motion.div>
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
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-sm font-mono tracking-wider group transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{
                  duration: 0.4,
                  delay: isMenuOpen ? index * 0.05 : 0,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                <span className="text-white/80 group-hover:text-white">{item.name}</span>
                <span className="text-red-400/80 ml-2 group-hover:text-red-400">{item.subtitle}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}