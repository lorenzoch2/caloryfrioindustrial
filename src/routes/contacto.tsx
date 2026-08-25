import { createFileRoute } from '@tanstack/react-router'
import { company, domicilioLinea } from '../lib/company'
import { ContactForm } from '../components/ContactForm'
import { IconInstagram, IconMail, IconWhatsApp } from '../components/icons'
import { HeroPagina, Seccion } from '../components/ui'

const url = `${company.sitio.url}/contacto`
const TITULO = 'Contacto — solicitar visita técnica o cotización'
const DESCRIPCION =
  'Solicite una visita técnica o una cotización de climatización y refrigeración en la Región Metropolitana. Atendemos requerimientos industriales, comerciales, domiciliarios y de organismos públicos.'

export const Route = createFileRoute('/contacto')({
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
  component: Contacto,
})

function Contacto() {
  return (
    <>
      <HeroPagina
        eyebrow="Contacto"
        titulo="Cuéntenos qué le está pasando"
        bajada="Mientras más sepamos del equipo y de la falla, más concreta será la respuesta."
      />

      <Seccion tono="base">
        <div className="contacto-grid">
          <div className="contacto-aside">
            <h2 className="contacto-subtitulo">Canales directos</h2>
            <div className="contacto-canales">
              <a href={company.contacto.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-acento">
                <IconWhatsApp />
                WhatsApp
              </a>
              <a href={`mailto:${company.contacto.email}`} className="btn btn-linea btn-linea--oscuro">
                <IconMail />
                Correo
              </a>
              <a href={company.contacto.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-linea btn-linea--oscuro">
                <IconInstagram />
                Instagram
              </a>
            </div>

            <dl className="contacto-datos">
              <div><dt>Correo</dt><dd><a href={`mailto:${company.contacto.email}`}>{company.contacto.email}</a></dd></div>
              <div><dt>Teléfono</dt><dd>{company.contacto.telefonoDisplay}</dd></div>
              <div><dt>Dirección</dt><dd>{domicilioLinea}</dd></div>
              <div><dt>Cobertura</dt><dd>{company.areaServicio}</dd></div>
              <div><dt>Razón social</dt><dd>{company.razonSocial}</dd></div>
              <div><dt>R.U.T.</dt><dd>{company.rut}</dd></div>
            </dl>

            <p className="nota">
              Para requerimientos de organismos públicos, indique el ID del proceso y el plazo de
              cierre en el mensaje.
            </p>
          </div>

          <div className="contacto-form-wrap">
            <h2 className="contacto-subtitulo">Escríbanos</h2>
            <ContactForm />
          </div>
        </div>
      </Seccion>
    </>
  )
}
