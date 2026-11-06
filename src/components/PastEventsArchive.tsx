import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

function FitTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    let lastWidth = 0;

    const fit = () => {
      element.style.fontSize = '';
      let size = parseFloat(getComputedStyle(element).fontSize);
      const lineHeight = 1.15;
      const twoLines = () => size * lineHeight * 2 + 1;
      while (element.scrollHeight > twoLines() && size > 13) {
        size -= 1;
        element.style.fontSize = `${size}px`;
      }
    };

    fit();
    void document.fonts?.ready.then(() => {
      if (element.isConnected) fit();
    });
    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      fit();
    });
    if (element.parentElement) observer.observe(element.parentElement);
    return () => observer.disconnect();
  }, [text]);

  return <h4 ref={ref} className="wall-polaroid-title font-cormorant italic">{text}</h4>;
}

function formatPastDate(event: StudioEvent) {
  const [year, month, day] = event.dateTime.split('-');
  return year && month && day ? `${day}.${month}.${year}` : event.coverDate;
}

function PastEventPolaroid({ events, playing }: { events: StudioEvent[]; playing: boolean }) {
  const { t } = useTranslation();
  return (
    <ul className="wall-polaroid">
      {events.map((event, index) => {
        const key = `events.items.${event.id}`;
        const title = t(`${key}.title`);
        return (
          <li key={event.id}>
            <div className="wall-polaroid-photo">
              <EventMedia event={event} ratio="1x1" playing={playing} offset={index * 1100} />
              <time className="wall-polaroid-date font-mono" dateTime={event.dateTime}>{formatPastDate(event)}</time>
            </div>
            <div className="wall-polaroid-caption">
              <FitTitle text={title} />
            </div>
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
