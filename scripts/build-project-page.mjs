// GitHub Pages needs an HTML entry for each directly accessible route.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const indexHtml = await readFile('dist/index.html', 'utf8');
await mkdir('dist/privacy', { recursive: true });
await writeFile('dist/privacy/index.html', indexHtml);

const destination = 'dist/projects/houyhnhnms-and-us';
await mkdir(destination, { recursive: true });
const html = indexHtml.replace(
  'data-goatcounter="',
  `data-goatcounter-settings='{"no_onload":true}' data-goatcounter="`,
);
// The film component records its own view, so skip GoatCounter's automatic onload count.
await writeFile(`${destination}/index.html`, html);
