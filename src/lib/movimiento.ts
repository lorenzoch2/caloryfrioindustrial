import { useEffect, useRef, useState } from 'react'

/** ¿La persona pidió menos movimiento en su sistema? */
export function movimientoReducido() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Revela un bloque cuando entra en pantalla.
 *
 * Cada bloque observa el suyo. La versión anterior montaba un solo observador
 * al cambiar de ruta y consultaba el DOM con `querySelectorAll`, pero TanStack
 * actualiza la ubicación **antes** de renderizar el componente nuevo: el
 * observador buscaba nodos que aún no existían y, al navegar con un clic, la
 * página entera quedaba en opacidad cero. Con un ref por bloque el efecto corre
 * exactamente cuando ese elemento se monta, sin depender de la ruta.
 */
export function useRevelar<T extends HTMLElement>(retardo = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (movimientoReducido()) {
      el.classList.add('visible')
      return
    }

    if (retardo) el.style.setProperty('--retardo', `${retardo}ms`)

    const observador = new IntersectionObserver(
      entradas => {
        if (!entradas[0]?.isIntersecting) return
        el.classList.add('visible')
        observador.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    observador.observe(el)
    return () => observador.disconnect()
  }, [retardo])

  return ref
}

/**
 * Cuenta un número hacia arriba al entrar en pantalla.
 *
 * Sólo anima la parte numérica: valores como «RM» o «100%» conservan su texto
 * y sólo se les anima el número si lo tienen.
 */
export function useContador(valor: string) {
  const ref = useRef<HTMLElement>(null)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || listo) return

    const numero = valor.match(/\d+/)
    if (!numero || movimientoReducido()) {
      setListo(true)
      return
    }

    const destino = parseInt(numero[0], 10)
    const plantilla = (n: number) => valor.replace(/\d+/, String(n))

    const observador = new IntersectionObserver(entradas => {
      if (!entradas[0]?.isIntersecting) return
      observador.disconnect()

      const duracion = 900
      const inicio = performance.now()

      function paso(ahora: number) {
        const t = Math.min(1, (ahora - inicio) / duracion)
        // Desaceleración: arranca rápido y frena al llegar, como un contador real.
        const suave = 1 - Math.pow(1 - t, 3)
        if (el) el.textContent = plantilla(Math.round(destino * suave))
        if (t < 1) requestAnimationFrame(paso)
        else setListo(true)
      }
      requestAnimationFrame(paso)
    }, { threshold: 0.4 })

    observador.observe(el)
    return () => observador.disconnect()
  }, [valor, listo])

  return ref
}

/**
 * Desplaza la foto del hero más lento que la página.
 *
 * Se mueve la imagen y no el contenedor, para no arrastrar el texto. El factor
 * es bajo a propósito: un parallax marcado en un hero se nota como truco.
 */
export function useParallax<T extends HTMLElement>(factor = 0.18) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || movimientoReducido()) return

    let pendiente = false
    function alDesplazar() {
      if (pendiente) return
      pendiente = true
      requestAnimationFrame(() => {
        pendiente = false
        const y = window.scrollY
        if (el && y < window.innerHeight * 1.2) {
          el.style.transform = `translate3d(0, ${y * factor}px, 0)`
        }
      })
    }

    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [factor])

  return ref
}
