import { createFileRoute } from '@tanstack/react-router'
import { company, domicilioLinea } from '../lib/company'
import { capacidadOperativa } from '../lib/credenciales'
import { IconCheck } from '../components/icons'
import { CierreCTA, HeroPagina, RotuloSeccion, Seccion } from '../components/ui'

const url = `${company.sitio.url}/sector-publico`
const TITULO = 'Proveedor de servicios HVAC para organismos públicos · Santiago'
const DESCRIPCION =
  'Antecedentes legales, tributarios y técnicos de Calor y Frío Industrial SpA para procesos de compra pública: razón social, RUT, giro, régimen tributario, capacidad operativa y documentación disponible.'

export const Route = createFileRoute('/sector-publico')({
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
  component: SectorPublico,
})

/**
 * Antecedentes de la empresa.
 *
 * Sólo se publica lo que está acreditado hoy. Cuando la inscripción en
 * ChileProveedores esté vigente, agregar la fila aquí:
 *   { campo: 'ChileProveedores', valor: 'Inscrito y hábil — ID 000000' }
 * Nunca antes: declarar como vigente algo que no lo está es causal de
 * exclusión en una licitación.
 */
const ficha = [
  { campo: 'Razón social', valor: company.razonSocial },
  { campo: 'R.U.T.', valor: company.rut },
  { campo: 'Tipo de sociedad', valor: company.tipoSociedad },
  { campo: 'Giro', valor: company.giro },
  { campo: 'Código de actividad', valor: company.codigoActividad },
  { campo: 'Régimen tributario', valor: company.regimenTributario },
  { campo: 'Inicio de actividades', valor: '12 de enero de 2026' },
  { campo: 'Representante legal', valor: company.representanteLegal },
  { campo: 'Domicilio', valor: domicilioLinea },
  { campo: 'Facturación', valor: 'Factura electrónica autorizada por el SII' },
  { campo: 'Área de servicio', valor: company.areaServicio },
  { campo: 'Contacto para procesos', valor: company.contacto.email },
]

const documentacion = [
  'Certificado de constitución y estatuto actualizado',
  'Certificado de vigencia de la sociedad',
  'Carpeta Tributaria del SII',
  'e-RUT y cédula del representante legal',
  'Patente comercial municipal al día',
  'Certificados de antecedentes laborales y previsionales (F30 y F30-1)',
  'Declaraciones juradas de no inhabilidad, en el formato de cada llamado',
  'Currículum y certificados del personal técnico clave',
]

function SectorPublico() {
  return (
    <>
      <HeroPagina
        eyebrow="Sector Público"
        titulo="Antecedentes para procesos de compra pública"
        bajada="Todo lo que una comisión evaluadora necesita revisar, sin pedirlo por correo y sin esperar respuesta."
      />

      <Seccion tono="base" ancho="estrecho">
        <p className="parrafo parrafo--destacado">
          Atendemos requerimientos de organismos públicos en mantención de climatización y
          refrigeración, asesoría técnica e inspección de obras, y capacitación de personal.
          Trabajamos tanto compras de bajo monto como llamados formales, y emitimos factura
          electrónica.
        </p>
        <p className="parrafo">
          Si está evaluando ofertas o preparando un requerimiento, en esta página están los datos de
          identificación de la empresa y el detalle de nuestra capacidad técnica instalada. Para
          cualquier antecedente adicional, escriba a{' '}
          <a href={`mailto:${company.contacto.email}`}>{company.contacto.email}</a> — respondemos
          dentro del plazo de aclaraciones.
        </p>
      </Seccion>

      <Seccion tono="tinte">
        <RotuloSeccion eyebrow="Identificación" titulo="Antecedentes de la empresa" />
        <dl className="ficha">
          {ficha.map(fila => (
            <div key={fila.campo} className="ficha-fila">
              <dt>{fila.campo}</dt>
              <dd>{fila.valor}</dd>
            </div>
          ))}
        </dl>
      </Seccion>

      <Seccion tono="base">
        <div className="dos-columnas">
          <div>
            <RotuloSeccion
              eyebrow="Documentación"
              titulo="Disponible a solicitud"
              bajada="Los certificados con fecha de emisión se regeneran al momento de cada postulación, con la vigencia que exijan las bases."
            />
            <ul className="lista-check">
              {documentacion.map(item => (
                <li key={item}>
                  <span className="lista-check-icono"><IconCheck size={16} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <RotuloSeccion
              eyebrow="Capacidad operativa"
              titulo="Herramienta propia, no arrendada"
              bajada="La ejecución no depende de conseguir equipos prestados ni de subcontratar el instrumental de medición."
            />
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

      <CierreCTA
        titulo="¿Necesita una cotización para un proceso de compra?"
        bajada="Indíquenos el requerimiento, el plazo y el formato en que necesita la oferta. Si hay una visita previa a terreno, la coordinamos."
      />
    </>
  )
}
