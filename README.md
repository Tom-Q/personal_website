# thomascolin.com

Personal website of Thomas R. Colin — software developer, robotics researcher, mountaineer.

Built with [Astro](https://astro.build). Deployed at [thomascolin.com](https://thomascolin.com).

## Structure

```
src/
  content/
    adventures/   # Adventure trip reports (Markdown)
    projects/     # Project pages (Markdown)
  pages/          # Site pages (Astro)
  layouts/        # Page and adventure layouts
  components/     # Shared components (Header, Footer, Gallery, …)
  styles/         # Global CSS and themes
public/
  adventures/     # Converted gallery images (WebP, do not edit manually)
scripts/
  convert-images.mjs  # Image pipeline for gallery photos
raw_photos/       # Gitignored — original photos before conversion
```

## Development

```sh
npm install
npm run dev       # Local dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
```

## Adding an adventure gallery

1. Drop originals into `raw_photos/<folder>/`
2. Run the conversion script:
   ```sh
   node scripts/convert-images.mjs <folder> <adventure-slug>
   ```
3. Add the output `gallery:` list to the adventure's frontmatter.

## Content collections

- **Adventures** — `src/content/adventures/*.md` — fields: `title`, `date`, `location`, `heroImage`, `summary`, `tags`, `gallery`
- **Projects** — `src/content/projects/*.md` — fields: `title`, `summary`, `tags`, `status`, `order`, `heroImage`
