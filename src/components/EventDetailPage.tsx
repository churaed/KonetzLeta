import { useReducedMotion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { eventPages, siblingEventPage, type EventPageBlock, type ProgrammeMedia } from '../data/eventPages';
import { studioEvents } from '../data/events';
import { ApplicationAction } from './ApplicationAction';
import { EventCover } from './EventCover';
import { LanguageSwitcher } from './LanguageSwitcher';
import './EventsSection.css';
import './EventDetailPage.css';

function MeetingMedia({ media, playing, language }: { media: ProgrammeMedia; playing: boolean; language: string }) {
  const { t } = useTranslation();
  const asset = (src: string) => `${import.meta.env.BASE_URL}${src}`;
  return media.type === 'video'
    ? <video className="event-meeting-media" controls playsInline preload="none" poster={asset(media.poster)} aria-label={media.alt}><source src={asset(media.src)} type="video/mp4" /><a href={asset(media.src)}>{t('events.watch_video', { lng: language })}</a></video>
    : <div className="event-animation-player"><img className="event-meeting-media" src={asset(playing ? media.src : media.poster)} alt={media.alt} loading="lazy" decoding="async" /></div>;
}

function ContentBlock({ block, registration, language }: { block: EventPageBlock; registration?: ReactNode; language: string }) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const isPlaying = playing ?? !reducedMotion;
  return <section className={`event-detail-block event-detail-block--${block.type}`}>
    <h2 className="font-cormorant italic">{block.heading}</h2>
    {block.type === 'contacts' && <><p><a className="event-person-link" href={`mailto:${block.email}`}>{block.email}</a></p><p><a className="event-person-link" href={`tel:${block.phone}`}>{block.phone}</a></p></>}
    {block.type === 'text' && block.paragraphs.map((text, index) => <p key={index}>{text}</p>)}
    {block.type === 'booking' && <div className="event-booking">
      <p className="event-booking-capacity">{block.capacity}</p>
      <dl className="event-booking-prices">{block.prices.map(price => <div key={price.label}><dt>{price.label}</dt><dd>{price.value}</dd></div>)}</dl>
      <p className="event-booking-note">{block.note}</p>
      {registration}
    </div>}
    {block.type === 'facts' && <ul className="event-detail-facts">{block.items.map((text, index) => <li key={index}>{text}</li>)}</ul>}
    {block.type === 'programme' && <>{block.afterword && <p className="event-programme-intro">{block.afterword}</p>}<div className="event-programme-controls"><div className="event-programme-stage"><ol id="event-programme" className="event-programme">{block.items.map((item, index) => <li key={index}><span className="event-programme-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="event-meeting-content"><div className="event-meeting-summary"><h3 className="font-cormorant italic"><span className="sr-only">{t('events.detail.meeting', { lng: language, number: index + 1 })} </span>{item.title}</h3><p>{item.description}</p></div>{item.media && <MeetingMedia media={item.media} playing={isPlaying} language={language} />}</div></li>)}</ol></div><div className="event-animation-side"><button className="event-animation-control" type="button" aria-controls="event-programme" aria-pressed={isPlaying} aria-label={t(isPlaying ? 'events.detail.pause_animations' : 'events.detail.play_animations', { lng: language })} onClick={() => setPlaying(!isPlaying)}>{isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</button></div></div></>}
    {block.type === 'people' && block.items.map(person => <p key={person.url}><a className="event-person-link" href={person.url} target="_blank" rel="noopener noreferrer">{person.name}</a> — {person.description}</p>)}
    {block.type === 'gallery' && <div className="event-detail-gallery">{block.images.map(image => <figure key={image.src}><img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} loading="lazy" decoding="async" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>}
  </section>;
}

export function EventDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const page = eventPages.find(item => item.slug === slug && (item.status === 'published' || import.meta.env.DEV));
  const event = studioEvents.find(item => item.id === page?.eventId);

  useEffect(() => {
    if (page && i18n.language.split('-')[0] !== page.language) void i18n.changeLanguage(page.language);
  }, [page, i18n]);

  useEffect(() => {
    const previous = document.title;
    const language = page?.language ?? i18n.language;
    const studio = t('events.detail.studio_name', { lng: language });
    document.title = `${page ? page.title : t('events.detail.not_found', { lng: language })} — ${studio}`;
    return () => { document.title = previous; };
  }, [page, t, i18n.language]);

  if (!page || !event) return <main className="event-detail-page"><div className="event-detail-shell"><h1 className="font-cormorant italic">{t('events.detail.not_found')}</h1><Link className="archive-page-link font-mono" to="/#events">{t('events.archive.back')}</Link></div></main>;
  const contentT = (key: string) => t(key, { lng: page.language });
  const key = `events.items.${event.id}`;
  const action = event.actionUrl || `mailto:konetzleta@gmail.com?subject=${encodeURIComponent(`${contentT('events.email_subject')}: ${page.title}`)}`;
  const registration = event.action && event.group === 'upcoming' && event.registrationOpen !== false
    ? <ApplicationAction href={action} label={page.registrationLabel || contentT(event.actionUrl ? `events.actions.${event.action}` : `events.email_actions.${event.action}`)} external={Boolean(event.actionUrl)} />
    : null;
  const switchLanguage = (language: string) => {
    const sibling = siblingEventPage(page, language);
    if (sibling) navigate(`/events/${sibling.slug}`);
  };
  return <main className="event-detail-page">
    <div className="event-detail-shell">
      <div className="archive-page-topbar"><Link className="archive-page-link font-mono" to="/#events"><ArrowLeft className="directional-icon" strokeWidth={1.5} size={16} aria-hidden="true" />{t('events.archive.back', { lng: page.language })}</Link><LanguageSwitcher onChange={switchLanguage} /></div>
      {page.status === 'draft' && <p className="event-draft-note font-mono" role="status">{t('events.detail.draft_note', { lng: page.language })}</p>}

      <article lang={page.language}>
        <header className="event-detail-heading"><p className="event-date font-mono"><time dateTime={event.dateTime}>{contentT(`${key}.date`)}</time></p><h1 className="font-cormorant italic">{page.title}</h1>{page.showIntro !== false && <p className="event-detail-intro font-mono">{page.description}</p>}</header>
        {page.showCover !== false && <div className="events-frame--ambient event-detail-hero"><EventCover event={event} title={page.title} ambient /></div>}
        <div className="event-detail-body font-mono">{page.blocks.map((block, index) => <ContentBlock key={index} block={block} registration={registration} language={page.language} />)}
          {!page.blocks.some(block => block.type === 'booking') && registration && <section className="event-detail-block event-detail-registration"><h2 className="font-cormorant italic">{t('events.detail.participation', { lng: page.language })}</h2>{registration}</section>}
        </div>
      </article>
    </div>
  </main>;
}
