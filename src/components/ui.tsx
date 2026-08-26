import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { IconFlecha } from './icons'
import { useContador, useRevelar } from '../lib/movimiento'

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
  const ref = useRevelar<HTMLDivElement>()
  return (
    <section id={id} className={`seccion seccion--${tono}`}>
      <div ref={ref} className={`contenedor contenedor--${ancho}`} data-revelar>{children}</div>
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
  const ref = useRevelar<HTMLDivElement>()
  return (
    <div className="hero-pagina">
      <div ref={ref} className="contenedor" data-revelar>
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
  const ref = useRevelar<HTMLDivElement>()
  return (
    <div className="franja-datos">
      <div ref={ref} className="contenedor contenedor--full" data-revelar>
        <dl className="franja-datos-grid">
          {datos.map((dato, i) => (
            <Dato key={dato.etiqueta} {...dato} indice={i} />
          ))}
        </dl>
      </div>
    </div>
  )
}

/** Una cifra de la franja. El número sube al entrar en pantalla. */
function Dato({ valor, etiqueta, indice }: { valor: string; etiqueta: string; indice: number }) {
  const ref = useContador(valor)
  return (
    <div className="franja-dato" style={{ '--retardo': `${indice * 90}ms` } as React.CSSProperties}>
      <dt className="franja-dato-valor" ref={ref}>{valor}</dt>
      <dd className="franja-dato-etiqueta">{etiqueta}</dd>
    </div>
  )
}

/** Cierre con llamado a la acción. Una acción principal, repetida en cada página. */
export function CierreCTA({
  titulo = '¿Conversamos sobre su instalación?',
  bajada = 'Cuéntenos qué equipo tiene y qué le está pasando. Respondemos con una propuesta concreta para su caso.',
}: {
  titulo?: string
  bajada?: string
}) {
  const ref = useRevelar<HTMLDivElement>()
  return (
    <section className="cierre-cta">
      <div ref={ref} className="contenedor cierre-cta-inner" data-revelar>
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
