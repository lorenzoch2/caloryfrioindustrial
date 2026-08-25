import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import { buildStructuredData, company } from '../lib/company'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

const SITE_URL = company.sitio.url
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const TITULO = 'Calor & Frío Industrial — Climatización y Refrigeración Industrial en Santiago'
const DESCRIPCION =
  'Empresa de ingeniería en climatización, refrigeración industrial y ventilación en Santiago. Mantención, asesorías e ITO y capacitación técnica para clientes industriales, comerciales y públicos.'

const structuredData = JSON.stringify(buildStructuredData())

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITULO },
      { name: 'description', content: DESCRIPCION },
      { name: 'theme-color', content: '#0f1216' },
      { name: 'author', content: company.razonSocial },
      { name: 'geo.region', content: 'CL-RM' },
      { name: 'geo.placename', content: company.domicilio.comuna },
      { property: 'og:site_name', content: company.nombreFantasia },
      { property: 'og:title', content: TITULO },
      { property: 'og:description', content: DESCRIPCION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'es_CL' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITULO },
      { name: 'twitter:description', content: DESCRIPCION },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/marca.svg' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: PaginaNoEncontrada,
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

function RootLayout() {
  return (
    <>
      <a href="#contenido" className="saltar-a-contenido">Saltar al contenido</a>
      <SiteHeader />
      <main id="contenido">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

function PaginaNoEncontrada() {
  return (
    <div className="hero-pagina">
      <div className="contenedor">
        <p className="eyebrow eyebrow--acento">Error 404</p>
        <h1 className="hero-pagina-titulo">Esta página no existe</h1>
        <p className="hero-pagina-bajada">
          Puede que el enlace esté antiguo o mal escrito. Desde el inicio se llega a todo el sitio.
        </p>
        <div className="hero-acciones">
          <Link to="/" className="btn btn-acento btn-lg">Ir al inicio</Link>
          <Link to="/contacto" className="btn btn-linea btn-lg">Contacto</Link>
        </div>
      </div>
    </div>
  )
}
