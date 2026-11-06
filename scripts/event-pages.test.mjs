import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEventPages } from './event-pages.mjs';
const fixture = () => structuredClone(loadEventPages()[0]);
test('lab is published with its custom slug', () => {
  const page = fixture();
  assert.equal(page.status, 'published');
  assert.equal(page.slug, 'experimental-lab-2026');
});
test('valid published content is accepted', () => {
  const page = fixture(); page.status = 'published';
  assert.equal(loadEventPages([page])[0].status, 'published');
});
test('duplicate and reserved slugs cannot publish', () => {
  const page = fixture();
  assert.throws(() => loadEventPages([page, page]), /duplicate slug/);
  page.slug = 'archive';
  assert.throws(() => loadEventPages([page]), /reserved slug/);
});
test('one page per event language is allowed, duplicates are not', () => {
  const ru = fixture();
  const en = structuredClone(ru);
  en.slug = 'experimental-lab-2026-en';
  en.language = 'en';
  assert.equal(loadEventPages([ru, en]).length, 2);
  const duplicate = structuredClone(en);
  duplicate.slug = 'experimental-lab-2026-en-copy';
  assert.throws(() => loadEventPages([ru, en, duplicate]), /duplicate language for event/);
});
test('unknown events and blocks fail with a recovery clue', () => {
  const page = fixture(); page.eventId = 'missing';
  assert.throws(() => loadEventPages([page]), /unknown event/);
  const other = fixture(); other.blocks[0].type = 'missing';
  assert.throws(() => loadEventPages([other]), /unknown block type/);
});
test('published content requires description', () => {
  const page = fixture(); page.status = 'published'; page.description = '';
  assert.throws(() => loadEventPages([page]), /missing title, description or language/);
});
test('gallery files must exist and have alternative text', () => {
  const page = fixture();
  page.blocks.push({ type: 'gallery', heading: 'Photos', images: [{ src: 'missing.webp', alt: 'Photo' }] });
  assert.throws(() => loadEventPages([page]), /existing public-relative src and alt/);
  page.blocks.at(-1).images = [{ src: 'images/events/experimental-lab-poster.webp', alt: 'Lab cover' }];
  assert.equal(loadEventPages([page]).length, 1);
});
test('programme media requires a real asset and static poster', () => {
  const page = fixture();
  const media = page.blocks.find(block => block.type === 'programme').items[0].media;
  media.poster = 'missing.webp';
  assert.throws(() => loadEventPages([page]), /media needs existing public-relative src/);
});
