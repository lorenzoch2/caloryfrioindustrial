import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { IconArriba } from './icons'

/**
 * Revela los bloques marcados con `data-revelar` al entrar en pantalla.
 *
 * El estado oculto se aplica sólo bajo `html.js`, una clase que pone el script
 * en línea de `__root.tsx`. Sin eso, si el JavaScript fallara la página quedaría
 * en blanco: el contenido estaría ahí pero con opacidad cero, invisible para la
 * persona y sospechoso para un buscador.
 *
 * Se vuelve a observar en cada cambio de ruta porque los nodos son otros.
 */
function useRevelar() {
  const pathname = useRouterState({ select: state => state.location.pathname })

  useEffect(() => {
    const nodos = document.querySelectorAll<HTMLElement>('[data-revelar]:not(.visible)')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodos.forEach(n => n.classList.add('visible'))
      return
    }

    const observador = new IntersectionObserver(
      entradas => {
        entradas.forEach(entrada => {
          if (!entrada.isIntersecting) return
          entrada.target.classList.add('visible')
          observador.unobserve(entrada.target)
        })
      },
      // Se dispara un poco antes de que el bloque toque el borde inferior, para
      // que la animación termine cuando el lector ya lo está mirando.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    nodos.forEach(n => observador.observe(n))
    return () => observador.disconnect()
  }, [pathname])
}

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
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: suave ? 'smooth' : 'auto' })
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

export function Animaciones() {
  useRevelar()
  return <BotonArriba />
}
