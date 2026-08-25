# AGENTS.md — Calor & Frío Industrial

## Project Overview

Corporate marketing site for Calor & Frío Industrial, a Chilean HVAC and industrial refrigeration
company. Built with TanStack Start (React + Vite + SSR) and deployed on Netlify.

**Seven pages, not one.** Each competes for its own search and speaks to one buyer. A plant
maintenance chief and someone wanting their home split cleaned are different sales, with different
prices and different language — the site routes them apart from the home page's segment selector.

`/sector-publico` exists to be cited inside a bid: it carries the company's legal and technical
record for public-tender evaluation committees (Mercado Público / ChileCompra).

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
  marca.png, marca-clara.png   # Logo mark alone (light/dark surfaces)
  og-image.jpg                 # 1200x630 social card
  logo.png, favicon.ico, robots.txt, sitemap.xml
  __forms.html                 # Netlify Forms declaration (see "Contact form")
src/
  routes/
    __root.tsx                 # HTML shell, meta defaults, JSON-LD, header/footer, 404
    index.tsx                  # /
    servicios.mantenimiento.tsx    # /servicios/mantenimiento
    servicios.asesorias.tsx        # /servicios/asesorias
    servicios.capacitaciones.tsx   # /servicios/capacitaciones
    sector-publico.tsx             # /sector-publico
    empresa.tsx                    # /empresa
    contacto.tsx                   # /contacto
  components/
    SiteHeader.tsx, SiteFooter.tsx
    ui.tsx                     # Seccion, RotuloSeccion, HeroPagina, FranjaDatos, CierreCTA
    PaginaServicio.tsx         # Shared template behind the three service routes
    GalleryCarousel.tsx, ContactForm.tsx, icons.tsx
  lib/
    company.ts                 # Single source of truth for corporate data + JSON-LD builder
    servicios.ts               # Content of the three service lines
    credenciales.ts            # Credentials, operational capacity, methodology, segments
    images.ts                  # Maps src/assets/images/** into the galleries
  assets/hero/                 # Responsive hero images (1280 / 760 for srcset)
  styles.css                   # Design tokens and every component style
```

The three service routes are thin: they set their own `head` and render `PaginaServicio` with data
from `lib/servicios.ts`. Add a service by adding an entry there plus a four-line route file.

## Key Decisions

- **Content lives in `lib/`, not in JSX.** Service scope, credentials and segments are data; routes
  render them. Copy edits happen in one file, not scattered across markup.
- **`src/lib/company.ts` is the single source of truth.** Every contact detail, RUT, address and
  legal fact is declared there and consumed from the views — never hardcoded in JSX. It must stay in
  sync with `Documentos/Mercado Público/01 - Ficha de Proveedor (datos maestros).md`. Three
  conflicting sets of contact details were circulating before this file existed.
- **CSS custom properties over Tailwind tokens, and classes over inline styles.** Every token lives
  in `:root` in `styles.css`; components carry class names, not `style={{}}` objects.
- **Two alternating surfaces**: dark (`--ink-900`) for hero, proof and closing CTA; light
  (`--paper`) for long-form content, which is where reading actually happens.
- **The accent is deliberately double, taken from the logo**: steel blue (`--steel`) for structure
  and links, ember (`--ember`) for action. Cold and hot doing a job, not decorating.
- **Typography is IBM Plex Sans + IBM Plex Mono.** Mono carries eyebrows, figures and field labels
  so data reads as data. The previous Cormorant Garamond was retired on purpose: a high-contrast
  didone reads as a perfume house, which contradicts the trade.
- **The logo mark is kept, the serif wordmark is not.** Header and footer use `marca-clara.png` (the
  circle alone) — the full `logo.png` is 1024x1024 and was being displayed at 34px.
- **No external icon library**: SVG icons are inlined in `components/icons.tsx`.
- **Carousel images**: files in `src/assets/images/{asesorias,capacitaciones,servicios}/`, picked up
  by `import.meta.glob` in `src/lib/images.ts` — dropping a file in the folder is enough.

## Content rules — read before editing copy

- **Never name third-party clients on the site.** The technical director's professional history
  predates the company; publishing those names here implies they are contracts of the SpA, which is
  penalised in a tender evaluation. Sectors and certifications only. Client names belong in the CV
  attached to a bid's technical annex.
- **Never publish a credential as current before it is.** The ChileProveedores row in the
  record is commented out in `routes/sector-publico.tsx` for exactly this reason. Declaring something
  as in force when it is not is grounds for exclusion from a tender.
- Facts on the site must be traceable to a document in the company folder (tax record, CV,
  certificates, inventory).

## Contact form

Netlify detects forms by scanning **static** HTML at build time. This page is server-rendered, so
the React form never appears in that scan. The declaration therefore lives in `public/__forms.html`
and `ContactForm.tsx` POSTs to it — the documented Netlify pattern for SSR frameworks.

**Fields must match in both files.** A field present in the React form but missing from
`__forms.html` is silently dropped on submit.

## Color Palette

Full set in `:root` in `styles.css`. The ones that carry meaning:

| Token       | Value     | Usage                                  |
|-------------|-----------|----------------------------------------|
| `--ink-900` | `#0f1216` | Dark surface: hero, proof, closing CTA |
| `--ink-850` | `#12161c` | Elevated dark: data strip, cards, footer |
| `--paper`   | `#f7f6f3` | Light surface: long-form content       |
| `--tinte`   | `#edf0f4` | Alternating light band                 |
| `--steel`   | `#4f73a8` | Brand blue — structure, links, icons   |
| `--ember`   | `#c2560f` | Action — primary CTAs, active nav      |
| `--texto`   | `#14181f` | Body text on light                     |
| `--fog-300` | `#a4aebd` | Body text on dark                      |

Steel is never a call to action and ember is never structure. Keeping that split is what makes the
warm/cool duality read as a system rather than as two random colors.

## Gotchas

- **Do not animate `max-height` for reveals.** A previous `carouselSlideIn` went from `0` to `600px`
  with `animation-fill-mode: both`, so the cap stuck permanently and clipped the service panel on
  narrow screens. Animate opacity and transform instead.
- **Declare `canonical` per page, never in `__root.tsx`.** A canonical on the root route is
  inherited by every route and points them all at the home page.
- **`netlify.toml` headers do not reach the HTML response.** They apply to static CDN assets only;
  the document is served by the SSR function and bypasses them — verified against production. That
  is why `netlify/edge-functions/security-headers.ts` exists: an edge function runs ahead of the
  origin and can set headers on every response, SSR included. It is the authority; the `netlify.toml`
  block stays as a floor in case the edge function fails to deploy.
- **The CSP is skipped on localhost** — Vite's dev server needs WebSocket and module behaviour the
  production policy blocks. Every other security header applies in both environments, so they can be
  checked in development.
- **The first `npm run dev` after cloning downloads Deno** (the edge-function emulator) and can fail
  once while it does. Re-run it; the second start works.
- **Keep this repo out of OneDrive.** It lives at `D:\GitHub\caloryfrioindustrial`, alongside the
  other repositories. It used to sit inside the OneDrive-synced company folder, where OneDrive was
  syncing all ~28.000 files of `node_modules` one by one: a cold `npm run dev` took 128 s, and
  OneDrive held a lock on the directory that made it impossible to move until `node_modules` was
  deleted. Outside OneDrive the same start takes ~7 s.

## Contact Links

Authoritative values live in `src/lib/company.ts`. Do not copy them into components.
