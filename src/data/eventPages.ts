export interface ProgrammeMedia { type: 'image' | 'video'; src: string; poster: string; alt: string }
export type EventPageBlock =
  | { type: 'contacts'; heading: string; email: string; phone: string }
  | { type: 'text'; heading: string; paragraphs: string[] }
  | { type: 'booking'; heading: string; capacity: string; prices: { label: string; value: string }[]; note: string }
  | { type: 'facts'; heading: string; items: string[] }
  | { type: 'programme'; heading: string; items: { title: string; description: string; media?: ProgrammeMedia }[]; afterword?: string }
  | { type: 'people'; heading: string; items: { name: string; url: string; description: string }[] }
  | { type: 'gallery'; heading: string; images: { src: string; alt: string; caption?: string }[] };
export interface EventPageContent {
  eventId: string;
  slug: string;
  status: 'draft' | 'published';
  language: string;
  title: string;
  description: string;
  showCover?: boolean;
  showIntro?: boolean;
  registrationLabel?: string;
  blocks: EventPageBlock[];
}
declare const __EVENT_PAGES__: EventPageContent[];
export const eventPages = __EVENT_PAGES__;

const isAvailable = (page: EventPageContent) => page.status === 'published' || import.meta.env.DEV;
const languageCode = (language?: string) => language?.toLowerCase().split('-')[0];

export function findEventPage(eventId: string, language?: string) {
  const pages = eventPages.filter(page => page.eventId === eventId && isAvailable(page));
  return (language ? pages.find(page => page.language === languageCode(language)) : undefined) ?? pages[0];
}

export function availableEventPath(eventId: string, language?: string) {
  const page = findEventPage(eventId, language);
  return page ? `/events/${page.slug}` : undefined;
}

export function siblingEventPage(page: EventPageContent, language: string) {
  return eventPages.find(item => item.eventId === page.eventId && item.language === languageCode(language) && isAvailable(item));
}
