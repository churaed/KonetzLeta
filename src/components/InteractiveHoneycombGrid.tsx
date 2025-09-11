// src/components/InteractiveHoneycombGrid.tsx

import { useRef, useEffect, memo, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'motion/react';

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Mobile grid configuration
const MOBILE_CONFIG = {
  LOGOS_PER_ROW: 6,
  ITEM_WIDTH: 64,
  HORIZONTAL_SPACING: 0.7,
  VERTICAL_SPACING: 0.6
};

// Desktop grid configuration
const DESKTOP_CONFIG = {
  LOGOS_PER_ROW: 8,
  ITEM_WIDTH: 96,
  HORIZONTAL_SPACING: 0.9,
  VERTICAL_SPACING: 0.75
};

// Configuration for mouse interaction effects
const LENS_CONFIG = {
  RADIUS: 100,        // Effect radius in pixels
  MAX_SCALE: 1.75,     // Maximum logo scale on hover
  MIN_SCALE: .5,       // Minimum logo scale when far from cursor
};

// Individual logo component for desktop only
const LogoItem = memo(
  ({
    logo,
    mouseX,
    mouseY,
  }: {
    logo: string;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
  }) => {
    const logoRef = useRef<HTMLDivElement>(null);
    const centerPoint = useRef({ x: 0, y: 0 });

    useEffect(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        centerPoint.current = {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
      }
    }, []);

    const distance = useTransform([mouseX, mouseY], ([mX, mY]: number[]) =>
      Math.hypot(mX - centerPoint.current.x, mY - centerPoint.current.y)
    );

    const scale = useTransform(distance, [0, LENS_CONFIG.RADIUS], [LENS_CONFIG.MAX_SCALE, LENS_CONFIG.MIN_SCALE], { clamp: true });
    const proximity = useTransform(distance, [0, LENS_CONFIG.RADIUS], [1, 0], { clamp: true });
    const easedProximity = useTransform(proximity, (p) => Math.pow(p, 2));

    return (
      <motion.div
        ref={logoRef}
        className="w-full h-full relative"
        style={{ scale, zIndex: scale }}
      >
        <img
          src={logo}
          alt="Partner logo"
          className="w-full h-full object-contain pointer-events-none grayscale brightness-75"
        />

        <motion.div
          className="absolute inset-0 bg-red-400 pointer-events-none"
          style={{
            opacity: useTransform(easedProximity, [0, 1], [0, 0.8]),
            WebkitMaskImage: `url(${logo})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskComposite: "source-in",
            WebkitMask: "alpha",
            maskImage: `url(${logo})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
            maskType: "alpha",
          }}
        />
      </motion.div>
    );
  }
);




interface InteractiveHoneycombGridProps {
  logos: string[];
}

// Honeycomb grid layout component with interactive mouse effects
export const InteractiveHoneycombGrid = memo(function InteractiveHoneycombGrid({
  logos,
}: InteractiveHoneycombGridProps) {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  // Grid layout configuration
  // Get grid configuration based on device
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  const logosPerRow = config.LOGOS_PER_ROW;
  const itemWidth = config.ITEM_WIDTH;
  const horizontalSpacing = itemWidth * config.HORIZONTAL_SPACING;
  const verticalSpacing = itemWidth * config.VERTICAL_SPACING;

  // Calculate number of rows needed
  const rowCount = Math.ceil(logos.length / logosPerRow);

  // Calculate total grid dimensions
  const gridWidth = logosPerRow * horizontalSpacing + horizontalSpacing / 2;
  const gridHeight = rowCount * verticalSpacing + itemWidth;

  return (
    <div
      className="relative flex justify-center items-center overflow-visible"
      // Update mouse position on move
      onMouseMove={isMobile ? undefined : (e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={isMobile ? undefined : () => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
    >
      {/* Grid container with calculated dimensions */}
      <div
        className="relative"
        style={{ width: gridWidth, height: gridHeight }}
      >
        {/* Render logos in honeycomb pattern */}
        {logos.map((logo, index) => {
          const row = Math.floor(index / logosPerRow);
          const col = index % logosPerRow;

          // Calculate honeycomb position with row offset
          const x =
            col * horizontalSpacing + (row % 2 ? horizontalSpacing / 2 : 0);
          const y = row * verticalSpacing;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: `${itemWidth}px`,
                height: `${itemWidth}px`
              }}
            >
              {isMobile ? (
                <img
                  src={logo}
                  alt="Partner logo"
                  className="w-full h-full object-contain pointer-events-none grayscale brightness-75"
                  style={{ transform: 'scale(0.6)' }}
                />
              ) : (
                <LogoItem
                  logo={logo}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
