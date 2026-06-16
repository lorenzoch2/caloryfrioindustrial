import { useCallback, useEffect } from 'react'

interface GalleryCarouselProps {
  images: string[]
  label: string
  currentIndex: number
  onCurrentIndexChange: (index: number) => void
}

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

  const goTo = useCallback((index: number) => {
    const len = images.length
    if (len === 0) return
    onCurrentIndexChange(((index % len) + len) % len)
  }, [images.length, onCurrentIndexChange])

  const goNext = useCallback(() => goTo(current + 1), [goTo, current])
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goPrev, goNext])

  if (images.length === 0) {
    return (
      <div className="carousel-empty">
        <p>Sin imágenes aún — agregue fotos en <code>src/images/{label}/</code></p>
      </div>
    )
  }

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <img
          className="carousel-img"
          src={images[current]}
          alt={`${label} — foto ${current + 1} de ${images.length}`}
          loading="lazy"
          draggable={false}
        />
      </div>

      <button className="carousel-btn carousel-btn-prev" onClick={goPrev} aria-label="Anterior">
        {iconPrev}
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={goNext} aria-label="Siguiente">
        {iconNext}
      </button>

      <div className="carousel-footer">
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => onCurrentIndexChange(i)}
              aria-label={`Ir a foto ${i + 1}`}
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
