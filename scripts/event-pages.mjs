import { readFileSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';

export function loadEventPages(pages = JSON.parse(readFileSync(new URL('../content/event-pages.json', import.meta.url), 'utf8'))) {
  const eventsSource = readFileSync(new URL('../src/data/events.ts', import.meta.url), 'utf8');
  const slugs = new Set();
  const eventIds = new Set();
  const fail = message => { throw new Error(`Event pages: ${message}`); };
  const nonempty = value => typeof value === 'string' && value.trim().length > 0;
  const validateAsset = (src, slug) => {
    const root = resolve('public');
    const file = typeof src === 'string' ? resolve(root, src) : root;
    if (!nonempty(src) || !file.startsWith(root + sep) || !existsSync(file)) fail(`media needs existing public-relative src: ${slug}`);
  };
  if (!Array.isArray(pages)) fail('expected an array');
  for (const page of pages) {
    if (!nonempty(page.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug) || page.slug === 'archive') fail(`invalid or reserved slug: ${page.slug}`);
    if (slugs.has(page.slug)) fail(`duplicate slug: ${page.slug}`);
    slugs.add(page.slug);
    if (!nonempty(page.eventId) || !eventsSource.includes(`id: '${page.eventId}'`)) fail(`unknown event: ${page.eventId}`);
    if (eventIds.has(page.eventId)) fail(`multiple pages for event: ${page.eventId}`);
    eventIds.add(page.eventId);
    if (!['draft', 'published'].includes(page.status)) fail(`invalid status: ${page.slug}`);
    if (!nonempty(page.title) || !nonempty(page.description) || !nonempty(page.language)) fail(`missing title, description or language: ${page.slug}`);
    if (!Array.isArray(page.blocks) || !page.blocks.length) fail(`missing blocks: ${page.slug}`);
    for (const block of page.blocks) {
      if (!nonempty(block.heading)) fail(`block needs a heading: ${page.slug}`);
      if (block.type === 'text') {
        if (!Array.isArray(block.paragraphs) || !block.paragraphs.length || !block.paragraphs.every(nonempty)) fail(`invalid text: ${page.slug}`);
      } else if (block.type === 'booking') {
        if (!nonempty(block.capacity) || !nonempty(block.note) || !Array.isArray(block.prices) || !block.prices.length || !block.prices.every(price => nonempty(price.label) && nonempty(price.value))) fail(`invalid booking block: ${page.slug}`);
      } else if (block.type === 'facts') {
        if (!Array.isArray(block.items) || !block.items.length || !block.items.every(nonempty)) fail(`invalid facts: ${page.slug}`);
      } else if (block.type === 'programme') {
        if (!Array.isArray(block.items) || !block.items.length || !block.items.every(item => nonempty(item.title) && nonempty(item.description))) fail(`invalid programme: ${page.slug}`);
        for (const item of block.items) {
          if (item.media) {
            if (!['image', 'video'].includes(item.media.type) || !nonempty(item.media.alt)) fail(`invalid programme media: ${page.slug}`);
            validateAsset(item.media.src, page.slug);
            validateAsset(item.media.poster, page.slug);
          }
        }
      } else if (block.type === 'people') {
        if (!Array.isArray(block.items) || !block.items.length || !block.items.every(item => nonempty(item.name) && nonempty(item.description) && /^https:\/\//.test(item.url))) fail(`invalid people block: ${page.slug}`);
      } else if (block.type === 'gallery') {
        if (!Array.isArray(block.images) || !block.images.length) fail(`empty gallery: ${page.slug}`);
        for (const image of block.images) {
          const root = resolve('public');
          const file = resolve(root, image.src || '');
          if (!nonempty(image.alt) || !file.startsWith(root + sep) || !existsSync(file)) fail(`gallery image needs existing public-relative src and alt: ${page.slug}`);
        }
      } else fail(`unknown block type: ${block.type}`);
    }
  }
  return pages;
}
