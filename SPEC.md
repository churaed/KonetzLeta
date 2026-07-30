# SPEC: Project card slugs + analytics

## §G Goal

Replace numeric project IDs with descriptive English slugs in URL params. Redirect old numeric links. Track project card modal opens with privacy-friendly analytics.

## §C Constraints

- React + Vite + TypeScript
- Modal state: URL search param `project` (`useSearchParams`)
- Slug as URL-facing identifier (lowercase-hyphenated-English); `id` stays internal key
- Slugs hardcoded per `PortfolioItem` — unique, immutable
- Old `?project=<id>` → `replaceState` redirect to `?project=<slug>`, no history entry
- Nonexistent numeric ID → clear params silently
- Analytics decoupled from slug logic via git branches:
  - `main` — slugs + redirect, no analytics
  - `umami` — Umami Cloud (`cloud.umami.is`), website ID `f59baafb-325b-4e15-abb4-ec57fa64f28c`
  - `goatcounter` — placeholder, no implementation yet

## §I Interface

- `PortfolioItem` interface: `slug: string` field
- `PortfolioSection.tsx`: `selectedParam` (was `selectedId`) as `string | null` — receives slug or numeric ID for redirect
- Redirect: if param is numeric → `portfolioItems.find(p => p.id === Number(param))` → if found, `setSearchParams({ project: item.slug }, { replace: true })`; if not found, clear params
- Modal open via slug: `portfolioItems.find(p => p.slug === param)` then render
- Navigation arrows (prev/next): use slugs instead of ids
- `#portfolio-item-{id}` DOM anchors unchanged (internal only)

**Analytics injection point** (umami branch):
- `index.html` `<head>`: `<script defer src="https://cloud.umami.is/script.js" data-website-id="f59baafb-325b-4e15-abb4-ec57fa64f28c"></script>`
- `src/types/global.d.ts`: `window.umami` type declaration
- `PortfolioSection.tsx` `useEffect`: `lastTrackedSlug` ref + `window.umami.track({ website, url, title })` on slug change; null-guard for adblocker

## §V Invariants

V1: `?project=<id>` (numeric) → `replaceState` redirect to `?project=<slug>`
V2: `?project=<slug>` → opens directly, no redirect
V3: `?project=<nonexistent>` → no modal, no error, URL cleared
V4: all 13 portfolio items → unique slug each

**Analytics invariants** (umami branch):
V5: modal opens → `window.umami.track()` called once per unique slug
V6: `window.umami` absent → no throw, no console error
V7: modal close then reopen same project → new track event
V8: browser back/forward → no duplicate track for same slug within mount
V9: `window.umami.track()` payload → must include `website` field

## §T Tasks

### Main branch

id|status|task|cites
T1|x|add `slug: string` field to `PortfolioItem` interface + all 13 items|V4
T2|x|rename `selectedId` → `selectedParam`, find by slug, update nav arrows|V2
T3|x|add numeric → slug redirect logic in `useEffect`|V1,V3
T4|.|verify: `?project=130` redirects to `?project=houyhnhnms-and-us`|V1
T5|.|verify: invalid slug → no modal, no error|V3
T6|.|verify: all 13 projects openable by slug|V2,V4

### Umami branch

id|status|task|cites
U1|x|inject Umami script tag in `index.html` `<head>`, add `window.umami` types|I
U2|x|add `lastTrackedSlug` ref + `window.umami.track()` in `useEffect`|V5,V6,V7,V8,V9
U3|x|build passes|V5

### GoatCounter branch

id|status|task|cites
G1|.|placeholder — no implementation yet|.

## §B Bugs

id|date|cause|fix
B1|2026-07-30|`track()` payload missing `website` → API 400 "Missing website ID"|V9
