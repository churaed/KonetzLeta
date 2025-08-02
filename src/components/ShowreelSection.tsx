import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export function ShowreelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="showreel" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
        {/* Film strip pattern */}
        <div className="absolute left-0 top-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-8 bg-red-400"
              style={{
                left: `${(i * 5)}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            <span className="text-red-400">Шоу</span>рил
          </h2>
          
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl font-cormorant italic text-gray-300 leading-relaxed">
              Пусть наша работа говорит сама за себя —
              <br />
              в каждом кадре живёт история.
            </p>
            <p className="text-sm font-mono text-gray-500 tracking-wide">
              Нажмите для воспроизведения
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden relative group border border-gray-800/50">
            
            {/* Animated background with film aesthetic */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(45deg, 
                    rgba(239, 68, 68, 0.1) 0%, 
                    rgba(220, 38, 38, 0.2) 30%,
                    rgba(185, 28, 28, 0.15) 60%,
                    rgba(127, 29, 29, 0.1) 100%
                  )
                `,
              }}
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.2) 30%, rgba(185, 28, 28, 0.15) 60%, rgba(127, 29, 29, 0.1) 100%)",
                  "linear-gradient(45deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.2) 30%, rgba(127, 29, 29, 0.1) 60%, rgba(239, 68, 68, 0.1) 100%)",
                  "linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.2) 30%, rgba(185, 28, 28, 0.15) 60%, rgba(127, 29, 29, 0.1) 100%)",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Film grain effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-px bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </motion.div>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative mb-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="w-24 h-24 border-2 border-red-400/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ 
                    borderColor: "rgba(239, 68, 68, 0.8)",
                    backgroundColor: "rgba(239, 68, 68, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-red-400" />
                  ) : (
                    <Play size={32} className="text-red-400 ml-1" />
                  )}
                </motion.div>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-red-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.button>
              
              <motion.div
                className="text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h3 className="text-2xl font-cormorant italic text-white">
                  Лучшие работы 2024
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  4 минуты нашего мира
                </p>
                
                <motion.div
                  className="flex items-center justify-center space-x-4 text-xs font-mono text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span>Режиссёр: Александр К.</span>
                  <span>•</span>
                  <span>Оператор: Мария Л.</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Video controls */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                  whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause size={16} className="text-red-400" /> : <Play size={16} className="text-red-400 ml-0.5" />}
                </motion.button>
                
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                  whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-red-400" />}
                </motion.button>
              </div>

              <div className="text-xs text-red-400/80 font-mono">
                {isPlaying ? "02:34" : "00:00"} / 04:12
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "62%" : "0%" }}
                transition={{ duration: isPlaying ? 2 : 0.3 }}
              />
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 border-2 border-red-400/30 transform rotate-45"
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute -bottom-6 -left-6 w-12 h-px bg-red-400/30"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}