# Calor & Frío Industrial — Marketing Site

Corporate marketing landing page for **Calor & Frío Industrial**, a Chilean company offering thermal engineering advisory, training, and integral services.

## Technologies

- [TanStack Start](https://tanstack.com/start) (React SSR framework)
- [Tailwind CSS v4](https://tailwindcss.com/) (utility-first CSS)
- [Vite](https://vitejs.dev/) build tooling
- Deployed on [Netlify](https://netlify.com)

## Running Locally

```bash
npm install
npm run dev        # starts at http://localhost:3000
```

Or with the Netlify CLI for full platform emulation:

```bash
netlify dev --port 8889
```

## Notes

- Carousel images live in `src/assets/images/{asesorias,capacitaciones,servicios}/`.
- The carousel is driven by `import.meta.glob`, so adding or removing files updates the gallery automatically.

## Recommended Image Size

- Aspect ratio: `16:9` or `4:3`
- Ideal size: `1600 x 900 px` for horizontal photos, `1200 x 900 px` for more square photos
- Recommended weight: under `300-500 KB`
- Supported formats: `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`, `svg`

- If a service folder has no images, its carousel section is hidden.
