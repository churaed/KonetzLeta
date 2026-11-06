import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function ApplicationAction({ href, label, external }: { href: string; label: string; external: boolean }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(true);
  const reducedMotion = useReducedMotion();
  const id = useId();
  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const observer = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting), { threshold: .5 });
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);
  const action = (floating: boolean) => <motion.a
    layoutId={reducedMotion ? undefined : id}
    initial={reducedMotion ? { opacity: 0 } : false}
    animate={{ opacity: 1 }}
    transition={reducedMotion ? { duration: .12 } : { type: 'spring', duration: .5, bounce: 0 }}
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={floating ? 'application-capsule' : 'event-action event-detail-primary-action'}
    style={{ borderRadius: floating ? 999 : 0 }}
  ><motion.span layout="position">{label}</motion.span><ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" /></motion.a>;
  return <LayoutGroup id={id}>
    <div id="event-application" ref={slotRef} className="application-action-slot">
      {!docked && action(false)}
    </div>
    {docked && createPortal(<div className="application-capsule-dock">{action(true)}</div>, document.body)}
  </LayoutGroup>;
}
