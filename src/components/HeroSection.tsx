import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import imgHeroBird from '@/assets/images/hero-bird.webp'

// Main hero section component with animated particle background
export function HeroSection() {
  // Reference to the canvas element for particle animation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize and run the particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let animationId: number;
    let time = 0;
    
    // Particle array to hold all animated elements
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number; type: 'dot' | 'line' | 'triangle'; }> = [];
    
    // Initialize particles with random properties
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() * 20 + 340,
        type: ['dot', 'line', 'triangle'][Math.floor(Math.random() * 3)] as 'dot' | 'line' | 'triangle'
      });
    }
    
    // Draw different particle shapes based on type
    const drawShape = (particle: typeof particles[0]) => {
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
      gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 50%, ${particle.opacity})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 50%, 0)`);
      ctx.fillStyle = gradient;
      
      // Render particle based on its type
      switch (particle.type) {
        case 'dot':
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'line':
          ctx.strokeStyle = `hsla(${particle.hue}, 60%, 50%, ${particle.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.stroke();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.closePath();
          ctx.fill();
          break;
      }
    };
    
    // Animation loop for moving particles
    const animate = () => {
      // Create fading trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005;
      
      // Update and draw each particle
      particles.forEach((particle, index) => {
        // Add wave motion to particle movement
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.1;
        particle.y += particle.vy + Math.cos(time + index * 0.15) * 0.1;
        
        // Pulsing opacity effect
        particle.opacity = 0.3 + Math.sin(time * 10 + index) * 0.1;
        
        // Wrap particles around screen edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        drawShape(particle);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize events
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup animation and event listeners
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden pt-[var(--navbar-height)] box-border @container"
    >
      {/* Animated particle background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2a0a0a 100%)' }}
      />
      
      {/* Noise texture overlay for visual depth */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Main content container with centered items */}
      <div className="relative z-10 h-full flex flex-col items-center">
        
        {/* Main Content Area: a flexible container that centers the content and frames the floating elements */}
        <div className="relative flex-1 min-h-0 w-full text-center max-w-5xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
          {/* Animated title with "Конец" and "лета" on separate lines */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            <h1 className="text-6xl @md:text-8xl @lg:text-[9rem] @xl:text-[10rem] font-cormorant italic leading-none">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                Конец
              </motion.span>
              <motion.span
                className="block text-red-400 -mt-2 @md:-mt-4"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.2 }}
              >
                лета
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle with decorative divider line */}
          <motion.div
            className="flex-shrink-0 space-y-4 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
            />
            <p className="text-lg font-mono text-gray-400 tracking-wide">
              Студия авторской коммерческой анимации
            </p>
          </motion.div>

          {/* Hero bird image with responsive sizing */}
          <div className="flex-1 min-h-0 w-full flex justify-center">
            <motion.img
              src={imgHeroBird}
              alt="Hero Bird"
              className="w-full h-full object-contain max-w-xs md:max-w-sm lg:max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 2.5 }}
            />
          </div>

          {/* Floating geometric elements now correctly positioned relative to the content area */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-400 transform rotate-45"
            animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-px h-12 bg-white opacity-30"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Scroll Down Button */}
        <motion.div
          className="flex-shrink-0 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          {/* Button that scrolls to about section */}
          <motion.button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center text-gray-400 hover:text-red-400 transition-colors group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xs font-mono tracking-wider mb-2">Смотреть далее</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}