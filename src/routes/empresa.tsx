import { createFileRoute } from '@tanstack/react-router'
import { company, domicilioLinea } from '../lib/company'
import { equipamiento } from '../lib/contenido'
import { CierreCTA, HeroPagina, RotuloSeccion, Seccion } from '../components/ui'

const url = `${company.sitio.url}/empresa`
const TITULO = 'La empresa — ingeniería en climatización y refrigeración'
const DESCRIPCION =
  'Calor y Frío Industrial SpA: empresa de ingeniería en climatización, refrigeración y ventilación en Santiago. Instalación, mantención, asesoría técnica y capacitación, con equipamiento propio.'

export const Route = createFileRoute('/empresa')({
  head: () => ({
    meta: [
      { title: `${TITULO} | ${company.nombreFantasia}` },
      { name: 'description', content: DESCRIPCION },
      { property: 'og:title', content: TITULO },
      { property: 'og:description', content: DESCRIPCION },
      { property: 'og:url', content: url },
    ],
    links: [{ rel: 'canonical', href: url }],
  }),
  component: Empresa,
})

function Empresa() {
  return (
    <>
      <HeroPagina
        eyebrow="La empresa"
        titulo="Ingeniería térmica para industria, comercio y hogar"
        bajada="Instalación, mantención, asesoría técnica y capacitación en la Región Metropolitana."
      />

      <Seccion tono="base">
        <RotuloSeccion eyebrow="Quiénes somos" titulo="Qué hacemos y para quién" />
        <div className="prosa">
          <p className="parrafo">
            Somos una empresa de ingeniería especializada en la instalación, el mantenimiento y la
            optimización de sistemas de climatización, refrigeración y ventilación. Atendemos con la
            misma rigurosidad técnica a clientes industriales y corporativos como a comercios y
            familias.
          </p>
          <p className="parrafo">
            Nuestra propuesta se apoya en tres cosas concretas: criterio técnico con más de treinta
            años de experiencia detrás, cumplimiento normativo, y herramienta e instrumental propios
            para ejecutar en los plazos que acordamos.
          </p>
          <p className="parrafo">
            Trabajamos en {company.areaServicio}, desde proyectos de alta complejidad hasta
            mantención domiciliaria.
          </p>
        </div>
      </Seccion>

      {/* ── EQUIPAMIENTO ── */}
      <Seccion tono="banda">
        <div className="split">
          <div className="split-copy">
            <RotuloSeccion
              eyebrow="Equipamiento"
              titulo="Con qué llegamos a terreno"
            />
            <p className="parrafo">
              La medición, la soldadura y el manejo de refrigerante se hacen con equipamiento
              propio. Eso permite programar la ejecución cuando el cliente la necesita y entregar
              mediciones hechas con instrumental calibrado.
            </p>
          </div>
          <dl className="credencial-lista">
            {equipamiento.map(item => (
              <div key={item.titulo}>
                <dt className="credencial-titulo">{item.titulo}</dt>
                <dd className="credencial-detalle">{item.detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Seccion>

      {/* ── DATOS DE LA EMPRESA ── */}
      <Seccion tono="tinte">
        <RotuloSeccion
          eyebrow="Identificación"
          titulo="Datos para facturación y contratos"
        />
        <dl className="ficha">
          <div className="ficha-fila"><dt>Razón social</dt><dd>{company.razonSocial}</dd></div>
          <div className="ficha-fila"><dt>R.U.T.</dt><dd>{company.rut}</dd></div>
          <div className="ficha-fila"><dt>Giro</dt><dd>{company.giro}</dd></div>
          <div className="ficha-fila"><dt>Código de actividad</dt><dd>{company.codigoActividad}</dd></div>
          <div className="ficha-fila"><dt>Domicilio</dt><dd>{domicilioLinea}</dd></div>
          <div className="ficha-fila"><dt>Cobertura</dt><dd>{company.areaServicio}</dd></div>
        </dl>
      </Seccion>

      <CierreCTA />
    </>
  )
}
