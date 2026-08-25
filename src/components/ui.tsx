import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { IconFlecha } from './icons'

/**
 * Sección de página. `tono` elige una de las tres superficies claras:
 * `base` para lectura, `tinte` para la banda alterna y `banda` para las bandas
 * fuertes — portada, cifras y cierre. Ninguna es oscura en el tema claro.
 */
export function Seccion({
  id,
  tono = 'base',
  ancho = 'normal',
  children,
}: {
  id?: string
  tono?: 'base' | 'tinte' | 'banda'
  ancho?: 'normal' | 'estrecho'
  children: ReactNode
}) {
  return (
    <section id={id} className={`seccion seccion--${tono}`}>
      <div className={`contenedor contenedor--${ancho}`} data-revelar>{children}</div>
    </section>
  )
}

/**
 * Rótulo de sección: un <h2> real precedido de un eyebrow.
 * El eyebrow es decorativo — vive fuera del encabezado para no ensuciar el
 * esquema de títulos que leen buscadores y lectores de pantalla.
 */
export function RotuloSeccion({
  eyebrow,
  titulo,
  bajada,
}: {
  eyebrow?: string
  titulo: string
  bajada?: string
}) {
  return (
    <div className="rotulo">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="rotulo-titulo">{titulo}</h2>
      {bajada && <p className="rotulo-bajada">{bajada}</p>}
    </div>
  )
}

/** Cabecera tipográfica de las páginas interiores. */
export function HeroPagina({
  eyebrow,
  titulo,
  bajada,
  children,
}: {
  eyebrow: string
  titulo: string
  bajada?: string
  children?: ReactNode
}) {
  return (
    <div className="hero-pagina">
      <div className="contenedor" data-revelar>
        <p className="eyebrow eyebrow--acento">{eyebrow}</p>
        <h1 className="hero-pagina-titulo">{titulo}</h1>
        {bajada && <p className="hero-pagina-bajada">{bajada}</p>}
        {children}
      </div>
    </div>
  )
}

/** Franja de cifras. Los valores van en monoespaciada para que se lean como datos. */
export function FranjaDatos({ datos }: { datos: { valor: string; etiqueta: string }[] }) {
  return (
    <div className="franja-datos">
      <div className="contenedor contenedor--full" data-revelar>
        <dl className="franja-datos-grid">
          {datos.map(dato => (
            <div key={dato.etiqueta} className="franja-dato">
              <dt className="franja-dato-valor">{dato.valor}</dt>
              <dd className="franja-dato-etiqueta">{dato.etiqueta}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

/** Cierre con llamado a la acción. Una acción principal, repetida en cada página. */
export function CierreCTA({
  titulo = '¿Conversamos sobre su instalación?',
  bajada = 'Cuéntenos qué equipo tiene y qué le está pasando. Respondemos con una propuesta concreta, no con un catálogo.',
}: {
  titulo?: string
  bajada?: string
}) {
  return (
    <section className="cierre-cta">
      <div className="contenedor cierre-cta-inner" data-revelar>
        <div>
          <h2 className="cierre-cta-titulo">{titulo}</h2>
          <p className="cierre-cta-bajada">{bajada}</p>
        </div>
        <Link to="/contacto" className="btn btn-acento btn-lg">
          Solicitar visita técnica
          <IconFlecha />
        </Link>
      </div>
    </section>
  )
}
