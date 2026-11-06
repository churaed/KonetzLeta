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

## Dedicated event pages

Content lives in `content/event-pages.json`. Each entry references an existing
`eventId` and has a manually chosen unique `slug`, `status` (`draft` or
`published`), `language`, `title`, `description`, and ordered `blocks`.
Available blocks: `text` (`paragraphs`), `facts` (`items`), `programme` (items
with `title` and `description`), and `gallery` (images with public-relative
`src`, required descriptive `alt`, optional `caption`). Reorder the array to
reorder sections. No raw HTML is accepted.

The laboratory WIP is at `/events/experimental-lab-2026` under `npm run dev`.
Vite restarts automatically when the imported content JSON changes. Its supplied screenshot has
been transcribed as provisional text; original gallery assets are still needed.
Gallery images display inline without a lightbox. Russian content retains its
language even when the surrounding navigation is switched to English.

Draft page data is excluded from production JavaScript and receives no static
HTML entry. Do not put confidential assets in `public`: all public files are
copied into builds independently of page status. Switching to `published`
includes the content, creates its GitHub Pages route, and enables cover/title
links on the homepage and archive. The registration button remains separate.
Changing a published slug requires a redirect plan; redirects are not generated
automatically. Keep published slugs stable when renaming titles.

Move an event between `upcoming` and `past` manually in `src/data/events.ts`.
Past events retain their published pages, with registration hidden. To close
registration early, set `registrationOpen: false`. Page publication and event
timing are independent. No date-driven move or payment handling is performed.

`npm run build` validates page metadata, event references, block shapes, slug
uniqueness and gallery file paths. Fix its named content error before rebuilding.
Run `node --test scripts/event-pages.test.mjs` for content validation checks.

In local development, cover/title links also open draft pages for review. Production links still require `published`; draft content remains excluded from builds.

Programme items may include `media` with `type` (`image` or `video`), `src`,
`poster` and descriptive `alt`. Paths are relative to `public`. Image animations
have a pause control and use static posters for reduced motion; videos use native
controls, no autoplay and `preload="none"`. Programme `afterword` appears as an introduction before
the sessions. A `people` block contains `name`, HTTPS `url` and `description`.
The six laboratory session assets map to supplied files 00–05 in order.

All six laboratory meeting previews now use animated WebP (15 fps, up to 640px
wide), shown at up to 360px wide. One red-400 play/pause button beside the programme switches all previews between animation
and a static poster; restarting begins playback again rather than resuming an
exact frame. Reduced motion defaults to the poster with explicit playback opt-in.
WebP has no audio; source MP4 files remain in the supplied Downloads location.

The shared control follows scrolling within the programme and stops at its lower
boundary. Exploration pickers are removed. `booking` blocks group capacity,
labelled prices, payment notes and the registration action. `showCover: false`
hides the page hero; `showIntro: false` hides its summary without deleting metadata.
