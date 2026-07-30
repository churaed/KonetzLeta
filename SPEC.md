# SPEC: GoatCounter analytics + project card slugs

## §G Goal

Track overall site visits + project card modal opens via GoatCounter. Display live per-project view counts in modal eyebrow row using public `/counter/` JSON endpoint. Slugs already in place from `main` base.

## §C Constraints

- GoatCounter subdomain `churaed.goatcounter.com`
- No backend — public `/counter/<path>.json` endpoint (no auth), CORS confirmed working
- Keep "Allow adding visitor counts" enabled in site settings
- Counts cached up to 4 hours → not real-time
- No `no_onload` → auto-tracking page loads + manual modal tracking coexist
- Cookie-free, privacy-friendly
- React + Vite + TypeScript
- Slugs already defined per `PortfolioItem` (from `main`)
- Count in modal eyebrow row (next to status badge + genre)
- Fetch only opened project's count — no preloading
- Count fetch fail → hide badge silently (no error state)
- Count = 0 → displays "0"
- `window.goatcounter` null-guarded + async wait via `setInterval` (max 30 retries @ 100ms = 3s timeout)

## §I Interface

- `index.html` `<head>`: inject `<script data-goatcounter="https://churaed.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
- `src/types/global.d.ts`: add `window.goatcounter` type declarations
- `PortfolioSection.tsx` `useEffect` on `selectedParam`: wait for goatcounter load → `window.goatcounter.count({ path: '/projects/' + slug, title: item.title, event: false })` when modal opens with valid slug
- `useState<{count: string} | null>` for view count, `useEffect` on `selectedItem?.slug` to fetch count
- Modal eyebrow row JSX: if count not null, display `<span>{count} views</span>` between status and subtitle; if fetch fails or loading, show nothing
- Count fetch: `fetch('https://churaed.goatcounter.com/counter/...json')` → `.json()` → extract `count` string
- `useRef` guard: `lastTrackedSlug` prevents duplicate `.count()` calls within mount

## §V Invariants

V1: modal opens & valid slug → `goatcounter.count()` called once per unique slug per mount
V2: `window.goatcounter` absent → no throw, no console error
V3: count fetch fails → badge hidden, no error state
V4: count = 0 → displays "0" (note: counts cached up to 4h)
V5: base script auto-tracks page loads (no `no_onload`)
V6: redirect (numeric → slug) fires both auto-pageview (URL change) and manual `.count()` — acceptable
V7: async wait (`setInterval`) ensures `.count()` not called before script loads
V8: `?project=<id>` → redirect to slug (from main)
V9: `?project=<slug>` → opens directly (from main)
V10: `?project=<nonexistent>` → cleared, no modal (from main)
V11: async wait for `goatcounter` load → max 3s (30 × 100ms), then stop polling

## §T Tasks

id|status|task|cites
T1|x|slugs + redirect already in place (from main merge)|V8,V9,V10
T2|x|**BLOCKING**: enable "Allow adding visitor counts" in GoatCounter site settings|.
T3|x|inject GoatCounter script in `index.html` `<head>`|I.index
T4|x|add `window.goatcounter` types to `global.d.ts`|I.types
T5|x|add async wait + `goatcounter.count()` in `useEffect`|V1,V2,V6,V7,V11
T6|x|add count fetch + eyebrow row badge display in modal JSX|V3,V4
T7|x|build passes|.
T8|.|verify: GoatCounter dashboard shows modal pageviews|V1
T9|.|verify: view count badge visible in modal eyebrow row|V3,V4
T10|.|verify: adblocker → no errors|V2

## §B Bugs

id|date|cause|fix
