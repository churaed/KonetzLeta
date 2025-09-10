// src/components/InteractiveHoneycombGrid.tsx

import { useRef, useEffect, memo } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'motion/react';

// Configuration for mouse interaction effects
const LENS_CONFIG = {
  RADIUS: 100,        // Effect radius in pixels
  MAX_SCALE: 1.75,     // Maximum logo scale on hover
  MIN_SCALE: .5,       // Minimum logo scale when far from cursor
};

// Individual logo component with interactive scaling based on mouse position
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
    // apply easing for gentler curve
    const easedProximity = useTransform(proximity, (p) => Math.pow(p, 2)); // smoother


    return (
      <motion.div
        ref={logoRef}
        className="w-[6rem] h-[6rem] relative"
        style={{ scale, zIndex: scale }}
      >
        {/* Base logo (greyed out) */}
        <img
          src={logo}
          alt="Partner logo"
          className="w-full h-full object-contain pointer-events-none grayscale brightness-75"
        />

        {/* Red tint overlay masked by the logo */}
        <motion.div
          className="absolute inset-0 bg-red-400 pointer-events-none"
          style={{
            opacity: useTransform(easedProximity, [0, 1], [0, 0.8]), // e.g. max 90% tint            
            WebkitMaskImage: `url(${logo})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            WebkitMaskComposite: "source-in",
            WebkitMask: "alpha",  // Safari needs this
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
  // Track mouse position (initialize offscreen)
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  // Grid layout configuration
  const itemWidth = 96;
  const horizontalSpacing = itemWidth * 0.9;  // Horizontal gap between items
  const verticalSpacing = itemWidth * 0.75;   // Vertical gap between rows
  const logosPerRow = 8;                     // Logos per row

  // Calculate number of rows needed
  const rowCount = Math.ceil(logos.length / logosPerRow);

  // Calculate total grid dimensions
  const gridWidth = logosPerRow * horizontalSpacing + horizontalSpacing / 2;
  const gridHeight = rowCount * verticalSpacing + itemWidth;

  return (
    <div
      className="relative flex justify-center items-center overflow-visible pb-16"
      // Update mouse position on move
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      // Reset mouse position when leaving grid
      onMouseLeave={() => {
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
              <LogoItem logo={logo} mouseX={mouseX} mouseY={mouseY} />
            </div>
          );
        })}
      </div>
    </div>
  );
});
