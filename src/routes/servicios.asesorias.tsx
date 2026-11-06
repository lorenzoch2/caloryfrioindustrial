import { createFileRoute } from '@tanstack/react-router'
import { PaginaServicio } from '../components/PaginaServicio'
import { getServicio } from '../lib/servicios'
import { company } from '../lib/company'

const servicio = getServicio('asesorias')
const url = `${company.sitio.url}/servicios/asesorias`

export const Route = createFileRoute('/servicios/asesorias')({
  head: () => ({
    meta: [
      { title: `${servicio.tituloPagina} | ${company.nombreCorto}` },
      { name: 'description', content: servicio.metaDescription },
      { property: 'og:title', content: servicio.tituloPagina },
      { property: 'og:description', content: servicio.metaDescription },
      { property: 'og:url', content: url },
    ],
    links: [{ rel: 'canonical', href: url }],
  }),
  component: () => <PaginaServicio servicio={servicio} />,
})
