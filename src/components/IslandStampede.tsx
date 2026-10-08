import { useState, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import herd from '../assets/images/houyhnhnms-illustrations/optimized/herd.webp';
import procession from '../assets/images/houyhnhnms-illustrations/optimized/procession.webp';
import horse from '../assets/images/houyhnhnms-illustrations/optimized/horse.webp';
import { outlineBounds } from './islandIllustrationBounds';
import './IslandStampede.css';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}
const runners = [
  { art: 'procession', lane: 72, width: 58, delay: .3, duration: 2.8, bounce: .24, reverse: false },
  { art: 'horse', lane: 48, width: 19, delay: .55, duration: 2.3, bounce: .19, reverse: false },
  { art: 'herd', lane: 27, width: 48, delay: .8, duration: 2.7, bounce: .3, reverse: false },
  { art: 'procession', lane: 57, width: 65, delay: 1.1, duration: 2.5, bounce: .21, reverse: false },
  { art: 'horse', lane: 14, width: 15, delay: 1.3, duration: 2.2, bounce: .18, reverse: false },
  { art: 'herd', lane: 81, width: 52, delay: 1.55, duration: 2.6, bounce: .26, reverse: false },
  { art: 'herd', lane: 42, width: 44, delay: 1.8, duration: 2.3, bounce: .2, reverse: true },
  { art: 'horse', lane: 64, width: 23, delay: 2, duration: 2.1, bounce: .17, reverse: false },
  { art: 'procession', lane: 20, width: 50, delay: 2.15, duration: 2.4, bounce: .23, reverse: false },
  { art: 'horse', lane: 86, width: 17, delay: 2.5, duration: 2, bounce: .16, reverse: false },
  // One very late horse brings up the rear after the traffic clears.
  { art: 'horse', lane: 62, width: 22, delay: 4.15, duration: 2, bounce: .14, reverse: false },
] as const;
const artwork = { herd, procession, horse };

export function IslandStampede() {
  const [finished, setFinished] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);
  if (finished || reducedMotion) return null;

  return createPortal(
    <div className="island-stampede" aria-hidden="true">
      {runners.map((runner, index) => {
        const bounds = outlineBounds[runner.art];
        const flip = runner.art === 'procession' ? runner.reverse : !runner.reverse;
        const style = {
          '--lane': `${runner.lane}dvh`, '--runner-width': `${runner.width}vw`,
          '--delay': `${runner.delay}s`, '--duration': `${runner.duration}s`,
          '--bounce': `${runner.bounce}s`, '--facing': flip ? -1 : 1,
        } as CSSProperties;
        return <div
          key={index}
          className={`stampede-runner ${runner.reverse ? 'stampede-reverse' : ''} ${index === runners.length - 1 ? 'stampede-straggler' : ''}`}
          style={style}
          onAnimationEnd={index === runners.length - 1 ? event => {
            if (event.target === event.currentTarget) setFinished(true);
          } : undefined}
        >
          <div className="stampede-gallop">
            <svg viewBox={bounds.viewBox} style={{ aspectRatio: bounds.ratio }}>
              <image href={artwork[runner.art]} width={bounds.width} height={bounds.height} />
            </svg>
          </div>
        </div>;
      })}
    </div>, document.body,
  );
}
