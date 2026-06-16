# AGENTS.md — Calor & Frío Industrial

## Project Overview

Corporate marketing landing page for Calor & Frío Industrial. Built with TanStack Start (React + Vite + SSR) and deployed on Netlify. Single-page, no routing complexity needed.

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
  logo.png          # Company logo (white-filtered via CSS)
  favicon.ico
src/
  routes/
    __root.tsx      # HTML shell: Google Fonts, lang="es", page title/meta
    index.tsx       # Entire marketing page (hero + services + contact + footer)
  styles.css        # CSS custom properties, resets, animations, utility classes
```

## Key Decisions

- **Route-first page**: The main page lives in `src/routes/index.tsx`, with reusable UI extracted only where it improves clarity.
- **CSS custom properties over Tailwind tokens**: Brand colors (`--steel`, `--ink`, `--cream`) are in `:root` inside `styles.css` and used inline in JSX.
- **Logo rendering**: Logo PNG is rendered with `filter: brightness(0) invert(1)` to produce a white version on the dark background.
- **No external icon library**: SVG icons are inlined as small React components to avoid bundle weight.
- **Carousel images**: Static images live in `public/images/{asesorias,capacitaciones,servicios}/` and are mapped in `src/lib/images.ts`.
- **Fonts**: `Cormorant Garamond` (display) + `Montserrat` (UI/body) via Google Fonts in `__root.tsx`.

## Color Palette

| Token        | Value      | Usage                      |
|--------------|------------|----------------------------|
| `--ink`      | `#14181f`  | Page background            |
| `--ink-soft` | `#2c3240`  | Elevated surfaces          |
| `--steel`    | `#4f73a8`  | Primary accent (logo blue) |
| `--steel-lt` | `#6b8fc4`  | Lighter accent / headlines |
| `--cream`    | `#f4f3f0`  | Body text                  |

## Contact Links

- WhatsApp: `https://wa.me/message/5NJEUAL5M6GTK1`
- Instagram: `https://www.instagram.com/caloryfrioindustrial`
- Email: `contacto@cyfindustrial.com`
