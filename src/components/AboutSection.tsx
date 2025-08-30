import { motion, useInView } from 'motion/react';
import { cubicBezier } from 'motion-utils';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        // TODO: Fix TypeScript error - ease property type mismatch
        // Current: number[] -> Expected: Easing | Easing[] | undefined
        ease: cubicBezier(0.215, 0.61, 0.355, 1),
      },
    },
  };

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-red-900/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20"
        >
          {/* Main philosophy */}
          <motion.div variants={itemVariants} className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
                О <span className="text-red-400">Нас</span>
              </h2>
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6 text-xl md:text-2xl font-cormorant leading-relaxed text-gray-300">
              <p className="italic">
                Мы создаём анимацию на стыке технологий и сердца,
                <br />
                где каждый кадр — это вздох между прошлым и будущим.
              </p>
            </div>
          </motion.div>

          {/* Philosophy grid */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-12 md:gap-8"
          >
            {/* Innovation */}
            <motion.div 
              className="text-center space-y-6"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 mx-auto border border-red-400/30 rounded-full flex items-center justify-center"
                  whileHover={{ 
                    borderColor: "rgba(248, 113, 113, 0.8)",
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-8 h-8 bg-red-400 transform rotate-45" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-cormorant italic text-white">Новаторство</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Смелые проекты требуют смелых решений. Мы не боимся экспериментировать 
                  с формой и содержанием.
                </p>
              </div>
            </motion.div>

            {/* Technology */}
            <motion.div 
              className="text-center space-y-6"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 mx-auto border border-red-400/30 rounded-full flex items-center justify-center"
                  whileHover={{ 
                    borderColor: "rgba(248, 113, 113, 0.8)",
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-px h-8 bg-red-400" />
                  <div className="w-8 h-px bg-red-400" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-cormorant italic text-white">Технологии</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  От классической рисованной анимации до VR — мы владеем всем спектром 
                  современных инструментов.
                </p>
              </div>
            </motion.div>

            {/* Soul */}
            <motion.div 
              className="text-center space-y-6"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 mx-auto border border-red-400/30 rounded-full flex items-center justify-center"
                  whileHover={{ 
                    borderColor: "rgba(248, 113, 113, 0.8)",
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-4 h-4 bg-red-400 rounded-full" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-cormorant italic text-white">Душа</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  За каждым пикселем стоит человеческая история. Мы анимируем не объекты — 
                  мы оживляем чувства.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Haiku-style quote */}
          <motion.div 
            variants={itemVariants}
            className="text-center space-y-8"
          >
            <div className="max-w-2xl mx-auto p-8 border border-red-400/20 rounded-lg bg-black/30 backdrop-blur-sm">
              <div className="space-y-4 text-xl md:text-2xl font-cormorant italic text-gray-300 leading-relaxed">
                <p>Кадр за кадром —</p>
                <p className="text-red-400">время становится вечностью,</p>
                <p>движение — поэзией.</p>
              </div>
              <motion.div
                className="w-16 h-px bg-red-400 mx-auto mt-6"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "50+", label: "Проектов" },
              { number: "8", label: "Лет опыта" },
              { number: "∞", label: "Идей" },
              { number: "1", label: "Страсть" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-cormorant italic text-red-400">
                  {stat.number}
                </div>
                <div className="text-sm font-mono text-gray-400 tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}