import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { StudioEvent } from '../data/events';
import { pastEvents } from '../data/events';
import { PHOTO_RATIOS, eventPhotoSrc, eventPhotos, type PhotoRatio } from '../data/eventPhotos';
import { EventCover } from './EventCover';
import './PastEvents.css';

const SLIDE_INTERVAL = 4500;

function Moon({ event, ratio, className = '' }: { event: StudioEvent; ratio: PhotoRatio; className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={`past-frame past-frame--${ratio} ${className}`.trim()}>
      <EventCover event={event} title={t(`events.items.${event.id}.title`)} />
    </div>
  );
}

function Slideshow({ event, ratio, playing, offset = 0 }: { event: StudioEvent; ratio: PhotoRatio; playing: boolean; offset?: number }) {
  const { t } = useTranslation();
  const photos = eventPhotos[event.id] ?? [];
  const { width, height } = PHOTO_RATIOS[ratio];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!playing || photos.length < 2) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setActive(current => (current + 1) % photos.length);
      interval = window.setInterval(() => setActive(current => (current + 1) % photos.length), SLIDE_INTERVAL);
    }, offset);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [playing, photos.length, offset]);

  useEffect(() => {
    if (active >= photos.length) setActive(0);
  }, [active, photos.length]);

  if (!photos.length) return <Moon event={event} ratio={ratio} />;

  return (
    <div className={`past-frame past-frame--${ratio} past-slideshow`} role="group" aria-label={t('events.past_photos.label', { name: t(`events.items.${event.id}.title`) })}>
      {photos.map((name, index) => (
        <img
          key={name}
          className={index === active ? 'is-active' : ''}
          src={eventPhotoSrc(event.id, name, ratio)}
          width={width}
          height={height}
          alt={t(`events.items.${event.id}.photos.${name}`)}
          aria-hidden={index !== active}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

function EventMedia({ event, ratio, playing, offset }: { event: StudioEvent; ratio: PhotoRatio; playing: boolean; offset?: number }) {
  return eventPhotos[event.id]?.length
    ? <Slideshow event={event} ratio={ratio} playing={playing} offset={offset} />
    : <Moon event={event} ratio={ratio} />;
}

function PastEventPolaroid({ events, playing }: { events: StudioEvent[]; playing: boolean }) {
  const { t } = useTranslation();
  return (
    <ul className="wall-polaroid">
      {events.map((event, index) => {
        const key = `events.items.${event.id}`;
        return (
          <li key={event.id}>
            <div className="wall-polaroid-photo">
              <EventMedia event={event} ratio="1x1" playing={playing} offset={index * 1100} />
              <time className="wall-polaroid-date font-cormorant italic" dateTime={event.dateTime}>
                {event.coverDate}
                <span className="sr-only"> — {t(`${key}.date`)}</span>
              </time>
            </div>
            <h4 className="wall-polaroid-title font-cormorant italic">{t(`${key}.title`)}</h4>
          </li>
        );
      })}
    </ul>
  );
}

export function PastEventsArchive() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const playing = !reducedMotion;
  const events = pastEvents.slice(0, 4);

  if (!events.length) return null;
  return (
    <section className="events-group events-archive" aria-labelledby="events-past">
      <header className="archive-header">
        <h3 id="events-past" className="events-group-title font-cormorant italic">{t('events.past')}</h3>
      </header>
      <PastEventPolaroid events={events} playing={playing} />
    </section>
  );
}
