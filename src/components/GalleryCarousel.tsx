import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { movimientoReducido } from '../lib/movimiento'

interface GalleryCarouselProps {
  images: string[]
  label: string
  currentIndex: number
  onCurrentIndexChange: (index: number) => void
}

/** Cada cuánto avanza solo, cuando está a la vista y nadie lo está tocando. */
const INTERVALO = 6000

const iconPrev = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const iconNext = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function GalleryCarousel({ images, label, currentIndex, onCurrentIndexChange }: GalleryCarouselProps) {
  const current = images.length === 0 ? 0 : Math.min(currentIndex, images.length - 1)
  const contenedor = useRef<HTMLDivElement>(null)
  const [aLaVista, setALaVista] = useState(false)
  const [pausado, setPausado] = useState(false)

  const goTo = useCallback((index: number) => {
    const len = images.length
    if (len === 0) return
    onCurrentIndexChange(((index % len) + len) % len)
  }, [images.length, onCurrentIndexChange])

  const goNext = useCallback(() => goTo(current + 1), [goTo, current])
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current])

  // Sólo cuenta como "a la vista" con medio carrusel dentro: avanzar mientras
  // asoma por el borde sería movimiento que nadie está mirando.
  useEffect(() => {
    const el = contenedor.current
    if (!el) return
    const observador = new IntersectionObserver(
      entradas => setALaVista(Boolean(entradas[0]?.isIntersecting)),
      { threshold: 0.5 },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  /*
    El temporizador depende de `current`, así que cualquier avance —automático o
    a mano— lo reinicia. Sin eso, tocar la flecha justo antes de un salto
    automático encadenaría dos deslizamientos seguidos.
  */
  useEffect(() => {
    if (!aLaVista || pausado || images.length < 2 || movimientoReducido()) return
    const t = setTimeout(goNext, INTERVALO)
    return () => clearTimeout(t)
  }, [aLaVista, pausado, current, images.length, goNext])

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    if (e.key === 'ArrowLeft') goPrev()
    else goNext()
  }

  if (images.length === 0) {
    return (
      <div className="carousel-empty">
        <p>Sin imágenes aún — agregue fotos en <code>src/assets/images/{label}/</code></p>
      </div>
    )
  }

  return (
    <div
      ref={contenedor}
      className="carousel"
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Galería de ${label}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      // Se detiene mientras alguien lo mira de cerca o lo está manejando.
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-pista"
          style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
        >
          {images.map((src, i) => (
            <div
              className="carousel-slide"
              key={src}
              aria-hidden={i !== current}
              // Fuera de la vista no debe ser alcanzable con el tabulador.
              inert={i !== current}
            >
              <img
                src={src}
                alt={`${label} — foto ${i + 1} de ${images.length}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn carousel-btn-prev" onClick={goPrev} aria-label="Anterior">
        {iconPrev}
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={goNext} aria-label="Siguiente">
        {iconNext}
      </button>

      <div className="carousel-footer">
        <div className="carousel-dots">
          {images.map((src, i) => (
            <button
              key={src}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => onCurrentIndexChange(i)}
              aria-label={`Ir a foto ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
        <span className="carousel-counter">
          {current + 1} / {images.length}
        </span>
      </div>
    </div>
  )
}
