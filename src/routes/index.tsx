import { Link, createFileRoute } from '@tanstack/react-router'
import heroAncho from '../assets/hero/hero-home-1280.jpg'
import heroAngosto from '../assets/hero/hero-home-760.jpg'
import { company } from '../lib/company'
import { servicios } from '../lib/servicios'
import { metodologia, preguntas, razones, segmentos } from '../lib/contenido'
import {
  IconComercio, IconFlecha, IconHogar, IconIndustria, IconWhatsApp,
} from '../components/icons'
import { CierreCTA, FranjaDatos, RotuloSeccion, Seccion } from '../components/ui'
import { useParallax } from '../lib/movimiento'

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
  hogar: IconHogar,
}

function Portada() {
  const foto = useParallax<HTMLImageElement>()

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <img
          ref={foto}
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
            Climatización, refrigeración y ventilación
            {' '}<span className="acento">con diagnóstico en terreno</span>
          </h1>
          <p className="hero-bajada">
            Instalación, mantención y asesoría técnica para industria, comercio y hogar.
            Visita a terreno antes de cotizar, instrumental propio y mediciones que quedan
            por escrito.
          </p>
          <div className="hero-acciones">
            <Link to="/contacto" className="btn btn-acento btn-lg">
              Solicitar visita técnica
              <IconFlecha />
            </Link>
            <a
              href={company.contacto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-linea btn-lg"
            >
              <IconWhatsApp />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <FranjaDatos
        datos={[
          { valor: '30+', etiqueta: 'años de experiencia técnica' },
          { valor: '100%', etiqueta: 'instrumental y herramienta propia' },
          { valor: 'RM', etiqueta: 'Región Metropolitana y alrededores' },
          { valor: '03', etiqueta: 'líneas de servicio' },
        ]}
      />

      {/* ── SEGMENTOS ── */}
      <Seccion id="segmentos" tono="base">
        <RotuloSeccion
          eyebrow="Por segmento"
          titulo="Industria, comercio y hogar"
          bajada="Una cámara de frío detenida y un split que no enfría requieren alcances, plazos y precios distintos. Seleccione el segmento que corresponda."
        />
        <div className="segmentos-grid segmentos-grid--tres">
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
        <RotuloSeccion eyebrow="Servicios" titulo="Tres líneas de servicio" />
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
              eyebrow="Criterios de trabajo"
              titulo="Trabajo medido y documentado"
            />
            <p className="parrafo">
              Ejecutamos trabajos de climatización, refrigeración y ventilación. La empresa cuenta
              con más de treinta años de experiencia técnica y con equipamiento propio para
              ejecutar en los plazos acordados. Para sistemas VRF, dos de sus técnicos están
              acreditados por la Academia HVAC de LG Chile.
            </p>
            <p className="parrafo">
              Cada servicio comienza con una visita a terreno y concluye con un informe que
              registra lo medido y lo intervenido.
            </p>
            <Link to="/empresa" className="enlace-flecha enlace-flecha--claro">
              Conocer la empresa
              <IconFlecha size={16} />
            </Link>
          </div>
          <ul className="credencial-lista">
            {razones.map(razon => (
              <li key={razon.titulo}>
                <span className="credencial-titulo">{razon.titulo}</span>
                <span className="credencial-detalle">{razon.detalle}</span>
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
          bajada="El mismo procedimiento en un contrato industrial y en una mantención domiciliaria, con el alcance ajustado a cada instalación."
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

      {/* ── PREGUNTAS FRECUENTES ── */}
      <Seccion tono="tinte">
        <RotuloSeccion
          eyebrow="Preguntas frecuentes"
          titulo="Antes de contratar"
        />
        <dl className="preguntas">
          {preguntas.map(pregunta => (
            <div key={pregunta.titulo}>
              <dt className="pregunta-titulo">{pregunta.titulo}</dt>
              <dd className="pregunta-detalle">{pregunta.detalle}</dd>
            </div>
          ))}
        </dl>
      </Seccion>

      <CierreCTA />
    </>
  )
}
