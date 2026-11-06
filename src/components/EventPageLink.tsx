import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { availableEventPath } from '../data/eventPages';

export function EventPageLink({ eventId, children, label }: { eventId: string; children: ReactNode; label?: string }) {
  const { i18n } = useTranslation();
  const path = availableEventPath(eventId, i18n.language);
  return path ? <Link className="event-detail-link" to={path} aria-label={label}>{children}</Link> : <>{children}</>;
}
