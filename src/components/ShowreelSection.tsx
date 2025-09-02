import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Import video assets
import showreel720pMP4 from '../assets/video/showreel_720p.mp4';
import showreel720pWEBM from '../assets/video/showreel_720p.webm';
import showreelMP4 from '../assets/video/showreel.mp4';
import showreelWEBM from '../assets/video/showreel.webm';

// Helper function to format time in MM:SS format
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export function ShowreelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Effect to handle video playback based on isPlaying state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
        if (!hasStarted) setHasStarted(true);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, hasStarted]);

  // Autoplay when the video comes into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setIsPlaying(true);
    }
  }, [isInView, hasStarted]);

  // Effect to handle muting
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleInitialPlay = () => {
    setIsMuted(false);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="showreel"
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
        <div className="absolute left-0 top-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-8 bg-red-400"
              style={{ left: `${i * 5}%`, top: `${Math.random() * 100}%` }}
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
          ref={containerRef}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            <span className="text-red-400">Шоу</span>рил
          </h2>
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl font-cormorant italic text-gray-300 leading-relaxed">
              Пусть наша работа говорит сама за себя —
              <br />в каждом кадре живёт история.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group border border-gray-800/50">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              loop
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <source src={showreel720pWEBM} type="video/webm" />
              <source src={showreel720pMP4} type="video/mp4" />
              <source src={showreelWEBM} type="video/webm" />
              <source src={showreelMP4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Pre-play overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: hasStarted ? 0 : 1, transition: { duration: 0.5 } }}
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm ${hasStarted ? 'pointer-events-none' : ''}`}
            >
              <motion.button
                onClick={handleInitialPlay}
                className="relative mb-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="w-24 h-24 border-2 border-red-400/50 rounded-full flex items-center justify-center"
                  whileHover={{
                    borderColor: "rgba(239, 68, 68, 0.8)",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Play size={32} className="text-red-400 ml-1" />
                </motion.div>
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
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-cormorant italic text-white">
                  Лучшие работы 2024
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  {duration > 0 ? `${Math.floor(duration / 60)} минуты нашего мира` : "Загрузка..."}
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs font-mono text-gray-500 mt-4">
                  <span>Режиссёр: Александр К.</span>
                  <span>•</span>
                  <span>Оператор: Мария Л.</span>
                </div>
              </div>
            </motion.div>

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
                  {isPlaying ? (
                    <Pause size={16} className="text-red-400" />
                  ) : (
                    <Play size={16} className="text-red-400 ml-0.5" />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                  whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? (
                    <VolumeX size={16} className="text-red-400" />
                  ) : (
                    <Volume2 size={16} className="text-red-400" />
                  )}
                </motion.button>
              </div>

              <div className="text-xs text-red-400/80 font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 border-2 border-red-400/30 transform rotate-45"
            animate={{ rotate: [45, 135, 45], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-12 h-px bg-red-400/30"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}