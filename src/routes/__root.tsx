import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

const SITE_URL = 'https://caloryfrioindustrial.cl'
const OG_IMAGE = `${SITE_URL}/logo.png`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Calor & Frío Industrial — Soluciones Térmicas Integrales' },
      { name: 'description', content: 'Asesorías, capacitaciones y servicios de ingeniería térmica industrial en Chile.' },
      { name: 'theme-color', content: '#4f73a8' },
      { property: 'og:title', content: 'Calor & Frío Industrial — Soluciones Térmicas Integrales' },
      { property: 'og:description', content: 'Asesorías, capacitaciones y servicios de ingeniería térmica industrial en Chile.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:locale', content: 'es_CL' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Calor & Frío Industrial — Soluciones Térmicas Integrales' },
      { name: 'twitter:description', content: 'Asesorías, capacitaciones y servicios de ingeniería térmica industrial en Chile.' },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    links: [
      { rel: 'canonical', href: SITE_URL },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
