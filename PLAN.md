# Thomas R. Colin — Personal Website Plan

## Goal

Transform the Astro blog starter into a personal portfolio website for Thomas R. Colin, PhD.
Target audiences: software recruiters, outdoors enthusiasts, friends.
Two main themes: professional life (software/builder identity) and outdoors adventures.

---

## Site Architecture

### Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — visual landing page, quick navigation to all sections |
| `/about` | Bio, contact info, social links |
| `/cv` | Résumé + publications section |
| `/projects` | Projects overview (grid of cards) |
| `/projects/chatbot` | Python chatbot app |
| `/projects/website` | This website |
| `/projects/usar` | USAR robot user modeling (academic) |
| `/projects/creativity` | Artificial creativity with RL (academic) |
| `/projects/rsa` | Representational similarity analysis (academic) |
| `/projects/qbert` | Q*bert deep RL agent (academic) |
| `/outdoors` | Outdoors hub: mountaineering, hiking, cycling, packrafting |
| `/outdoors/climbing` | Mountaineering CV: featured routes + full route table |
| `/adventures` | List of all adventure stories |
| `/adventures/patagonia-2024` | Adventure page |
| `/adventures/dent-du-geant-2024` | Adventure page |
| `/adventures/norway-2025` | Adventure page |
| `/adventures/atlantic-2025` | Adventure page |
| `/adventures/patagonia-2025` | Adventure page |
| `/adventures/amazon-2025` | Adventure page |
| `/adventures/calanques-2026` | Adventure page |

### Navigation Bar (top-level only)
`Home · Projects · Outdoors · CV · About`

Adventures are not in the nav — they're content reachable from the Outdoors hub and the Home page.
Publications are not in the nav — they live as a section inside `/cv`.

---

## Content Collections (Astro)

Astro "content collections" are folders of markdown files that Astro turns into pages automatically.
We'll use two:

### `src/content/adventures/`
Each file = one adventure page. Frontmatter fields:
- `title` (string)
- `date` (date)
- `location` (string, e.g. "Patagonia, Chile")
- `heroImage` (image — the big banner photo)
- `summary` (string — one sentence shown on the list page)
- `tags` (array, e.g. ["mountaineering", "expedition"])

### `src/content/projects/`
Each file = one project page. Frontmatter fields:
- `title` (string)
- `summary` (string — shown on the projects overview grid)
- `tags` (array, e.g. ["python", "AI", "academic"])
- `status` (string — "active" | "complete" | "academic")
- `order` (number — controls display order on the grid)

---

## Visual Design

### Palette
Nature/mountain tones. Minimal. No bright colors.

| Role | Color |
|------|-------|
| Background | `#f8f7f4` (warm off-white) |
| Text (primary) | `#1a1a1a` (near-black) |
| Text (secondary) | `#5a5a5a` (mid-grey) |
| Accent | `#3d5a6e` (slate blue — mountains/water) |
| Accent hover | `#2a3f4f` (darker slate) |
| Surface (cards) | `#ffffff` |
| Border | `#ddd8d0` (warm grey) |

### Typography
Keep the existing Atkinson font (clean, readable). May add a second display font for headings later.

### Layout
- Max content width: 900px (slightly wider than the template's 720px, to give breathing room)
- Full-bleed hero images on adventure pages
- Generous whitespace throughout

---

## Image Organization Plan

**Current state:** All photos are in `src/assets/` with camera-generated filenames.

**Approach:** For the initial build, photos are assigned randomly — the goal is to get the layout and visual design right, not to have correct photo-to-content matching. Proper sorting (hundreds of photos across adventures/routes) is a later task once the look is finalized.

**File size:** Photos are currently ~8MB each. Astro's Sharp integration will optimize them automatically on build (no manual work needed). For the dev server, large files are fine.

---

## Build Order (Phases)

### Scope note
Initial build is intentionally minimal — one representative page per section, enough to validate the look and feel. Content will be expanded once the design is approved.

**In scope for initial build:**
- About page
- CV page
- Outdoors hub + Climbing page
- One project page (chatbot, as the flagship)
- One adventure page (Patagonia 2024)

**Out of scope until design is approved:**
- Remaining 5 project pages
- Remaining 6 adventure pages
- Adventures list page (stub only)
- Projects overview grid (stub only)

### Phase 1 — Foundation
- [ ] Update site constants: title, description, author name
- [ ] Update `astro.config.mjs`: site URL, remove blog references
- [ ] Rework global CSS: new color palette, wider max-width
- [ ] Rework Header: new nav links (`Home · Projects · Outdoors · CV · About`)
- [ ] Rework Footer: name, social links
- [ ] Remove placeholder blog content and sample posts

### Phase 2 — Content Collections
- [ ] Set up `adventures` content collection with schema
- [ ] Set up `projects` content collection with schema
- [ ] Create placeholder markdown for Patagonia 2024 adventure
- [ ] Create placeholder markdown for chatbot project

### Phase 3 — Core Pages
- [ ] Home page: hero section + navigation cards
- [ ] About page: bio + contacts
- [ ] CV page: résumé layout + publications section

### Phase 4 — Outdoors
- [ ] Outdoors hub page
- [ ] Climbing page: featured routes grid + route table
- [ ] Adventure page template (hero image + story) — wired to Patagonia 2024

### Phase 5 — Projects
- [ ] Projects overview page (stub/grid)
- [ ] Project page template — wired to chatbot project

### Phase 6 — Polish & Review
- [ ] Responsive design checks (mobile)
- [ ] SEO: real title/description per page
- [ ] Review session with Thomas — design approval before expanding content

### Phase 7 — Content Expansion (after approval)
- [ ] Remaining 5 project pages
- [ ] Remaining 6 adventure pages
- [ ] Photo sorting and organization
- [ ] Favicon update
- [ ] Hosting setup (separate discussion)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/consts.ts` | Site title, description |
| `astro.config.mjs` | Site URL, integrations |
| `src/styles/global.css` | All global styles |
| `src/components/Header.astro` | Top navigation bar |
| `src/components/Footer.astro` | Footer |
| `src/components/BaseHead.astro` | SEO meta tags (don't touch often) |
| `src/content.config.ts` | Content collection schemas |
| `src/pages/` | One file = one route |
| `src/content/` | Markdown content files |
| `src/assets/` | Images (Astro-optimized) |

---

## Decisions Log

- Blog dropped entirely (may add later)
- Publications under `/cv`, not top-level nav — transitioning away from academic identity
- Adventures not in nav — they're content, not a section
- Mountaineering page: featured routes (cards + photos) at top, full route table below
- `/outdoors` is a hub covering mountaineering, hiking, cycling, packrafting
- No domain name picked yet — `astro.config.mjs` will use `https://thomasrcolin.com` as placeholder
- No CSS framework (keeping vanilla CSS, same as template)
