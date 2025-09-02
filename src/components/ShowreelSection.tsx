import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Import video assets and a poster image
import showreel720pMP4 from '../assets/video/showreel_720p.mp4';
import showreel720pWEBM from '../assets/video/showreel_720p.webm';
import showreelMP4 from '../assets/video/showreel.mp4';
import showreelWEBM from '../assets/video/showreel.webm';
import showreelPoster from '../assets/images/showreel-poster.webp';

// Custom hook to detect desktop devices for autoplay control
const useIsDesktop = (breakpoint = 1024) => {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkDevice = () => {
                const isDesktopDevice = window.innerWidth >= breakpoint;
                setIsDesktop(isDesktopDevice);
            };
            checkDevice();
            window.addEventListener('resize', checkDevice);
            return () => window.removeEventListener('resize', checkDevice);
        }
    }, [breakpoint]);
    return isDesktop;
};

// Helper function to format video time in MM:SS format
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export function ShowreelSection() {
  // Reference to the video element for direct control
  const videoRef = useRef<HTMLVideoElement>(null);
  // State for video playback control
  const [isPlaying, setIsPlaying] = useState(false);
  // State for audio mute control
  const [isMuted, setIsMuted] = useState(true);
  // State to track if video has started playing
  const [hasStarted, setHasStarted] = useState(false);
  // State for total video duration
  const [duration, setDuration] = useState(0);
  // State for current video playback time
  const [currentTime, setCurrentTime] = useState(0);

  // Effect to handle video playback state changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        // play() returns a promise. Handle potential browser rejection.
        video.play().catch((error: any) => {
          console.error("Video play failed:", error);
          // If autoplay fails, pause the video state
          setIsPlaying(false);
        });
        if (!hasStarted) setHasStarted(true);
      } else {
        video.pause();
      }
    }
  }, [isPlaying, hasStarted]);


  // Effect to sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handler for initial video play interaction
  const handleInitialPlay = () => {
    setIsMuted(false);
    setIsPlaying(true);
  };

  // Handler to update current video time during playback
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handler to get video duration when metadata loads
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Calculate video progress percentage for display
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="showreel"
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background texture with red accents */}
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
        {/* Animated title section with Russian text */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            <span className="text-red-400">Шоу</span>рил
          </h2>
          {/* Animated decorative line under title */}
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Russian subtitle with description */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl font-cormorant italic text-gray-300 leading-relaxed">
              Пусть наша работа говорит сама за себя —
              <br />в каждом кадре живёт история.
            </p>
          </div>
        </motion.div>

        {/* Main video container with controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Video wrapper with responsive aspect ratio */}
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-black border border-gray-800/50"
            style={{ paddingTop: '56.25%' }}
          >
            {/* Main video element with multiple format sources */}
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
              loop
              playsInline
              muted={isMuted}
              poster={showreelPoster}
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <source src={showreelWEBM} type="video/webm" />
              <source src={showreelMP4} type="video/mp4" />
              <source src={showreel720pWEBM} type="video/webm" />
              <source src={showreel720pMP4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay shown before video starts with play button */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: hasStarted ? 0 : 1, transition: { duration: 0.5 } }}
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm ${hasStarted ? 'pointer-events-none' : ''}`}
            >
              {/* Main play button with hover animations */}
              <motion.button
                onClick={handleInitialPlay}
                className="relative mb-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Play button circle with hover effects and adaptive size */}
                <motion.div
                  className="size-16 md:size-28 border-2 border-red-400/50 rounded-full flex items-center justify-center"
                  whileHover={{
                    borderColor: "rgba(239, 68, 68, 0.8)",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Play className="size-6 md:size-12 text-red-400 ml-1" />
                </motion.div>
                {/* Animated ripple effect around play button */}
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
              {/* Video info text shown before play */}
              <div className="text-center space-y-3">
                <p className="text-gray-400 font-mono text-sm">
                  1 минута нашего мира
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs font-mono text-gray-500 mt-4">
                  <span>Режиссёр: Мария С.</span>
                </div>
              </div>
            </motion.div>

            {/* Video control buttons overlay - now visible after start */}
            <motion.div
              className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 flex justify-between items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: hasStarted ? 0 : 10, opacity: hasStarted ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Left side controls: play/pause and mute */}
              <div className="flex items-center space-x-2 md:space-x-3">
                {/* Play/pause toggle button with adaptive size */}
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-9 md:size-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                  whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="text-red-400 size-4 md:size-5" />
                  ) : (
                    <Play className="text-red-400 size-4 md:size-5 ml-0.5" />
                  )}
                </motion.button>

                {/* Mute/unmute toggle button with adaptive size */}
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="size-9 md:size-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                  whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? (
                    <VolumeX className="text-red-400 size-4 md:size-5" />
                  ) : (
                    <Volume2 className="text-red-400 size-4 md:size-5" />
                  )}
                </motion.button>
              </div>

              {/* Video time display with adaptive text size */}
              <div className="text-[10px] md:text-xs text-red-400/80 font-mono bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </motion.div>

            {/* Video progress bar at bottom - now visible after start */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: hasStarted ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>

          {/* Animated decorative corner elements */}
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