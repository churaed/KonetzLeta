import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pastEvents, studioEvents, type StudioEvent } from '../data/events';
import './EventsSection.css';
import { EventPageLink } from './EventPageLink';
import { EventCover } from './EventCover';
import { LunarBackground } from './LunarBackground';

export function EventsSection() {
  const { t } = useTranslation();
  return (
    <section id="events" aria-labelledby="events-title" className="events-section py-32 bg-black">
      <LunarBackground />
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-20 space-y-8">
          <h2 id="events-title" className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            {t('events.title')}
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
        </header>

        <div className="events-group events-group--upcoming">
          <h3 id="events-upcoming" className="events-group-title font-cormorant italic">
            {t('events.upcoming')}
          </h3>
          <ul aria-labelledby="events-upcoming" className="events-grid events-frame--ambient">
            {studioEvents.filter((event) => event.group === 'upcoming').map((event) => (
              <EventCard key={event.id} event={event} ambient />
            ))}
          </ul>
        </div>
        <PastEventsArchive />
      </div>
    </section>
  );
}

function EventCard({ event, ambient }: { event: StudioEvent; ambient: boolean }) {
  const { t } = useTranslation();
  const key = `events.items.${event.id}`;
  const title = t(`${key}.title`);
  const description = t(`${key}.description`, { defaultValue: '' });
  const schedule = t(`${key}.schedule`, { defaultValue: '' });
  const capacity = t(`${key}.capacity`, { defaultValue: '' });
  const price = t(`${key}.price`, { defaultValue: '' });
  const emailUrl = `mailto:konetzleta@gmail.com?subject=${encodeURIComponent(`${t('events.email_subject')}: ${title}`)}`;

  return (
    <li className="event-card">
      <article aria-labelledby={`event-${event.id}`}>
        <EventPageLink eventId={event.id} label={title}><EventCover event={event} title={title} ambient={ambient} /></EventPageLink>
        <div className="event-content">
          <p className="event-date font-mono">
            <time dateTime={event.dateTime}>{t(`${key}.date`)}</time>
            {event.endDateTime ? <time className="sr-only" dateTime={event.endDateTime}>{t(`${key}.end_date`)}</time> : null}
          </p>
          <h4 id={`event-${event.id}`} className="event-title font-cormorant italic"><EventPageLink eventId={event.id}>{title}</EventPageLink></h4>
          {description ? <p className="event-description font-mono">{description}</p> : null}
          {schedule || capacity || price ? (
            <ul className="event-facts font-mono">
              {schedule ? <li>{schedule}</li> : null}
              {capacity ? <li>{capacity}</li> : null}
              {price ? <li className="event-price">{price}</li> : null}
            </ul>
          ) : null}
          {event.action && event.group === 'upcoming' && event.registrationOpen !== false ? (
            <div className="event-action-wrap">
              <a className="event-action font-mono" href={event.actionUrl || emailUrl} target={event.actionUrl ? '_blank' : undefined} rel={event.actionUrl ? 'noopener noreferrer' : undefined} aria-label={`${t(event.actionUrl ? `events.actions.${event.action}` : `events.email_actions.${event.action}`)}: ${title}`}>
                <span>{t(event.actionUrl ? `events.actions.${event.action}` : `events.email_actions.${event.action}`)}</span>
                <ArrowUpRight className="event-ui-icon" size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
              {event.action === 'apply' ? <p className="event-deadline font-mono">{t('events.application_deadline')}</p> : null}
            </div>
          ) : null}
        </div>
      </article>
    </li>
  );
}

function PastEventsArchive() {
  const { t } = useTranslation();
  const events = pastEvents.slice(0, 3);
  if (!events.length) return null;
  return (
    <div className="events-group events-archive" aria-labelledby="events-past">
      <header className="archive-header">
        <h3 id="events-past" className="events-group-title font-cormorant italic">{t('events.past')}</h3>
        <Link className="archive-page-link font-mono" to="/events/archive">{t('events.archive.show_all')} <ArrowUpRight className="event-ui-icon" size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
      </header>
      <ul className="chronicle-list">
        {events.map(event => (
          <li key={event.id} className="chronicle-row">
            <time className="event-date font-mono" dateTime={event.dateTime}>{t(`events.items.${event.id}.date`)}</time>
            <h4 className="chronicle-title font-cormorant italic"><EventPageLink eventId={event.id}>{t(`events.items.${event.id}.title`)}</EventPageLink></h4>
          </li>
        ))}
      </ul>
    </div>
  );
}


