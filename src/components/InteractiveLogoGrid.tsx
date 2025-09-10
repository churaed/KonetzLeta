// src/components/InteractiveLogoGrid.tsx

import { useRef, useEffect, memo } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';

// NEW: Configuration object for physics parameters makes tweaking easy.
const PHYSICS_CONFIG = {
  // Ambient motion config
  AMPLITUDE_RANGE: { min: 5, max: 20 },
  FREQUENCY_RANGE: { min: 0.05, max: 0.2 },
  // Mouse interaction config
  MOUSE_REPULSION_RADIUS: 150,
  MAX_REPULSION_FORCE: 25,
  DAMPING_FACTOR: 0.92, // How quickly repulsion force fades (higher = slower fade)
  // Spring animation config
  SPRING: { damping: 20, stiffness: 150, mass: 1 },
};

// --- Custom Hook for the Flock Animation Logic ---
function useFlockAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  itemsCount: number
) {
  const motionValues = useRef(
    Array.from({ length: itemsCount }, () => ({
      x: useMotionValue(0),
      y: useMotionValue(0),
    }))
  ).current;

  const animParams = useRef(
    Array.from({ length: itemsCount }, () => {
      const { AMPLITUDE_RANGE, FREQUENCY_RANGE } = PHYSICS_CONFIG;
      return {
        ampX: Math.random() * (AMPLITUDE_RANGE.max - AMPLITUDE_RANGE.min) + AMPLITUDE_RANGE.min,
        ampY: Math.random() * (AMPLITUDE_RANGE.max - AMPLITUDE_RANGE.min) + AMPLITUDE_RANGE.min,
        freqX: Math.random() * (FREQUENCY_RANGE.max - FREQUENCY_RANGE.min) + FREQUENCY_RANGE.min,
        freqY: Math.random() * (FREQUENCY_RANGE.max - FREQUENCY_RANGE.min) + FREQUENCY_RANGE.min,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
      }
    })
  ).current;

  // OPTIMIZATION: Store mouse position in a ref to avoid recalculating in the animation loop.
  const mousePosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const logoElements = Array.from(container.children) as HTMLDivElement[];
    const homePositions = logoElements.map((el) => ({
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    }));
    const repulsionForces = Array.from({ length: itemsCount }, () => ({ x: 0, y: 0 }));

    // OPTIMIZATION: Mouse handler now only captures the current mouse position.
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = container.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - left,
        y: e.clientY - top,
      };
    };
    
    const handleMouseLeave = () => {
        mousePosition.current = null;
    }

    let animationFrameId: number;
    const startTime = Date.now();

    const tick = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      
      // OPTIMIZATION: All calculations are now inside the animation frame loop.
      if (mousePosition.current) {
        const { MOUSE_REPULSION_RADIUS, MAX_REPULSION_FORCE } = PHYSICS_CONFIG;
        const mouse = mousePosition.current;
        homePositions.forEach((home, i) => {
          const dist = Math.hypot(mouse.x - home.x, mouse.y - home.y);
          if (dist < MOUSE_REPULSION_RADIUS) {
            const angle = Math.atan2(home.y - mouse.y, home.x - mouse.x);
            const force = ((MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS) * MAX_REPULSION_FORCE;
            repulsionForces[i].x = Math.cos(angle) * force;
            repulsionForces[i].y = Math.sin(angle) * force;
          }
        });
      }

      motionValues.forEach((mv, i) => {
        const params = animParams[i];
        const ambientX = Math.sin(elapsedTime * params.freqX + params.phaseX) * params.ampX;
        const ambientY = Math.cos(elapsedTime * params.freqY + params.phaseY) * params.ampY;

        const repulsion = repulsionForces[i];
        repulsion.x *= PHYSICS_CONFIG.DAMPING_FACTOR;
        repulsion.y *= PHYSICS_CONFIG.DAMPING_FACTOR;

        const targetX = ambientX + repulsion.x;
        const targetY = ambientY + repulsion.y;

        animate(mv.x, targetX, PHYSICS_CONFIG.SPRING);
        animate(mv.y, targetY, PHYSICS_CONFIG.SPRING);
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, itemsCount, motionValues, animParams]);

  return motionValues;
}


interface InteractiveLogoGridProps {
  logos: string[];
}

// MAINTAINABILITY: Wrap component in React.memo
export const InteractiveLogoGrid = memo(function InteractiveLogoGrid({ logos }: InteractiveLogoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const motionValues = useFlockAnimation(gridRef, logos.length);

  return (
    <div
      ref={gridRef}
      className="relative w-full max-w-6xl grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 md:gap-6 pt-12"
    >
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-center aspect-square"
          style={{
            x: motionValues[index].x,
            y: motionValues[index].y,
          }}
        >
          <img
            src={logo}
            alt={`Partner logo ${index + 1}`}
            className="max-w-full max-h-12 object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110 pointer-events-none"
          />
        </motion.div>
      ))}
    </div>
  );
});