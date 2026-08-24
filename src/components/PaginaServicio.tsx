import { useState } from 'react'
import { GalleryCarousel } from './GalleryCarousel'
import { CierreCTA, HeroPagina, RotuloSeccion, Seccion } from './ui'
import { IconCheck } from './icons'
import { getServiceImages } from '../lib/images'
import type { Servicio } from '../lib/servicios'

/**
 * Plantilla común de las tres páginas de servicio.
 *
 * Las tres comparten estructura porque comparten propósito: alcance, entregables
 * y a quién sirve. Lo que cambia es el contenido, que vive en `lib/servicios.ts`.
 */
export function PaginaServicio({ servicio }: { servicio: Servicio }) {
  const imagenes = getServiceImages(servicio.galeria)
  const [indice, setIndice] = useState(0)

  return (
    <>
      <HeroPagina
        eyebrow={servicio.eyebrow}
        titulo={servicio.titulo}
        bajada={servicio.bajada}
      />

      <Seccion tono="claro" ancho="estrecho">
        <p className="parrafo parrafo--destacado">{servicio.intro}</p>
      </Seccion>

      <Seccion tono="tinte">
        <RotuloSeccion eyebrow="Alcance" titulo="Qué incluye el servicio" />
        <div className="alcance-grid">
          {servicio.alcance.map(item => (
            <article key={item.titulo} className="alcance-item">
              <h3>{item.titulo}</h3>
              <p>{item.detalle}</p>
            </article>
          ))}
        </div>
      </Seccion>

      <Seccion tono="claro">
        <div className="dos-columnas">
          <div>
            <RotuloSeccion eyebrow="Entregables" titulo="Qué recibe usted" />
            <ul className="lista-check">
              {servicio.entregables.map(item => (
                <li key={item}>
                  <span className="lista-check-icono"><IconCheck size={16} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <RotuloSeccion eyebrow="Para quién" titulo="A quién sirve" />
            <ul className="lista-check">
              {servicio.paraQuien.map(item => (
                <li key={item}>
                  <span className="lista-check-icono"><IconCheck size={16} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Seccion>

      {imagenes.length > 0 && (
        <Seccion tono="oscuro">
          <RotuloSeccion eyebrow="En terreno" titulo="Trabajos realizados" />
          <GalleryCarousel
            images={imagenes}
            label={servicio.navLabel}
            currentIndex={indice}
            onCurrentIndexChange={setIndice}
          />
        </Seccion>
      )}

      <CierreCTA />
    </>
  )
}
