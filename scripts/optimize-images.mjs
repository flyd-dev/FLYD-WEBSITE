#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat, access } from 'node:fs/promises';
import { join, extname, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

// Per-directory settings: maxWidth + quality for the WebP output.
// Skipping these categories entirely: /og (no files), favicons (small + need PNG).
const RULES = [
  { dir: 'team',         maxWidth: 800,  quality: 80 },
  { dir: 'team-bg',      maxWidth: 1600, quality: 72 },
  { dir: 'process-bg',   maxWidth: 1600, quality: 72 },
  { dir: 'header',       maxWidth: 1000, quality: 78 },
  { dir: 'partners',     maxWidth: 480,  quality: 85 },
  { dir: 'customer-logo',maxWidth: 480,  quality: 85 },
  { dir: 'brand',        maxWidth: 1200, quality: 85 },
];

const SKIP_FILES = new Set([
  'favicon-32.png', 'favicon-192.png', 'favicon-512.png',
  'favicon.png', 'favicon.svg', 'apple-touch-icon.png',
]);

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    if (name.startsWith('.')) continue;
    const full = join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  let totalIn = 0, totalOut = 0, converted = 0, skipped = 0;

  for (const rule of RULES) {
    const dir = join(PUBLIC, rule.dir);
    if (!(await exists(dir))) { console.log(`· skip (missing): ${rule.dir}`); continue; }

    const files = (await walk(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
    if (!files.length) continue;

    console.log(`\n▸ ${rule.dir}/  (maxW=${rule.maxWidth}, q=${rule.quality})`);

    for (const src of files) {
      const name = basename(src);
      if (SKIP_FILES.has(name)) { skipped++; continue; }
      const dest = src.replace(/\.(jpe?g|png)$/i, '.webp');
      const rel = relative(PUBLIC, src);

      const srcSize = (await stat(src)).size;
      totalIn += srcSize;

      if (dryRun) {
        console.log(`  ${rel}  ${fmt(srcSize)} → (dry-run)`);
        continue;
      }

      try {
        await sharp(src, { failOn: 'none' })
          .rotate() // respect EXIF orientation
          .resize({ width: rule.maxWidth, withoutEnlargement: true })
          .webp({ quality: rule.quality, effort: 5 })
          .toFile(dest);
        const outSize = (await stat(dest)).size;
        totalOut += outSize;
        converted++;
        const pct = ((1 - outSize / srcSize) * 100).toFixed(0);
        console.log(`  ${rel}  ${fmt(srcSize)} → ${fmt(outSize)}  (-${pct}%)`);
      } catch (err) {
        console.error(`  ✗ ${rel}: ${err.message}`);
      }
    }
  }

  console.log(`\n── Summary ──`);
  console.log(`converted: ${converted}, skipped: ${skipped}`);
  console.log(`input:  ${fmt(totalIn)}`);
  console.log(`output: ${fmt(totalOut)}  (-${((1 - totalOut / Math.max(1, totalIn)) * 100).toFixed(0)}%)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
