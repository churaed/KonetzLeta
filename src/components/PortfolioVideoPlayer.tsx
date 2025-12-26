import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Helper function to format video time in MM:SS format
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

interface PortfolioVideoPlayerProps {
  videoUrl: string;
  poster?: string;
  overlayTitle?: string;
  overlaySubtitle?: string;
}

export function PortfolioVideoPlayer({ 
  videoUrl, 
  poster, 
  overlayTitle, 
  overlaySubtitle 
}: PortfolioVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Effect to handle video playback state changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.play().catch((error: any) => {
          console.error("Video play failed:", error);
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

  // Generate source URLs for different formats if it's a local video
  const webmUrl = videoUrl.replace(/\.(mp4|webm)$/, '.webm');
  const mp4Url = videoUrl.replace(/\.(mp4|webm)$/, '.mp4');

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover cursor-pointer"
        loop
        playsInline
        muted={isMuted}
        poster={poster}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <source src={webmUrl} type="video/webm" />
        <source src={mp4Url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay shown before video starts */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: hasStarted ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm ${hasStarted ? 'pointer-events-none' : ''}`}
      >
        <motion.button
          onClick={handleInitialPlay}
          className="relative mb-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            className="size-16 md:size-24 border-2 border-red-400/50 rounded-full flex items-center justify-center"
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.8)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Play className="size-6 md:size-10 text-red-400 ml-1" />
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
        
        <div className="text-center space-y-2">
          {overlayTitle && (
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
              {overlayTitle}
            </p>
          )}
          {overlaySubtitle && (
            <div className="flex items-center justify-center space-x-4 text-xs font-mono text-gray-500">
              <span>{overlaySubtitle}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Custom Controls Overlay */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex justify-between items-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: hasStarted ? 0 : 10, opacity: hasStarted ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-3">
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

        <div className="text-[10px] md:text-xs text-red-400/80 font-mono bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-md border border-red-400/10">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          style={{ width: `${progress}%` }}
        />
      </motion.div>

      {/* Decorative corners matching studio style */}
      <motion.div
        className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-red-400/20"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-red-400/20"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}
