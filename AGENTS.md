# AGENTS.md — Calor & Frío Industrial

## Project Overview

Corporate marketing site for Calor & Frío Industrial, a Chilean HVAC, refrigeration and ventilation
company. Built with TanStack Start (React + Vite + SSR) and deployed on Netlify.

**Six pages, not one.** Each competes for its own search and speaks to one buyer. A plant
maintenance chief and someone wanting their home split cleaned are different sales, with different
prices and different language — the site routes them apart from the home page's segment selector.

The partners dropped the public-procurement line in October 2026. `/sector-publico` was deleted
and `netlify.toml` redirects it to the home page with a 301. Do not reintroduce tender copy.

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
    contenido.ts               # Reasons, methodology, equipment, FAQ and buyer segments
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
  sync with the company folder's
  `_Fuentes/01 Legal y Societario/Identificación/Ficha de datos maestros de la empresa.md`. Three
  conflicting sets of contact details were circulating before this file existed.
- **CSS custom properties over Tailwind tokens, and classes over inline styles.** Every token lives
  in `:root` in `styles.css`; components carry class names, not `style={{}}` objects.
- **The site is light. There are no dark zones in the default theme.** Three light surfaces
  alternate to give the page rhythm: `--paper` (reading base), `--tinte` (alternating band) and
  `--banda` (strong band — hero, figures, closing CTA). "Strong band" no longer means dark: it is a
  steel tint, and the text on it stays graphite.
- **The dark theme follows the visitor's system preference** (changed 2026-11-06; until then it was
  opt-in only and `prefers-color-scheme` was deliberately ignored). Precedence is: a stored choice
  from the selector wins; with no stored choice the OS preference decides; if `localStorage` throws,
  the OS preference decides anyway. The first click on the selector pins a preference and the system
  stops deciding. While nothing is pinned, the site also follows a system change made with the page
  open. `scriptTema` in `__root.tsx` applies this before first paint; the same tokens are redefined
  per theme, so only the absolute values change.
- **`color-scheme` is declared on `:root` for both themes.** Without it the native controls — the
  contact form's `<select>`, scrollbars, autofill — stayed light on the dark page.
- **Token names describe role, not colour.** `--banda` / `--sobre-banda` rather than `--ink-900` /
  `--fog-100` — the old names became lies the moment the band turned light.
- **The accent is deliberately double, taken from the logo**: steel blue (`--steel`) for structure
  and links, brass (`--laton`) for action. Cold and hot doing a job, not decorating.
- **Brass buttons carry graphite text, never white.** White on `--laton` measures 3.6:1 and fails
  the contrast minimum; graphite on brass measures 4.95:1. Brass as *text* only works on dark
  grounds — on light ones use `--laton-dk` (`#8a6730`, 4.8:1).
  The text colour is `--sobre-laton`, which is graphite in **both** themes and is deliberately not
  redefined in the dark block: the brass behind it does not change, so neither should the text on
  top. `.btn-acento` used to take `--banda`, which does flip with the theme — correct by accident in
  dark, and 2.88:1 in light, on the main call to action of every page.
- **Typography is IBM Plex Sans + IBM Plex Mono.** Mono carries eyebrows, figures and field labels
  so data reads as data. The previous Cormorant Garamond was retired on purpose: a high-contrast
  didone reads as a perfume house, which contradicts the trade.
- **The brand is the *celosía*** — the angled blades of a damper or diffuser — adopted 2026-08-25,
  replacing the S-split circle. Every asset is SVG with **text converted to outlines**, so nothing
  depends on a font being available. Source of truth is the company folder,
  `07 Marca y Marketing/Identidad/Vectores/`; `public/` holds copies. The rules live in
  `_Fuentes/07 Marca y Marketing/Identidad/LÉEME - Manual de marca.md` — read it before touching
  brand assets.
- **Use the lockups, do not retype the name.** The header and footer render
  `lockup-horizontal.svg` and the home hero renders `lockup-vertical.svg`. Setting "Calor & Frío
  Industrial" as live text next to the symbol would drift from the trademarked artwork.
