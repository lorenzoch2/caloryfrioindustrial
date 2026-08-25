import { Link, createFileRoute } from '@tanstack/react-router'
import heroAncho from '../assets/hero/hero-home-1280.jpg'
import heroAngosto from '../assets/hero/hero-home-760.jpg'
import { company } from '../lib/company'
import { servicios } from '../lib/servicios'
import { formacionTecnica, metodologia, segmentos } from '../lib/credenciales'
import {
  IconComercio, IconFlecha, IconHogar, IconIndustria, IconPublico,
} from '../components/icons'
import { CierreCTA, FranjaDatos, RotuloSeccion, Seccion } from '../components/ui'

export const Route = createFileRoute('/')({
  // El canonical se declara por página, no en la raíz: en la raíz lo heredarían
  // todas las rutas y quedarían apuntando a la portada.
  head: () => ({
    links: [{ rel: 'canonical', href: company.sitio.url }],
  }),
  component: Portada,
})

const iconosSegmento: Record<string, React.ComponentType<{ size?: number }>> = {
  industria: IconIndustria,
  comercio: IconComercio,
  publico: IconPublico,
  hogar: IconHogar,
}

function Portada() {
  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <img
          className="hero-foto"
          src={heroAncho}
          srcSet={`${heroAngosto} 760w, ${heroAncho} 1280w`}
          sizes="100vw"
          alt="Banco de unidades condensadoras en mantención junto a un edificio corporativo"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-velo" aria-hidden="true" />
        <div className="contenedor hero-contenido">
          {/*
            Lockup vertical: el símbolo con el nombre debajo. La cabecera usa el
            horizontal, que cabe en una barra de 68 px. Ambos traen el texto en
            curvas, así que no dependen de que cargue ninguna fuente.
          */}
          <img
            className="hero-logotipo solo-claro"
            src="/lockup-vertical-claro.svg"
            alt="Calor &amp; Frío Industrial"
            width={346}
            height={242}
            fetchPriority="high"
          />
          <img
            className="hero-logotipo solo-oscuro"
            src="/lockup-vertical.svg"
            alt="Calor &amp; Frío Industrial"
            width={346}
            height={242}
          />
          <p className="eyebrow eyebrow--acento">
            Contratista de ingeniería térmica · Santiago de Chile
          </p>
          <h1 className="hero-titulo">
            No lo diagnosticamos<br />por teléfono.
          </h1>
          <p className="hero-bajada">
            Vamos, medimos y le decimos qué tiene. Climatización, refrigeración industrial y
            ventilación para instalaciones que no pueden permitirse una parada.
          </p>
          <div className="hero-acciones">
            <Link to="/contacto" className="btn btn-acento btn-lg">
              Solicitar visita técnica
              <IconFlecha />
            </Link>
            <Link to="/sector-publico" className="btn btn-linea btn-lg">
              Antecedentes para licitaciones
            </Link>
          </div>
        </div>
      </div>

      <FranjaDatos
        datos={[
          { valor: '30+', etiqueta: 'años de dirección técnica' },
          { valor: '06', etiqueta: 'certificaciones y especializaciones' },
          { valor: '100%', etiqueta: 'instrumental y herramienta propia' },
          { valor: 'RM', etiqueta: 'Región Metropolitana y alrededores' },
        ]}
      />

      {/* ── SEGMENTOS ── */}
      <Seccion id="segmentos" tono="base">
        <RotuloSeccion
          eyebrow="Por dónde empezar"
          titulo="¿Desde dónde nos escribe?"
          bajada="Una cámara de frío detenida y un split que no enfría son dos problemas distintos, con precios y plazos distintos. Elija el suyo y le mostramos lo que corresponde."
        />
        <div className="segmentos-grid">
          {segmentos.map(segmento => {
            const Icono = iconosSegmento[segmento.id]
            return (
              <Link key={segmento.id} to={segmento.destino} className="segmento">
                <span className="segmento-icono"><Icono /></span>
                <span className="segmento-titulo">{segmento.titulo}</span>
                <span className="segmento-detalle">{segmento.detalle}</span>
                <span className="segmento-flecha"><IconFlecha size={16} /></span>
              </Link>
            )
          })}
        </div>
      </Seccion>

      {/* ── SERVICIOS ── */}
      <Seccion tono="tinte">
        <RotuloSeccion eyebrow="Lo que hacemos" titulo="Tres líneas, un mismo criterio técnico" />
        <div className="servicios-grid">
          {servicios.map((servicio, indice) => (
            <article key={servicio.slug} className="servicio-card">
              <p className="servicio-numero">{String(indice + 1).padStart(2, '0')}</p>
              <h3 className="servicio-titulo">{servicio.titulo}</h3>
              <p className="servicio-bajada">{servicio.bajada}</p>
              <ul className="servicio-lista">
                {servicio.alcance.slice(0, 4).map(item => (
                  <li key={item.titulo}>{item.titulo}</li>
                ))}
              </ul>
              <Link to={`/servicios/${servicio.slug}`} className="enlace-flecha">
                Ver alcance completo
                <IconFlecha size={16} />
              </Link>
            </article>
          ))}
        </div>
      </Seccion>

      {/* ── POR QUÉ ── */}
      <Seccion tono="banda">
        <div className="split">
          <div className="split-copy">
            <RotuloSeccion
              eyebrow="Por qué nosotros"
              titulo="Treinta años que no se improvisan"
            />
            <p className="parrafo">
              La dirección técnica está a cargo de <strong>{company.direccionTecnica}</strong>, con más
              de tres décadas en refrigeración industrial, retail y agroindustria, y catorce años de
              docencia técnica en educación superior.
            </p>
            <p className="parrafo">
              Eso significa que quien evalúa su instalación ya vio fallar la suya antes, en otra
              planta y con otro nombre. La experiencia en frío industrial no se estudia: se acumula.
            </p>
            <Link to="/empresa" className="enlace-flecha enlace-flecha--claro">
              Ver credenciales y antecedentes
              <IconFlecha size={16} />
            </Link>
          </div>
          <ul className="credencial-lista">
            {formacionTecnica.slice(0, 4).map(item => (
              <li key={item.titulo}>
                <span className="credencial-titulo">{item.titulo}</span>
                <span className="credencial-detalle">{item.detalle}</span>
              </li>
            ))}
          </ul>
        </div>
      </Seccion>

      {/* ── METODOLOGÍA ── */}
      <Seccion tono="base">
        <RotuloSeccion
          eyebrow="Cómo trabajamos"
          titulo="Del levantamiento al informe de cierre"
          bajada="El mismo procedimiento en un contrato industrial y en una mantención domiciliaria. Cambia la escala, no el método."
        />
        <ol className="metodologia">
          {metodologia.map((paso, indice) => (
            <li key={paso.titulo} className="metodologia-paso">
              <span className="metodologia-numero">{String(indice + 1).padStart(2, '0')}</span>
              <span className="metodologia-titulo">{paso.titulo}</span>
              <span className="metodologia-detalle">{paso.detalle}</span>
            </li>
          ))}
        </ol>
      </Seccion>

      <CierreCTA />
    </>
  )
}
