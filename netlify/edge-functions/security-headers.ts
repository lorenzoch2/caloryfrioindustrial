import type { Config, Context } from '@netlify/edge-functions'

/**
 * Cabeceras de seguridad para TODA respuesta, incluida la que emite el SSR.
 *
 * Por qué existe este archivo: las cabeceras declaradas en `netlify.toml` sólo
 * alcanzan a los archivos estáticos del CDN. El documento HTML lo emite la
 * función SSR de TanStack Start y no pasa por esa capa — verificado contra
 * producción: `/logo.png` respondía con `X-Frame-Options` y `GET /` no, o sea
 * las imágenes estaban protegidas y la página no.
 *
 * Una edge function corre por delante del origen, así que puede tomar la
 * respuesta ya generada y fijarle las cabeceras antes de devolverla.
 *
 * `netlify.toml` conserva su bloque de cabeceras a propósito: si esta función
 * fallara al desplegarse, los estáticos siguen protegidos. Aquí se usa `set`,
 * no `append`, así que nunca se duplican.
 */

/** Directivas CSP, en una sola línea al serializar. */
const csp = [
  "default-src 'self'",
  // TanStack Start inyecta el estado de hidratación en scripts inline; no hay
  // soporte de nonce, así que 'unsafe-inline' es obligado mientras sea SSR.
  "script-src 'self' 'unsafe-inline'",
  // Google Fonts sirve la hoja de estilos; React y Tailwind emiten estilos inline.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  // El formulario hace POST a /__forms.html, mismo origen.
  "connect-src 'self'",
  "form-action 'self'",
  // Equivale a X-Frame-Options DENY, y lo supera: es lo que respetan los
  // navegadores actuales frente al clickjacking.
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const cabeceras: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}

/**
 * En local no se aplica CSP: el servidor de desarrollo de Vite usa WebSocket
 * para recarga en caliente y módulos que la política de producción bloquearía.
 * Publicar una CSP que sólo se puede probar en producción es peor que no
 * tenerla, así que el resto de cabeceras sí se aplican en ambos entornos y se
 * pueden verificar en desarrollo.
 */
function esLocal(url: URL): boolean {
  return url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]'
}

function aplicar(headers: Headers, url: URL): void {
  for (const [nombre, valor] of Object.entries(cabeceras)) {
    headers.set(nombre, valor)
  }
  if (!esLocal(url)) {
    headers.set('Content-Security-Policy', csp)
  }
}

export default async function securityHeaders(request: Request, context: Context) {
  const respuesta = await context.next()
  const url = new URL(request.url)

  try {
    aplicar(respuesta.headers, url)
    return respuesta
  } catch {
    // Algunas respuestas del CDN llegan con cabeceras inmutables y `set` lanza.
    // Sin este resguardo, esta función convertiría esas respuestas en un 500:
    // una función que corre delante de TODO el sitio no puede caerse por esto.
    const headers = new Headers(respuesta.headers)
    aplicar(headers, url)
    return new Response(respuesta.body, {
      status: respuesta.status,
      statusText: respuesta.statusText,
      headers,
    })
  }
}

export const config: Config = {
  path: '/*',
  // Las respuestas del propio runtime de Netlify no deben reescribirse.
  excludedPath: ['/.netlify/*'],
}
