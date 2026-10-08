// GitHub Pages serves clean project links without requiring an SPA rewrite.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const destination = 'dist/projects/houyhnhnms-and-us';
await mkdir(destination, { recursive: true });
const html = (await readFile('dist/index.html', 'utf8')).replace(
  'data-goatcounter="',
  `data-goatcounter-settings='{"no_onload":true}' data-goatcounter="`,
);
// The film component records its own view, so skip GoatCounter's automatic onload count.
await writeFile(`${destination}/index.html`, html);
