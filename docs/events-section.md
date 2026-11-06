# Events section

The homepage section and navigation entry sit between Services and Contact. Upcoming events remain expanded. The approved past-events preview is a short chronology of the three newest events, with a link to `/events/archive`.

The dedicated archive uses the approved chronological index: year headings, dates and titles, small covers on desktop, eight events per page. There is no search box or year dropdown. The page number is stored in URL query parameters for reloads and browser navigation. The build generates `dist/events/archive/index.html` for direct GitHub Pages access. The archive currently includes 20 temporary mock events from 2024–2025, labelled “Макет” / “Mock”, for reviewing all three pages. Remove `mockPastEvents` and its translations before publishing. The three homepage entries remain real supplied events because the mock dates are older.

## Updating content

- `src/data/events.ts` defines the event IDs, grouping, display order, machine-readable dates, lunar cover variants, media, and action destinations.
- `src/locales/ru.json` and `src/locales/en.json` contain the titles, dates, schedules, prices, and button labels under `events`.
- To replace a lunar cover, set `media` to `{ type: 'image', src: '/media/...' }` or `{ type: 'video', src: '/video/...', poster: '/media/...' }`. Videos use native controls and do not autoplay.
- Set an upcoming event's `actionUrl` to its approved details, registration, or checkout URL. Until then, the explicitly labelled email action opens a draft to the studio's existing public address with the event title in its subject. This does not reserve a place, submit an application automatically, or take payment.

## Content awaiting confirmation

- Final covers and expanded event descriptions have not been supplied.
- The beginners' course has month-level dates only. Its position follows the supplied order after the lab; no exact start day is invented.
- The workshop date `27.08.206` is interpreted as `27.08.2026`.
- “Праздник ростков и всходов” remains the working title from the brief.
- Event groups are curated, not automatically changed by the visitor's clock. Move events to `past` after they finish. The archive sorts them newest first by `dateTime` automatically.
