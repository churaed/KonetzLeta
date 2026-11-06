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
}

// Upcoming order follows the brief: the beginners' course has no exact start day.
// Lunar covers remain available as the fallback; add booking URLs when supplied.
export const studioEvents: StudioEvent[] = [
  { id: 'experimental-lab', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/experimental-lab.webp`, poster: `${import.meta.env.BASE_URL}images/events/experimental-lab-poster.webp` }, group: 'upcoming', dateTime: '2026-11-23', endDateTime: '2026-12-28', coverDate: '23.11', phase: 'crescent', action: 'register' },
  { id: 'beginners-animation', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/beginners-animation.webp` }, group: 'upcoming', dateTime: '2026-11', endDateTime: '2027-01', coverDate: 'XI — I', phase: 'half', action: 'register' },
  { id: 'sprouts', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/sprouts.webp`, poster: `${import.meta.env.BASE_URL}images/events/sprouts-poster.webp` }, group: 'upcoming', dateTime: '2026-12-26', coverDate: '26.12', phase: 'full', action: 'enquire' },
  { id: 'short-animation', media: { type: 'image', src: `${import.meta.env.BASE_URL}images/events/short-animation.webp` }, group: 'upcoming', dateTime: '2027-02-11', coverDate: '11.02', phase: 'new', action: 'apply', actionUrl: 'https://forms.yandex.ru/u/6ae99cc090290257ed8a8ad1/' },
  { id: 'scary-things', group: 'past', dateTime: '2026-10-30', coverDate: '30.10', phase: 'new' },
  { id: 'experimental-cinema-day', group: 'past', dateTime: '2026-08-31', coverDate: '31.08', phase: 'half' },
  // The brief's "27.08.206" is interpreted as 27 August 2026.
  { id: 'animation-workshop', group: 'past', dateTime: '2026-08-27', coverDate: '27.08', phase: 'crescent' },
  { id: 'housewarming', group: 'past', dateTime: '2026-08-06', coverDate: '06.08', phase: 'full' },
];

// Temporary mock archive entries for layout review. Remove before publishing.
const mockPastEvents: StudioEvent[] = [
  {"id": "mock-past-01", "group": "past", "dateTime": "2025-12-15", "coverDate": "15.12", "phase": "new"},
  {"id": "mock-past-02", "group": "past", "dateTime": "2025-11-15", "coverDate": "15.11", "phase": "crescent"},
  {"id": "mock-past-03", "group": "past", "dateTime": "2025-10-15", "coverDate": "15.10", "phase": "half"},
  {"id": "mock-past-04", "group": "past", "dateTime": "2025-09-15", "coverDate": "15.09", "phase": "full"},
  {"id": "mock-past-05", "group": "past", "dateTime": "2025-08-15", "coverDate": "15.08", "phase": "new"},
  {"id": "mock-past-06", "group": "past", "dateTime": "2025-07-15", "coverDate": "15.07", "phase": "crescent"},
  {"id": "mock-past-07", "group": "past", "dateTime": "2025-06-15", "coverDate": "15.06", "phase": "half"},
  {"id": "mock-past-08", "group": "past", "dateTime": "2025-05-15", "coverDate": "15.05", "phase": "full"},
  {"id": "mock-past-09", "group": "past", "dateTime": "2025-04-15", "coverDate": "15.04", "phase": "new"},
  {"id": "mock-past-10", "group": "past", "dateTime": "2025-03-15", "coverDate": "15.03", "phase": "crescent"},
  {"id": "mock-past-11", "group": "past", "dateTime": "2024-12-15", "coverDate": "15.12", "phase": "half"},
  {"id": "mock-past-12", "group": "past", "dateTime": "2024-11-15", "coverDate": "15.11", "phase": "full"},
  {"id": "mock-past-13", "group": "past", "dateTime": "2024-10-15", "coverDate": "15.10", "phase": "new"},
  {"id": "mock-past-14", "group": "past", "dateTime": "2024-09-15", "coverDate": "15.09", "phase": "crescent"},
  {"id": "mock-past-15", "group": "past", "dateTime": "2024-08-15", "coverDate": "15.08", "phase": "half"},
  {"id": "mock-past-16", "group": "past", "dateTime": "2024-07-15", "coverDate": "15.07", "phase": "full"},
  {"id": "mock-past-17", "group": "past", "dateTime": "2024-06-15", "coverDate": "15.06", "phase": "new"},
  {"id": "mock-past-18", "group": "past", "dateTime": "2024-05-15", "coverDate": "15.05", "phase": "crescent"},
  {"id": "mock-past-19", "group": "past", "dateTime": "2024-04-15", "coverDate": "15.04", "phase": "half"},
  {"id": "mock-past-20", "group": "past", "dateTime": "2024-03-15", "coverDate": "15.03", "phase": "full"},
];
studioEvents.push(...mockPastEvents);

export const pastEvents = studioEvents.filter(event => event.group === 'past').sort((a, b) => b.dateTime.localeCompare(a.dateTime));
