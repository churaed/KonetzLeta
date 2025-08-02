import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ShowreelSection } from './components/ShowreelSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Начало', href: '#hero' },
    { name: 'О нас', href: '#about' },
    { name: 'Шоурил', href: '#showreel' },
    { name: 'Проекты', href: '#portfolio' },
    { name: 'Услуги', href: '#services' },
    { name: 'Связаться', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <link 
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=JetBrains+Mono:wght@300;400;500&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: navVisible ? 0 : -100 
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="text-3xl font-cormorant italic cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => scrollToSection('#hero')}
          >
            <span className="text-white">Конец</span>
            <span className="text-red-400 ml-2">лета</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-mono tracking-wider hover:text-red-400 transition-colors duration-300 opacity-80 hover:opacity-100"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="bg-black/95 backdrop-blur-md px-6 py-4 space-y-4 border-t border-white/10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-sm font-mono tracking-wider hover:text-red-400 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: isMenuOpen ? index * 0.05 : 0,
                  ease: "easeOut" 
                }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ShowreelSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />

      {/* <style jsx>{`
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style> */}
    </div>
  );
}