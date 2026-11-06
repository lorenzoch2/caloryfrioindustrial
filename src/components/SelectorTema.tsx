import { useEffect, useState } from 'react'
import { IconLuna, IconSol } from './icons'

export type Tema = 'claro' | 'oscuro'

/**
 * Selector de tema claro / oscuro.
 *
 * El tema real lo fija un script en línea de `__root.tsx` **antes** de que
 * pinte la página, para que no haya un destello del tema equivocado. Este
 * componente sólo lee lo que ese script dejó puesto y permite cambiarlo.
 *
 * Por eso arranca en `null` y no asume un valor: durante el render del servidor
 * no hay `document` ni `localStorage`, y adivinar produciría un icono que
 * cambia solo al hidratar.
 *
 * Mientras la persona no haya tocado el selector, el sitio sigue la preferencia
 * del sistema, incluso si cambia con la página abierta —el cambio automático al
 * anochecer, por ejemplo—. El primer clic fija una preferencia propia y a
 * partir de ahí el sistema deja de mandar.
 */
export function SelectorTema() {
  const [tema, setTema] = useState<Tema | null>(null)

  useEffect(() => {
    const actual = document.documentElement.dataset.tema
    setTema(actual === 'oscuro' ? 'oscuro' : 'claro')

    const consulta = matchMedia('(prefers-color-scheme: dark)')
    function alCambiarElSistema(evento: MediaQueryListEvent) {
      let elegido: string | null = null
      try {
        elegido = localStorage.getItem('tema')
      } catch {
        // Sin almacenamiento no hay elección guardada: manda el sistema.
      }
      if (elegido === 'oscuro' || elegido === 'claro') return
      const siguiente: Tema = evento.matches ? 'oscuro' : 'claro'
      document.documentElement.dataset.tema = siguiente
      setTema(siguiente)
    }

    consulta.addEventListener('change', alCambiarElSistema)
    return () => consulta.removeEventListener('change', alCambiarElSistema)
  }, [])

  function alternar() {
    const siguiente: Tema = tema === 'oscuro' ? 'claro' : 'oscuro'
    document.documentElement.dataset.tema = siguiente
    try {
      localStorage.setItem('tema', siguiente)
    } catch {
      // Modo privado o almacenamiento bloqueado: el cambio vale para esta visita.
    }
    setTema(siguiente)
  }

  const esOscuro = tema === 'oscuro'

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={alternar}
      aria-label={esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={esOscuro ? 'Tema claro' : 'Tema oscuro'}
    >
      {/* Hasta que el efecto lee el tema no se pinta ninguno, para no mostrar el icono contrario. */}
      {tema === null ? null : esOscuro ? <IconSol /> : <IconLuna />}
    </button>
  )
}
