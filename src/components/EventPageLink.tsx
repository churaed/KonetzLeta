import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { availableEventPath } from '../data/eventPages';

export function EventPageLink({ eventId, children, label }: { eventId: string; children: ReactNode; label?: string }) {
  const path = availableEventPath(eventId);
  return path ? <Link className="event-detail-link" to={path} aria-label={label}>{children}</Link> : <>{children}</>;
}
