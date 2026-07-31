/**
 * Usage: node scripts/convert-images.mjs <raw-folder> <slug> [base-dir]
 * Example: node scripts/convert-images.mjs patagonia2024 patagonia-2024
 * Example: node scripts/convert-images.mjs "mountaineering 2026" mountaineering-2026 galleries
 *
 * Reads JPG/PNG from raw_photos/<raw-folder>/
 * Writes WebP thumbs (800px) and full-size (2400px) to public/<base-dir>/<slug>/
 * base-dir defaults to "adventures"; use "galleries" for gallery-collection entries.
 * Writes manifest.json with image dimensions (used by the Gallery component).
 * Strips any "<raw-folder>_" prefix from filenames.
 * Outputs the gallery array to paste into frontmatter.
 */

import sharp from 'sharp';
import { readdir, mkdir, rename, writeFile } from 'fs/promises';
import { join, basename, extname } from 'path';

const [rawFolder, slug, baseDir = 'adventures'] = process.argv.slice(2);
if (!rawFolder || !slug) {
	console.error('Usage: node scripts/convert-images.mjs <raw-folder> <slug> [base-dir]');
	process.exit(1);
}

const inputDir = join('raw_photos', rawFolder);
const thumbDir = join('public', baseDir, slug, 'thumb');
const fullDir  = join('public', baseDir, slug, 'full');

await mkdir(thumbDir, { recursive: true });
await mkdir(fullDir,  { recursive: true });

const files = (await readdir(inputDir))
	.filter(f => /\.(jpe?g|png|webp|JPE?G|PNG)$/.test(f))
	.sort();

const manifest = [];

for (const file of files) {
	const stem = basename(file, extname(file))
		.replace(new RegExp(`^${rawFolder}_?`, 'i'), '')
		.toLowerCase();

	const inputPath = join(inputDir, file);

	await sharp(inputPath)
		.rotate()
		.resize({ width: 800, withoutEnlargement: true })
		.webp({ quality: 82 })
		.toFile(join(thumbDir, `${stem}.webp`));

	const { width, height } = await sharp(inputPath)
		.rotate()
		.resize({ width: 2400, withoutEnlargement: true })
		.webp({ quality: 85 })
		.toFile(join(fullDir, `${stem}.webp`));

	manifest.push({ name: stem, w: width, h: height });

	const ext = extname(file);
	const newFilename = `${stem}${ext.toLowerCase()}`;
	if (file !== newFilename) {
		await rename(join(inputDir, file), join(inputDir, newFilename));
	}

	console.log(`  ✓ ${file} → ${stem}.webp (${width}×${height})`);
}

await writeFile(
	join('public', baseDir, slug, 'manifest.json'),
	JSON.stringify(manifest, null, 2)
);

console.log('\nDone. Add this to your frontmatter:\n');
console.log(`gallery:\n${manifest.map(m => `  - ${m.name}`).join('\n')}`);
