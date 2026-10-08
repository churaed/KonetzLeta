import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './IslandDiscovery.css';
import tree from '../assets/images/houyhnhnms-illustrations/optimized/tree.webp';
import herd from '../assets/images/houyhnhnms-illustrations/optimized/herd.webp';
import huddle from '../assets/images/houyhnhnms-illustrations/optimized/huddle.webp';
import friends from '../assets/images/houyhnhnms-illustrations/optimized/friends.webp';
import procession from '../assets/images/houyhnhnms-illustrations/optimized/procession.webp';
import horse from '../assets/images/houyhnhnms-illustrations/optimized/horse.webp';
import face from '../assets/images/houyhnhnms-illustrations/optimized/face.webp';
import landscape from '../assets/images/houyhnhnms-illustrations/optimized/landscape.webp';
import earth from '../assets/images/houyhnhnms-illustrations/optimized/earth.webp';
import skeleton from '../assets/images/houyhnhnms-illustrations/optimized/skeleton.webp';
import bones from '../assets/images/houyhnhnms-illustrations/optimized/bones.webp';
import { outlineBounds } from './islandIllustrationBounds';

const boundsByImage = new Map<string, {viewBox: string; width: number; height: number; ratio: number}>([
  [horse, outlineBounds.horse], [herd, outlineBounds.herd], [huddle, outlineBounds.huddle],
  [friends, outlineBounds.friends], [face, outlineBounds.face], [procession, outlineBounds.procession],
  [tree, outlineBounds.tree], [landscape, outlineBounds.landscape], [earth, outlineBounds.earth],
  [skeleton, outlineBounds.skeleton], [bones, outlineBounds.bones],
]);

const islandVisitors = [
  { id: 'landscape', src: landscape, at: 0, label: 'Island landscape' },
  { id: 'tree', src: tree, at: 0, label: 'Island tree' },
  { id: 'earth', src: earth, at: 0, label: 'Island ground' },
  { id: 'horse', src: horse, at: 0, label: 'horse' },
  { id: 'face', src: face, at: 1, label: 'face' },
  { id: 'huddle', src: huddle, at: 1, label: 'Huddled horses' },
  { id: 'friends', src: friends, at: 2, label: 'friends' },
  { id: 'herd', src: herd, at: 2, label: 'Island herd' },
  { id: 'bones', src: bones, at: 3, label: 'bones' },
  { id: 'skeleton', src: skeleton, at: 3, label: 'Horse skeleton' },
  { id: 'procession', src: procession, at: 4, label: 'The final procession' },
];
// Upper side margins have room for more discoveries on a large desktop card.
const desktopQuery = '(min-width: 1024px) and (min-height: 700px)';
const spaciousDesktopQuery = '(min-width: 1024px) and (min-height: 900px)';
const desktopVisitors = [
  { id: 'guest-face-left', src: face, at: 1, tier: 1, label: 'Decorative visitor' },
  { id: 'guest-earth-right', src: earth, at: 1, tier: 1, label: 'Decorative visitor' },
  { id: 'guest-tree-left', src: tree, at: 2, tier: 2, label: 'Decorative visitor' },
  { id: 'guest-friends-right', src: friends, at: 2, tier: 2, label: 'Decorative visitor' },
  { id: 'guest-earth-left', src: earth, at: 3, tier: 2, label: 'Decorative visitor' },
  { id: 'guest-face-right', src: face, at: 3, tier: 2, label: 'Decorative visitor' },
  { id: 'guest-horse', src: horse, at: 4, tier: 1, label: 'Decorative visitor' },
];
function subscribeDesktop(listener: () => void) {
  const queries = [window.matchMedia(desktopQuery), window.matchMedia(spaciousDesktopQuery)];
  queries.forEach(query => query.addEventListener('change', listener));
  return () => queries.forEach(query => query.removeEventListener('change', listener));
}
function getDesktopCapacity() {
  if (window.matchMedia(spaciousDesktopQuery).matches) return 2;
  return window.matchMedia(desktopQuery).matches ? 1 : 0;
}
const islandTargets = ['horse', 'face', 'friends', 'bones'];

export default function IslandDiscovery() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const keyboardDiscovery = useRef(false);
  const complete = step === islandTargets.length;
  const desktopCapacity = useSyncExternalStore(subscribeDesktop, getDesktopCapacity, () => 0);
  const visibleVisitors = [...islandVisitors, ...desktopVisitors.filter(visitor => visitor.tier <= desktopCapacity)].filter(visitor => visitor.at <= step);

  useEffect(() => {
    if (!keyboardDiscovery.current) return;
    keyboardDiscovery.current = false;
    scene.current?.querySelector<HTMLElement>('button, .island-verdict')?.focus({ preventScroll: true });
  }, [step]);

  function discover(event: MouseEvent<HTMLButtonElement>) {
    keyboardDiscovery.current = event.detail === 0;
    setStep(current => Math.min(current + 1, islandTargets.length));
  }

  return <div ref={scene} className="island-artwork" data-discovery-step={step}>
    <div className="island-scene">
      {visibleVisitors.map(visitor => {
        const active = visitor.id === islandTargets[step];
        const bounds = boundsByImage.get(visitor.src)!;
        const drawing = <svg viewBox={bounds.viewBox} style={{ aspectRatio: bounds.ratio }} aria-hidden="true">
          <image href={visitor.src} width={bounds.width} height={bounds.height} />
        </svg>;
        return <div key={visitor.id} className={`island-slot island-${visitor.id} ${visitor.at > 0 ? 'island-arrival' : ''}`}>
          {active
            ? <button type="button" className="island-drawing" aria-label={t(`portfolio.items.houyhnhnms.discovery.targets.${visitor.label}`)} onClick={discover}>{drawing}</button>
            : <div className="island-drawing" aria-hidden="true">{drawing}</div>}
        </div>;
      })}
      <span className="island-sr" role="status" aria-live="polite" aria-atomic="true">
        {complete ? t('portfolio.items.houyhnhnms.discovery.complete') : t('portfolio.items.houyhnhnms.discovery.progress', { count: visibleVisitors.length })}
      </span>
      {complete && <p className="island-verdict text-red-400" tabIndex={-1}>{t('portfolio.items.houyhnhnms.discovery.complete')}</p>}
    </div>
  </div>;
}
