import { useEffect, useState } from 'react'
import { IconArriba } from './icons'
import { movimientoReducido } from '../lib/movimiento'

/** Botón para volver arriba. Aparece cuando ya se bajó más de una pantalla. */
function BotonArriba() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function alDesplazar() {
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [])

  function subir() {
    window.scrollTo({ top: 0, behavior: movimientoReducido() ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`boton-arriba${visible ? ' visible' : ''}`}
      onClick={subir}
      aria-label="Volver arriba"
      // Fuera de pantalla no debe recibir foco con el tabulador.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <IconArriba />
    </button>
  )
}

/** Sólo el botón: el revelado de bloques lo hace cada bloque con su propio ref. */
export function Animaciones() {
  return <BotonArriba />
}
