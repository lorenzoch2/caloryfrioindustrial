import { useState, type FormEvent } from 'react'

/**
 * Formulario de contacto sobre Netlify Forms.
 *
 * Netlify detecta formularios escaneando el HTML *estático* en tiempo de build.
 * Como esta página se renderiza en el servidor, el formulario de React nunca
 * aparece en ese escaneo, así que la declaración vive en `public/__forms.html`
 * y aquí se hace POST contra ese archivo. Es el patrón documentado por Netlify
 * para frameworks con SSR.
 *
 * Si se agrega, renombra o quita un campo, hay que reflejarlo también en
 * `public/__forms.html` o Netlify descartará el dato silenciosamente.
 */

const FORM_NAME = 'contacto'

const tiposRequerimiento = [
  'Asesoría técnica / ITO',
  'Capacitación',
  'Servicio de mantenimiento',
  'Licitación pública o cotización para el Estado',
  'Otro',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    const form = event.currentTarget
    const data = new FormData(form)
    data.append('form-name', FORM_NAME)

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })

      if (!response.ok) throw new Error(`Netlify respondió ${response.status}`)

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" name={FORM_NAME} onSubmit={handleSubmit}>
      {/* Trampa antispam: invisible para personas, tentadora para bots. */}
      <p className="contact-form-hp" aria-hidden="true">
        <label>
          No completar este campo
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="contact-form-row">
        <label className="contact-field">
          <span>Nombre <em aria-hidden="true">*</em></span>
          <input name="nombre" type="text" required autoComplete="name" />
        </label>
        <label className="contact-field">
          <span>Empresa o institución</span>
          <input name="organizacion" type="text" autoComplete="organization" />
        </label>
      </div>

      <div className="contact-form-row">
        <label className="contact-field">
          <span>Correo <em aria-hidden="true">*</em></span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="contact-field">
          <span>Teléfono</span>
          <input name="telefono" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label className="contact-field">
        <span>Tipo de requerimiento</span>
        <select name="tipo" defaultValue={tiposRequerimiento[0]}>
          {tiposRequerimiento.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </label>

      <label className="contact-field">
        <span>Mensaje <em aria-hidden="true">*</em></span>
        <textarea name="mensaje" rows={5} required />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
        </button>

        <p className="contact-form-status" role="status" aria-live="polite">
          {status === 'sent' && 'Recibimos su mensaje. Responderemos a la brevedad.'}
          {status === 'error' && (
            <>
              No pudimos enviar el mensaje. Escríbanos a{' '}
              <a href="mailto:contacto@caloryfrioindustrial.cl">contacto@caloryfrioindustrial.cl</a>.
            </>
          )}
        </p>
      </div>
    </form>
  )
}
