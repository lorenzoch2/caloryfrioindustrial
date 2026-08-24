import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import { buildStructuredData, company } from '../lib/company'

const SITE_URL = company.sitio.url
const OG_IMAGE = `${SITE_URL}/logo.png`

const TITLE = 'Calor & Frío Industrial — Climatización y Refrigeración Industrial en Santiago'
const DESCRIPTION =
  'Empresa de ingeniería en climatización, refrigeración industrial y ventilación en Santiago. Asesorías e ITO, capacitaciones técnicas y mantenimiento preventivo y correctivo para clientes industriales, comerciales y públicos.'

const structuredData = JSON.stringify(buildStructuredData())

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#4f73a8' },
      { name: 'author', content: company.razonSocial },
      { name: 'geo.region', content: 'CL-RM' },
      { name: 'geo.placename', content: company.domicilio.comuna },
      { property: 'og:site_name', content: company.nombreFantasia },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:locale', content: 'es_CL' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
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
    <html lang="es-CL">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          // Datos estructurados schema.org: los consume Google, no el runtime.
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
