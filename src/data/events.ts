export interface StudioEvent {
  id: string;
  group: 'upcoming' | 'past';
  dateTime: string;
  endDateTime?: string;
  coverDate: string;
  phase: 'new' | 'crescent' | 'half' | 'full';
  media?: { type: 'image' | 'video'; src: string; poster?: string };
  action?: 'register' | 'enquire' | 'apply';
  actionUrl?: string;
  registrationOpen?: boolean;
}

// Upcoming order follows the brief: the beginners' course has no exact start day.
// Lunar covers remain available as the fallback; add booking URLs when supplied.
export const studioEvents: StudioEvent[] = [
  { id: 'experimental-lab', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/experimental-lab.webp`, poster: `${import.meta.env.BASE_URL}images/events/experimental-lab-poster.webp` }, group: 'upcoming', dateTime: '2026-11-23', endDateTime: '2026-12-28', coverDate: '23.11', phase: 'crescent', action: 'apply', actionUrl: 'https://forms.yandex.ru/u/6aeda6654a052d403b0da750' },
  { id: 'beginners-animation', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/beginners-animation.webp` }, group: 'upcoming', dateTime: '2026-11', endDateTime: '2027-01', coverDate: 'XI — I', phase: 'half', action: 'register' },
  { id: 'sprouts', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/sprouts.webp`, poster: `${import.meta.env.BASE_URL}images/events/sprouts-poster.webp` }, group: 'upcoming', dateTime: '2026-12-26', coverDate: '26.12', phase: 'full', action: 'enquire' },
  { id: 'short-animation', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/short-animation.webp` }, group: 'upcoming', dateTime: '2027-02-11', coverDate: '11.02', phase: 'new', action: 'apply', actionUrl: 'https://forms.yandex.ru/u/6ae99cc090290257ed8a8ad1/' },
  { id: 'scary-things', group: 'past', dateTime: '2026-10-30', coverDate: '30.10', phase: 'new' },
  { id: 'experimental-cinema-day', group: 'past', dateTime: '2026-08-31', coverDate: '31.08', phase: 'half' },
  // The brief's "27.08.206" is interpreted as 27 August 2026.
  { id: 'animation-workshop', group: 'past', dateTime: '2026-08-27', coverDate: '27.08', phase: 'crescent' },
  { id: 'housewarming', group: 'past', dateTime: '2026-08-06', coverDate: '06.08', phase: 'full' },
];

export const pastEvents = studioEvents.filter(event => event.group === 'past').sort((a, b) => b.dateTime.localeCompare(a.dateTime));
