// Imports for animation and React hooks
import { motion, useInView } from 'motion/react';
import { cubicBezier } from 'motion-utils';
import { useRef } from 'react';
import { InteractiveLogoGrid } from './InteractiveLogoGrid';

import teamImg from '@/assets/images/team.webp'

// --- The Vite Way to Import All Logos ---
// This tells Vite to find all .png, .jpg, and .svg files in the awards directory.
// `eager: true` makes it import them all at once, which is fine for this use case.
const logoModules = import.meta.glob('@/assets/images/awards/**/*.{png,jpg,svg}', { eager: true });

// This transforms the imported modules into a simple array of URLs.
const partnerLogos = Object.values(logoModules).map((module: any) => module.default);

// TeamSection component for displaying team information and partner logos
export function TeamSection() {
  // TYPE SAFETY: Explicitly type the ref for better code analysis
  const ref = useRef<HTMLDivElement>(null);
  // Hook to determine if the component is in view for animation triggering
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  // Variants for the main container's entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger child animations
        delayChildren: 0.2, // Delay before child animations start
      },
    },
  };

  // Variants for individual items within the section
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.215, 0.61, 0.355, 1), // Custom cubic bezier easing
      },
    },
  };


  return (
    // Main section container with background and overflow handling
    <section id="about" className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      {/* Content wrapper for max width and centering */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Animated container for the entire section content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center space-y-16"
        >
          {/* Section headline */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-5xl md:text-7xl font-cormorant italic text-white leading-tight">
              О <span className="text-red-400">Нас</span> {/* "About Us" in Russian */}
            </h2>
            {/* Animated decorative divider */}
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-4"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Central team image */}
          <motion.div variants={itemVariants} className="relative w-full max-w-4xl md:max-w-2xl lg:max-w-4xl group">
            <motion.img
              src={teamImg}
              alt="Команда"
              className="w-full object-cover rounded-lg shadow-2xl shadow-black/50 "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Description text block with an avatar */}
          <motion.div variants={itemVariants} className="relative max-w-3xl">
             {/* Main descriptive paragraph */}
             <p className="p-8 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-center text-lg md:text-xl font-cormorant leading-relaxed text-gray-300 shadow-lg">
                Текст-текст-текст, какие мы хорошенькие и пригоженькие и как весело с нами работать и вообще, мы суперопытные и талантливые. Поверьте нам на слово!
             </p>
          </motion.div>

          <InteractiveLogoGrid logos={partnerLogos} />

        </motion.div>
      </div>
    </section>
  );
}