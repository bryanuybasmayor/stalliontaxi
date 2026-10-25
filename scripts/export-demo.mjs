/**
 * Makes the build portable and publishes it to the repository root.
 *
 * Astro emits absolute URLs (`/_astro/...`). Those only resolve when the site is
 * served from a domain root, so opening `dist/index.html` from disk shows an
 * unstyled page, and a GitHub Pages project site at `/<repo>/` cannot find the
 * assets. Both are rewritten to relative URLs here, which work at any path.
 *
 * The rewritten build is then copied to the repo root so GitHub Pages (branch
 * `/` or `/docs`) can serve it with no build step.
 *
 * Run `npm run build` (which calls this) or `npm run demo` to refresh.
 */
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const distIndex = path.join(dist, 'index.html');

if (!existsSync(distIndex)) {
  console.error('dist/index.html not found — run `astro build` first.');
  process.exit(1);
}

const distAssets = path.join(dist, '_astro');

const toRelative = (text) =>
  text
    .replaceAll('"/_astro/', '"./_astro/')
    .replaceAll(", /_astro/", ', ./_astro/')
    .replaceAll('href="/', 'href="./')
    .replaceAll('src="/', 'src="./')
    .replaceAll('url(/_astro/', 'url(./');

// 1. Make the built page (and its stylesheet) work from any location.
let html = toRelative(await readFile(distIndex, 'utf8'));

// Browsers refuse to load module *files* over file://, so inline the one script.
const scriptTag = /<script type="module" src="\.\/_astro\/([^"]+\.js)"><\/script>/;
const scriptMatch = html.match(scriptTag);
let inlinedScript = null;
if (scriptMatch) {
  const js = await readFile(path.join(distAssets, scriptMatch[1]), 'utf8');
  if (!js.includes('</script')) {
    html = html.replace(scriptMatch[0], `<script type="module">${js}</script>`);
    inlinedScript = scriptMatch[1];
  }
}

await writeFile(distIndex, html);
if (inlinedScript) await rm(path.join(distAssets, inlinedScript), { force: true });

for (const file of await readdir(distAssets)) {
  if (!file.endsWith('.css')) continue;
  const filePath = path.join(distAssets, file);
  await writeFile(filePath, toRelative(await readFile(filePath, 'utf8')));
}

// 2. Publish a copy at the repo root for GitHub Pages.
const keep = new Set(['src', 'node_modules', 'public', 'scripts', 'dist', '.git', 'img']);
const copied = [];

await cp(distIndex, path.join(root, 'index.html'));

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === 'index.html' || entry.name.startsWith('.')) continue;
  const dest = path.join(root, entry.name);
  if (!keep.has(entry.name)) await rm(dest, { recursive: true, force: true });
  await cp(path.join(dist, entry.name), dest, { recursive: true });
  copied.push(entry.name);
}

// 3. Remove assets a previous export left behind.
const manifestPath = path.join(root, '.demo-manifest.json');
const previous = new Set(['_astro']);
if (existsSync(manifestPath)) {
  for (const name of JSON.parse(await readFile(manifestPath, 'utf8'))) previous.add(name);
}
for (const name of previous) {
  if (!copied.includes(name)) await rm(path.join(root, name), { recursive: true, force: true });
}

// GitHub Pages runs Jekyll by default, which drops folders starting with "_".
await writeFile(path.join(root, '.nojekyll'), '');
await writeFile(manifestPath, JSON.stringify([...new Set([...previous, ...copied])].sort(), null, 2) + '\n');

console.log(
  `Relative URLs applied to dist/index.html; demo exported to ./index.html (${copied.length} assets).`,
);
