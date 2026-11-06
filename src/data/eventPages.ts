export interface ProgrammeMedia { type: 'image' | 'video'; src: string; poster: string; alt: string }
export type EventPageBlock =
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
  blocks: EventPageBlock[];
}
declare const __EVENT_PAGES__: EventPageContent[];
export const eventPages = __EVENT_PAGES__;
export function availableEventPath(eventId: string) {
  const page = eventPages.find(page => page.eventId === eventId && (page.status === 'published' || import.meta.env.DEV));
  return page ? `/events/${page.slug}` : undefined;
}
