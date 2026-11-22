// GitHub Pages needs an HTML entry for each directly accessible route.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { loadEventPages } from './event-pages.mjs';

// Motion and styled-jsx need inline styles. Scripts are restricted to the
// application bundle and the integrity-pinned GoatCounter script.
const policy = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' https://gc.zgo.at/count.v5.js",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://churaed.goatcounter.com/count",
  "connect-src 'self' https://churaed.goatcounter.com",
  "frame-src https://www.youtube.com https://player.vimeo.com https://drive.google.com",
].join('; ');

const indexPath = 'dist/index.html';
const builtHtml = await readFile(indexPath, 'utf8');
const charset = '<meta charset="UTF-8" />';
const generatedPolicy = /<meta charset="UTF-8" \/>(?:\n    <meta http-equiv="Content-Security-Policy" content="[^"]*">)?/;
if (!generatedPolicy.test(builtHtml)) {
  throw new Error('Unable to insert the Content Security Policy after the charset declaration.');
}
const goatCounterAttribute = 'data-goatcounter="';
if (!builtHtml.includes(goatCounterAttribute)) {
  throw new Error('Unable to disable the automatic GoatCounter count on the film page.');
}
const indexHtml = builtHtml.replace(
  generatedPolicy,
  `${charset}\n    <meta http-equiv="Content-Security-Policy" content="${policy}">`,
);
await writeFile(indexPath, indexHtml);
const eventRoutes = loadEventPages()
  .filter(page => page.status === 'published')
  .map(page => ({ path: `events/${page.slug}`, language: Intl.getCanonicalLocales(page.language)[0] }));
const routes = [
  { path: 'privacy' },
  { path: 'manifest' },
  { path: 'events/archive' },
  ...eventRoutes,
];
for (const { path, language } of routes) {
  const routeHtml = language ? indexHtml.replace('<html lang="en">', `<html lang="${language}">`) : indexHtml;
  await mkdir(`dist/${path}`, { recursive: true });
  await writeFile(`dist/${path}/index.html`, routeHtml);
}

const destination = 'dist/projects/houyhnhnms-and-us';
await mkdir(destination, { recursive: true });
const html = indexHtml.replace(
  goatCounterAttribute,
  `data-goatcounter-settings='{"no_onload":true}' data-goatcounter="`,
);
// The film component records its own view, so skip GoatCounter's automatic onload count.
await writeFile(`${destination}/index.html`, html);
