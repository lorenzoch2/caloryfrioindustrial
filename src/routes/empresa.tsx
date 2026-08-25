import { createFileRoute } from '@tanstack/react-router'
import { company, domicilioLinea } from '../lib/company'
import { capacidadOperativa, formacionTecnica, sectoresExperiencia } from '../lib/credenciales'
import { getAboutImage } from '../lib/images'
import { CierreCTA, HeroPagina, RotuloSeccion, Seccion } from '../components/ui'

const url = `${company.sitio.url}/empresa`
const TITULO = 'Quiénes somos — ingeniería en climatización y refrigeración'
const DESCRIPCION =
  'Calor y Frío Industrial SpA: empresa de ingeniería en climatización y refrigeración industrial en Las Condes, Santiago. Dirección técnica con más de 30 años de ejercicio, certificaciones y capacidad operativa propia.'

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
  const imagenSobreNosotros = getAboutImage()

  return (
    <>
      <HeroPagina
        eyebrow="Empresa"
        titulo="Ingeniería térmica con respaldo verificable"
        bajada="Una empresa nueva con una dirección técnica que no lo es."
      />

      <Seccion tono="base">
        <div className="split split--media">
          {imagenSobreNosotros && (
            <figure className="figura">
              <img src={imagenSobreNosotros} alt="Equipo de Calor &amp; Frío Industrial en terreno" loading="lazy" />
            </figure>
          )}
          <div>
            <RotuloSeccion eyebrow="Quiénes somos" titulo="Qué hacemos y para quién" />
            <p className="parrafo">
              Somos una empresa de ingeniería especializada en el mantenimiento, diseño y
              optimización de sistemas térmicos industriales y comerciales. Atendemos con la misma
              rigurosidad técnica a clientes industriales y corporativos como a familias y comercios.
            </p>
            <p className="parrafo">
              Nuestra propuesta se apoya en tres cosas concretas: criterio técnico con treinta años
              de ejercicio detrás, cumplimiento normativo, y herramienta e instrumental propios para
              no depender de terceros en la ejecución.
            </p>
            <p className="parrafo">
              Trabajamos en {company.areaServicio}, desde proyectos de alta complejidad hasta
              mantención domiciliaria.
            </p>
          </div>
        </div>
      </Seccion>

      {/* ── EQUIPO ── */}
      <Seccion tono="banda">
        <RotuloSeccion eyebrow="Equipo" titulo="Quién responde por el trabajo" />
        <div className="equipo-grid">
          <article className="persona">
            <p className="persona-rol">Dirección Técnica</p>
            <h3 className="persona-nombre">{company.direccionTecnica}</h3>
            <p className="persona-bio">
              Ingeniero de Ejecución Industrial con más de 30 años liderando supervisión,
              mantenimiento integral y ejecución de proyectos de refrigeración comercial, industrial
              y climatización. Especializado en tecnologías de refrigerantes ecoeficientes e
              inflamables, con catorce años de docencia técnica en educación superior y ejercicio
              como relator especialista para la agroindustria.
            </p>
          </article>
          <article className="persona">
            <p className="persona-rol">Representante Legal y Gerente General</p>
            <h3 className="persona-nombre">{company.representanteLegal}</h3>
            <p className="persona-bio">
              Responsable de la administración, la contratación y la coordinación comercial de la
              empresa. Contraparte para procesos de compra, contratos de mantención y
              requerimientos de organismos públicos.
            </p>
          </article>
        </div>

        <div className="sectores">
          <h3 className="sectores-titulo">Sectores de ejercicio de la dirección técnica</h3>
          <ul className="sectores-lista">
            {sectoresExperiencia.map(sector => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
          <p className="nota">
            Trayectoria profesional de la dirección técnica, anterior a la constitución de la
            sociedad. Currículum y certificados disponibles a solicitud.
          </p>
        </div>
      </Seccion>

      {/* ── CREDENCIALES ── */}
      <Seccion tono="base">
        <div className="dos-columnas">
          <div>
            <RotuloSeccion eyebrow="Formación" titulo="Títulos y certificaciones" />
            <dl className="credencial-lista credencial-lista--claro">
              {formacionTecnica.map(item => (
                <div key={item.titulo}>
                  <dt className="credencial-titulo">{item.titulo}</dt>
                  <dd className="credencial-detalle">{item.detalle}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <RotuloSeccion eyebrow="Capacidad operativa" titulo="Con qué llegamos a terreno" />
            <dl className="credencial-lista credencial-lista--claro">
              {capacidadOperativa.map(item => (
                <div key={item.titulo}>
                  <dt className="credencial-titulo">{item.titulo}</dt>
                  <dd className="credencial-detalle">{item.detalle}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Seccion>

      {/* ── DATOS LEGALES ── */}
      <Seccion tono="tinte">
        <RotuloSeccion eyebrow="Identificación" titulo="Antecedentes legales" />
        <dl className="ficha">
          <div className="ficha-fila"><dt>Razón social</dt><dd>{company.razonSocial}</dd></div>
          <div className="ficha-fila"><dt>R.U.T.</dt><dd>{company.rut}</dd></div>
          <div className="ficha-fila"><dt>Giro</dt><dd>{company.giro}</dd></div>
          <div className="ficha-fila"><dt>Código de actividad</dt><dd>{company.codigoActividad}</dd></div>
          <div className="ficha-fila"><dt>Domicilio</dt><dd>{domicilioLinea}</dd></div>
          <div className="ficha-fila"><dt>Representante legal</dt><dd>{company.representanteLegal}</dd></div>
        </dl>
      </Seccion>

      <CierreCTA />
    </>
  )
}