- **Company-folder documents are written in markdown and read as PDF.** The source lives at
  `_Fuentes/<same path>.md`; the PDF that gets opened sits at the same path without `_Fuentes`.
  Edit the markdown and recompose with `_Herramientas/Componer documentos/componer-documentos.py`
  — a loose `.md` dropped in the directory falls outside that routine.
- `public/logo.png` is the **previous** logo, kept only as history. Nothing references it.
- **No external icon library**: SVG icons are inlined in `components/icons.tsx`.
- **Carousel images**: files in `src/assets/images/{asesorias,capacitaciones,servicios}/`, picked up
  by `import.meta.glob` in `src/lib/images.ts` — dropping a file in the folder is enough.

## Motion

Timing lives in three tokens on `:root` — `--ease-aterriza`, `--dur-corta`,
`--dur-media`, `--dur-larga`. **Change the feel there, not in individual rules.** The curve is an
exponential ease-out: it enters with speed and settles without bounce.

Reveals are per-element: each block owns its `IntersectionObserver` through `useRevelar`. Do **not**
go back to one observer that queries the DOM on route change — TanStack updates the location
*before* rendering the new component, so such an observer finds nothing and every block on the
destination page stays at opacity zero. That bug shipped once.

The hidden state hangs off `html.js`. Without that class the page would render blank if JavaScript
failed: content present in the HTML but invisible.

Everything is disabled under `prefers-reduced-motion`, including the stagger, the counter, the
methodology rule, the parallax and the carousel's auto-advance.

## Content rules — read before editing copy

- **The site speaks as a company, never as people.** No personal names and no CV: no degrees,
  certifications or individual career history. The partners decided in October 2026 that they do
  not want to appear on the site. Experience is stated as the company's («más de treinta años de
  experiencia técnica»), and what sets the service apart are facts about the work itself: visit
  before quoting, measurements in writing, own equipment, informe de cierre.
- **Never name third-party clients on the site.** Those jobs predate the company; publishing the
  names here implies they are contracts of the SpA.
- **Never publish a credential as current before it is.** Declaring something in force when it is
  not costs far more than leaving it out.
- Facts on the site must be traceable to a document in the company folder (tax record, CV,
  certificates, inventory).
- **The trade is «climatización, refrigeración y ventilación» — never «refrigeración industrial».**
  The partners dropped «industrial» from the description of what the company does in September 2026,
  on the site and on the business cards. «Industrial» stays in the company name, in the technical
  director's INACAP title (its official name) and where it names a sector of his experience.

## Contact
 
**`contacto@caloryfrioindustrial.cl` is the company's official address, always** (decided
2026-08-24). It lives in `src/lib/company.ts` and nowhere else in the code. Any `@gmail` address is
wrong — three different combinations of email and phone used to circulate between the site, the
business cards and the quotes.

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
- **`<html>` carries `suppressHydrationWarning`, and it has to stay.** The inline `scriptTema` in
  `__root.tsx` adds `class="js"` and `data-tema` to that element before React hydrates. The server
  cannot render either one — it does not know whether JavaScript is on, nor which theme the visitor
  chose — so React reported an attribute mismatch and, worse, stopped patching that subtree. The
  attribute covers only `<html>` and its direct text, so children are still compared normally.
  Removing it brings the console error back on every page.
- **If `npm run dev` prints the npm banner and then never binds the port**, delete
  `node_modules/.vite` and start again. Seen on 2026-11-06: the process stayed alive, Vite never
  printed its ready line and nothing was listening on 3000; after clearing the cache it started in
  5,8 s. Binding explicitly with `--host 127.0.0.1` also helped, since `localhost` would not resolve
  from the preview pane that session.
- **Keep this repo out of OneDrive.** It lives at `D:\GitHub\caloryfrioindustrial`, alongside the
  other repositories. It used to sit inside the OneDrive-synced company folder, where OneDrive was
  syncing all ~28.000 files of `node_modules` one by one: a cold `npm run dev` took 128 s, and
  OneDrive held a lock on the directory that made it impossible to move until `node_modules` was
  deleted. Outside OneDrive the same start takes ~7 s.

## Contact Links

Authoritative values live in `src/lib/company.ts`. Do not copy them into components.
