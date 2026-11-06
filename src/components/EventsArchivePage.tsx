import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pastEvents } from '../data/events';
import { EventPageLink } from './EventPageLink';
import { EventCover } from './EventCover';
import { LanguageSwitcher } from './LanguageSwitcher';
import './EventsSection.css';

const PAGE_SIZE = 8;

export function EventsArchivePage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.max(1, Math.ceil(pastEvents.length / PAGE_SIZE));
  const requestedPage = Number(params.get('page') || 1);
  const page = Number.isInteger(requestedPage) ? Math.max(1, Math.min(pageCount, requestedPage)) : 1;
  const visible = pastEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const visibleYears = [...new Set(visible.map(event => event.dateTime.slice(0, 4)))];

  function changePage(nextPage: number) {
    setParams({ page: String(nextPage) }, { preventScrollReset: true });
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: 'start' });
  }

  return (
    <main className="archive-page min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="archive-page-topbar">
          <Link to="/#events" className="archive-page-link font-mono"><ArrowLeft className="event-ui-icon directional-icon" size={16} strokeWidth={1.5} aria-hidden="true" /> {t('events.archive.back')}</Link>
          <LanguageSwitcher />
        </div>
        <header className="archive-page-heading">
          <h1 className="font-cormorant italic">{t('events.past')}</h1>
          <p className="font-mono">{t('events.archive.intro')}</p>
        </header>
        <p className="archive-count font-mono" role="status">
          {t('events.archive.count', { count: pastEvents.length })}
        </p>
        <div ref={resultsRef} tabIndex={-1} className="archive-results" aria-label={t('events.past')}>
          {visibleYears.map(value => (
            <section key={value} className="chronicle-year" aria-labelledby={`year-${value}`}>
              <h2 id={`year-${value}`} className="font-mono">{value}</h2>
              <ul className="chronicle-list">
                {visible.filter(event => event.dateTime.startsWith(value)).map(event => (
                  <li key={event.id}>
                    <article className="chronicle-row archive-index-row">
                      <time className="event-date font-mono" dateTime={event.dateTime}>{t(`events.items.${event.id}.date`)}</time>
                      <div>
                        <h3 className="chronicle-title font-cormorant italic"><EventPageLink eventId={event.id}>{t(`events.items.${event.id}.title`)}</EventPageLink></h3>
                        {t(`events.items.${event.id}.description`, { defaultValue: '' }) ? <p className="event-description font-mono">{t(`events.items.${event.id}.description`)}</p> : null}
                      </div>
                      <EventPageLink eventId={event.id} label={t(`events.items.${event.id}.title`)}><EventCover event={event} title={t(`events.items.${event.id}.title`)} /></EventPageLink>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        {pageCount > 1 ? (
          <nav className="archive-pagination font-mono" aria-label={t('events.archive.pagination')}>
            <button disabled={page === 1} onClick={() => changePage(page - 1)}><ArrowLeft className="event-ui-icon directional-icon" size={16} strokeWidth={1.5} aria-hidden="true" /> {t('events.archive.previous')}</button>
            <span>{t('events.archive.page', { page, total: pageCount })}</span>
            <button disabled={page === pageCount} onClick={() => changePage(page + 1)}>{t('events.archive.next')} <ArrowRight className="event-ui-icon directional-icon" size={16} strokeWidth={1.5} aria-hidden="true" /></button>
          </nav>
        ) : null}
      </div>
    </main>
  );
}
