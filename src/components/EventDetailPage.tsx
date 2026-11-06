import { useReducedMotion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { eventPages, type EventPageBlock, type ProgrammeMedia } from '../data/eventPages';
import { studioEvents } from '../data/events';
import { EventCover } from './EventCover';
import { LanguageSwitcher } from './LanguageSwitcher';
import './EventsSection.css';
import './EventDetailPage.css';

function MeetingMedia({ media, playing }: { media: ProgrammeMedia; playing: boolean }) {
  const asset = (src: string) => `${import.meta.env.BASE_URL}${src}`;
  return media.type === 'video'
    ? <video className="event-meeting-media" controls playsInline preload="none" poster={asset(media.poster)} aria-label={media.alt}><source src={asset(media.src)} type="video/mp4" /><a href={asset(media.src)}>Смотреть видео</a></video>
    : <div className="event-animation-player"><img className="event-meeting-media" src={asset(playing ? media.src : media.poster)} alt={media.alt} loading="lazy" decoding="async" /></div>;
}

function ContentBlock({ block, registration }: { block: EventPageBlock; registration?: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const isPlaying = playing ?? !reducedMotion;
  return <section className={`event-detail-block event-detail-block--${block.type}`}>
    <h2 className="font-cormorant italic">{block.heading}</h2>
    {block.type === 'text' && block.paragraphs.map((text, index) => <p key={index}>{text}</p>)}
    {block.type === 'booking' && <div className="event-booking">
      <p className="event-booking-capacity">{block.capacity}</p>
      <dl className="event-booking-prices">{block.prices.map(price => <div key={price.label}><dt>{price.label}</dt><dd>{price.value}</dd></div>)}</dl>
      <p className="event-booking-note">{block.note}</p>
      {registration}
    </div>}
    {block.type === 'facts' && <ul className="event-detail-facts">{block.items.map((text, index) => <li key={index}>{text}</li>)}</ul>}
    {block.type === 'programme' && <>{block.afterword && <p className="event-programme-intro">{block.afterword}</p>}<div className="event-programme-controls"><div className="event-programme-stage"><ol id="event-programme" className="event-programme">{block.items.map((item, index) => <li key={index}><span className="event-programme-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="event-meeting-content"><div className="event-meeting-summary"><h3 className="font-cormorant italic"><span className="sr-only">Встреча {index + 1}. </span>{item.title}</h3><p>{item.description}</p></div>{item.media && <MeetingMedia media={item.media} playing={isPlaying} />}</div></li>)}</ol></div><div className="event-animation-side"><button className="event-animation-control" type="button" aria-controls="event-programme" aria-pressed={isPlaying} aria-label={isPlaying ? 'Остановить все анимации' : 'Включить все анимации'} onClick={() => setPlaying(!isPlaying)}>{isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</button></div></div></>}
    {block.type === 'people' && block.items.map(person => <p key={person.url}><a className="event-person-link" href={person.url} target="_blank" rel="noopener noreferrer">{person.name}</a> — {person.description}</p>)}
    {block.type === 'gallery' && <div className="event-detail-gallery">{block.images.map(image => <figure key={image.src}><img src={`${import.meta.env.BASE_URL}${image.src}`} alt={image.alt} loading="lazy" decoding="async" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>}
  </section>;
}

export function EventDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const page = eventPages.find(item => item.slug === slug && (item.status === 'published' || import.meta.env.DEV));
  const event = studioEvents.find(item => item.id === page?.eventId);
  useEffect(() => {
    const previous = document.title;
    document.title = page ? `${page.title} — Конец лета` : `${t('events.detail.not_found')} — Конец лета`;
    return () => { document.title = previous; };
  }, [page, t]);
  if (!page || !event) return <main className="event-detail-page"><div className="event-detail-shell"><h1 className="font-cormorant italic">{t('events.detail.not_found')}</h1><Link className="archive-page-link font-mono" to="/#events">{t('events.archive.back')}</Link></div></main>;
  const contentT = (key: string) => t(key, { lng: page.language });
  const key = `events.items.${event.id}`;
  const action = event.actionUrl || `mailto:konetzleta@gmail.com?subject=${encodeURIComponent(`${contentT('events.email_subject')}: ${page.title}`)}`;
  const registration = event.action && event.group === 'upcoming' && event.registrationOpen !== false
    ? <a className="event-action" href={action} target={event.actionUrl ? '_blank' : undefined} rel={event.actionUrl ? 'noopener noreferrer' : undefined}>{contentT(event.actionUrl ? `events.actions.${event.action}` : `events.email_actions.${event.action}`)}<ArrowUpRight strokeWidth={1.5} size={16} aria-hidden="true" /></a>
    : null;
  return <main className="event-detail-page">
    <div className="event-detail-shell">
      <div className="archive-page-topbar"><Link className="archive-page-link font-mono" to="/#events"><ArrowLeft className="directional-icon" strokeWidth={1.5} size={16} aria-hidden="true" />{t('events.archive.back')}</Link><LanguageSwitcher /></div>
      {page.status === 'draft' && <p className="event-draft-note font-mono" role="status">Черновик · доступен только в режиме разработки. Содержание уточняется.</p>}
      <article lang={page.language}>
        <header className="event-detail-heading"><p className="event-date font-mono"><time dateTime={event.dateTime}>{contentT(`${key}.date`)}</time></p><h1 className="font-cormorant italic">{page.title}</h1>{page.showIntro !== false && <p className="event-detail-intro font-mono">{page.description}</p>}</header>
        {page.showCover !== false && <div className="events-frame--ambient event-detail-hero"><EventCover event={event} title={page.title} ambient /></div>}
        <div className="event-detail-body font-mono">{page.blocks.map((block, index) => <ContentBlock key={index} block={block} registration={registration} />)}
          {!page.blocks.some(block => block.type === 'booking') && registration && <section className="event-detail-block event-detail-registration"><h2 className="font-cormorant italic">{t('events.detail.participation')}</h2>{registration}</section>}
        </div>
      </article>
    </div>
  </main>;
}
