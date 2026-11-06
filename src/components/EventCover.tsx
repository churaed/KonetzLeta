import { useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { StudioEvent } from '../data/events';

export function EventCover({ event, title, ambient = false }: { event: StudioEvent; title: string; ambient?: boolean }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  return (
    <div className={`event-cover event-cover--${event.phase}`}>
      {ambient && event.media?.type === 'image' ? <img className="event-cover-backdrop" src={event.media.poster || event.media.src} alt="" aria-hidden="true" loading="lazy" decoding="async" /> : null}
      {event.media ? (
        event.media.type === 'video' ? (
          <video controls playsInline preload="none" poster={event.media.poster} aria-label={title}>
            <source src={event.media.src} />
            <a href={event.media.src}>{t('events.watch_video')}</a>
          </video>
        ) : (
          <img src={reducedMotion && event.media.poster ? event.media.poster : event.media.src} alt="" loading="lazy" decoding="async" />
        )
      ) : (
        <div className="event-lunar-art" aria-hidden="true">
          <span className="event-orbit" />
          <span className="event-moon" />
          <span className="event-cover-date font-cormorant">{event.coverDate}</span>
        </div>
      )}
    </div>
  );
}
