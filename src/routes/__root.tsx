import { useEffect } from 'react'
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import { buildStructuredData, company } from '../lib/company'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { Animaciones } from '../components/Animaciones'

const SITE_URL = company.sitio.url
/*
  El nombre lleva la fecha a propósito. WhatsApp, LinkedIn y X guardan la vista
  previa por URL y no vuelven a pedir la imagen aunque el archivo cambie: si se
  reemplaza `og-image.jpg` en su sitio, los enlaces ya compartidos —y los nuevos—
  siguen mostrando la tarjeta vieja durante semanas. Al cambiar el nombre, la
  vista previa se regenera. Al rediseñarla, poner el mes nuevo — y una letra al
  final si se corrige dentro del mismo mes, como pasó con esta.
*/
const OG_IMAGE = `${SITE_URL}/og-2026-08b.jpg`

const TITULO = 'Climatización y refrigeración en Santiago | Calor & Frío'
const DESCRIPCION =
  'Climatización, refrigeración y ventilación en Santiago. Instalación, mantención, asesorías e ITO y capacitación técnica para industria, comercio y hogar.'

/*
  Al pegar el enlace en WhatsApp el título se corta cerca de los 65 caracteres y
  la descripción cerca de los 120. El título y la descripción de SEO son más largos,
  así que en la vista previa se cortaban a media frase. Estas dos versiones dicen
  lo mismo dentro del espacio que hay.
*/
const TITULO_SOCIAL = `${company.nombreFantasia} — ${company.lema}`
const DESCRIPCION_SOCIAL =
  'Climatización, refrigeración y ventilación con diagnóstico en terreno. Santiago de Chile.'

const structuredData = JSON.stringify(buildStructuredData())

/*
  Fija el tema antes del primer pintado. Si esto corriera dentro de React, la
  página aparecería un instante con el tema equivocado antes de hidratar.

  Orden de precedencia, en tres estados:

    1. Lo que la persona eligió en el selector, guardado en `localStorage`.
    2. Si no eligió nada, la preferencia del sistema operativo.
    3. Si el almacenamiento falla —ventana privada, cookies bloqueadas—, la
       preferencia del sistema igual.

  Hasta noviembre de 2026 el claro era el tema principal y el oscuro sólo se
  aplicaba por elección explícita. Se cambió para seguir la configuración de
  cada visitante.

  También marca `html.js`. De esa clase cuelga el estado oculto de las
  animaciones: sin JavaScript no se aplica y todo se ve, en vez de quedar el
  contenido con opacidad cero.
*/
const scriptTema = `document.documentElement.classList.add('js');(function(){var s=matchMedia('(prefers-color-scheme: dark)').matches?'oscuro':'claro',e=null;try{e=localStorage.getItem('tema')}catch(x){}document.documentElement.dataset.tema=e==='oscuro'||e==='claro'?e:s})()`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITULO },
      { name: 'description', content: DESCRIPCION },
      /*
        Dos `theme-color` con `media`: el color del cromo del navegador —la
        barra de direcciones en móvil— sigue la preferencia del sistema igual
        que la página. Con un solo valor blanco, el tema oscuro quedaba con una
        franja clara arriba.
      */
      { name: 'theme-color', content: '#f8f7f4', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#12161c', media: '(prefers-color-scheme: dark)' },
      { name: 'author', content: company.razonSocial },
      { name: 'geo.region', content: 'CL-RM' },
      { name: 'geo.placename', content: company.domicilio.comuna },
      { property: 'og:site_name', content: company.nombreFantasia },
      { property: 'og:title', content: TITULO_SOCIAL },
      { property: 'og:description', content: DESCRIPCION_SOCIAL },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:alt', content: `${company.nombreFantasia} · ${company.lema}` },
      { property: 'og:locale', content: 'es_CL' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITULO_SOCIAL },
      { name: 'twitter:description', content: DESCRIPCION_SOCIAL },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: `${company.nombreFantasia} · ${company.lema}` },
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
    /*
      `suppressHydrationWarning` va en este elemento porque `scriptTema` lo
      modifica antes de que React hidrate: le agrega `class="js"` y
      `data-tema`. El servidor no puede renderizar ninguno de los dos —no sabe
      si hay JavaScript ni qué tema eligió la persona—, así que la diferencia
      es esperada y no un defecto.

      Sin esto, React avisa del desajuste y **deja de parchar este subárbol**.
      El atributo sólo cubre a este elemento y a su texto directo: los hijos se
      siguen comparando igual que siempre, de modo que no esconde otros
      desajustes.
    */
    <html lang="es-CL" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
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
      <Animaciones />
    </>
  )
}

/*
  El título se corrige desde el cliente y no con un `<title>` en el árbol.

  React 19 iza los `<title>` al `head`, pero los deja **después** del que emite
  `HeadContent` de TanStack, y el navegador usa el primero: quedaban dos
  etiquetas y mandaba la de la portada. `HeadContent` se arma desde el `head()`
  de la ruta raíz, que no sabe que se está renderizando un 404.

  Corregirlo al montar arregla lo que la persona ve —la pestaña, el historial,
  un marcador—. El HTML del servidor conserva el título genérico, lo que sólo
  alcanza a los rastreadores, y a ellos los cubre el 404 del servidor más el
  `noindex` de arriba.
*/
function PaginaNoEncontrada() {
  useEffect(() => {
    document.title = 'Página no encontrada | Calor & Frío'
  }, [])

  return (
    <div className="hero-pagina">
      {/*
        El `noindex` sí se iza al `head` con React 19 y funciona en el render
        del servidor. Es redundante frente al 404 que ya devuelve el servidor
        —un buscador no indexa una respuesta 404—, pero cubre el caso de que
        alguna ruta llegue aquí con estado 200.
      */}
      <meta name="robots" content="noindex, follow" />
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
