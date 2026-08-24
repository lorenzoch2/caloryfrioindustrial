# AGENTS.md — Calor & Frío Industrial

## Project Overview

Corporate marketing landing page for Calor & Frío Industrial, a Chilean HVAC and industrial
refrigeration company. Built with TanStack Start (React + Vite + SSR) and deployed on Netlify.
Single page, no routing complexity needed.

Beyond marketing, the page now doubles as a **credentials sheet for third-party evaluation** —
industrial clients and public-tender evaluation committees (Mercado Público / ChileCompra) who need
to verify technical competence and legal standing before contracting.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Language | TypeScript |
| Deployment | Netlify |

## Directory Structure

```
public/
  logo.png          # Company logo
  favicon.ico
  robots.txt
  sitemap.xml
  __forms.html      # Netlify Forms declaration (see "Contact form" below)
src/
  routes/
    __root.tsx      # HTML shell: fonts, meta tags, schema.org JSON-LD
    index.tsx       # Entire marketing page
  components/
    GalleryCarousel.tsx
    ContactForm.tsx
  lib/
    company.ts      # Single source of truth for corporate data + JSON-LD builder
    credenciales.ts # Technical credentials, operational capacity
    images.ts       # Maps src/assets/images/** into the galleries
  styles.css        # CSS custom properties, resets, animations, component styles
```

## Key Decisions

- **Route-first page**: the whole page lives in `src/routes/index.tsx`, with UI extracted only where
  it improves clarity.
- **`src/lib/company.ts` is the single source of truth.** Every contact detail, RUT, address and
  legal fact is declared there and consumed from the views — never hardcoded in JSX. It must stay in
  sync with `Documentos/Mercado Público/01 - Ficha de Proveedor (datos maestros).md`. Three
  conflicting sets of contact details were circulating before this file existed.
- **CSS custom properties over Tailwind tokens**: brand colors live in `:root` in `styles.css` and
  are used inline in JSX.
- **Logo rendering**: `mixBlendMode: 'multiply'` against the light background.
- **No external icon library**: SVG icons are inlined as small React components.
- **Carousel images**: files in `src/assets/images/{asesorias,capacitaciones,servicios}/`, picked up
  by `import.meta.glob` in `src/lib/images.ts` — dropping a file in the folder is enough.
- **Fonts**: `Cormorant Garamond` (display) + `Montserrat` (UI/body) via Google Fonts.

## Content rules — read before editing copy

- **Never name third-party clients on the site.** The technical director's professional history
  predates the company; publishing those names here implies they are contracts of the SpA, which is
  penalised in a tender evaluation. Sectors and certifications only. Client names belong in the CV
  attached to a bid's technical annex.
- **Never publish a credential as current before it is.** The ChileProveedores row in the
  credentials sheet is commented out in `index.tsx` for exactly this reason. Declaring something as
  in force when it is not is grounds for exclusion from a tender.
- Facts on the site must be traceable to a document in the company folder (tax record, CV,
  certificates, inventory).

## Contact form

Netlify detects forms by scanning **static** HTML at build time. This page is server-rendered, so
the React form never appears in that scan. The declaration therefore lives in `public/__forms.html`
and `ContactForm.tsx` POSTs to it — the documented Netlify pattern for SSR frameworks.

**Fields must match in both files.** A field present in the React form but missing from
`__forms.html` is silently dropped on submit.

## Color Palette

| Token        | Value      | Usage                      |
|--------------|------------|----------------------------|
| `--ink`      | `#14181f`  | Primary text               |
| `--ink-soft` | `#3b4250`  | Secondary text             |
| `--steel`    | `#4f73a8`  | Primary accent (logo blue) |
| `--steel-lt` | `#6b8fc4`  | Lighter accent             |
| `--steel-dk` | `#3a5880`  | Accent text on light       |
| `--bg`       | `#f6f5f2`  | Page background            |
| `--surface`  | `#ffffff`  | Cards / elevated surfaces  |

## Gotchas

- **Do not animate `max-height` for reveals.** A previous `carouselSlideIn` went from `0` to `600px`
  with `animation-fill-mode: both`, so the cap stuck permanently and clipped the service panel on
  narrow screens (needs 667px at 320px wide). Animate opacity and transform instead.
- **`netlify.toml` headers do not reach the HTML response.** They apply to static CDN assets only;
  the document is served by the SSR function and bypasses them. Verified against production.
- The repo sits inside a OneDrive-synced path, which makes a cold `npm run dev` take ~2 minutes.

## Contact Links

Authoritative values live in `src/lib/company.ts`. Do not copy them into components.
