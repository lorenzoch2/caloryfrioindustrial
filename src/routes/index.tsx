import { useEffect, useState, type ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { GalleryCarousel } from '../components/GalleryCarousel'
import { getAboutImage, getServiceImages } from '../lib/images'

export const Route = createFileRoute('/')({
  component: MarketingPage,
})

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.83L.057 23.885l6.23-1.634A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.524-5.206-1.435l-.374-.22-3.875 1.016 1.034-3.78-.242-.388A9.933 9.933 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  )
}

function IconArrowUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  )
}

// ─── Decorative yin-yang orb (mirrors the logo symbol) ───────────────────────

function OrbDecor({ size = 420 }: { size?: number }) {
  const r = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx={r} cy={r} r={r} />
        </clipPath>
        <radialGradient id="steelGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#6b8fc4" />
          <stop offset="100%" stopColor="#3a5880" />
        </radialGradient>
        <radialGradient id="inkGrad" cx="60%" cy="60%">
          <stop offset="0%" stopColor="#2c3240" />
          <stop offset="100%" stopColor="#14181f" />
        </radialGradient>
      </defs>
      <g clipPath="url(#circleClip)">
        {/* Dark left half */}
        <path d={`M${r},0 A${r},${r} 0 0,0 ${r},${size} Z`} fill="url(#inkGrad)" />
        {/* Steel right half */}
        <path d={`M${r},0 A${r},${r} 0 0,1 ${r},${size} Z`} fill="url(#steelGrad)" />
        {/* Small steel circle top */}
        <circle cx={r} cy={r / 2} r={r / 2} fill="url(#steelGrad)" />
        {/* Small dark circle bottom */}
        <circle cx={r} cy={r * 1.5} r={r / 2} fill="url(#inkGrad)" />
        {/* Tiny dark dot top */}
        <circle cx={r} cy={r / 2} r={r / 8} fill="url(#inkGrad)" />
        {/* Tiny steel dot bottom */}
        <circle cx={r} cy={r * 1.5} r={r / 8} fill="url(#steelGrad)" />
      </g>
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="rgba(79,115,168,0.2)" strokeWidth="1" />
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

type ServiceId = 'asesorias' | 'capacitaciones' | 'servicios'

function MarketingPage() {
  const [openGallery, setOpenGallery] = useState<ServiceId>('asesorias')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [galleryIndexByService, setGalleryIndexByService] = useState<Record<ServiceId, number>>({
    asesorias: 0,
    capacitaciones: 0,
    servicios: 0,
  })

  const services: Array<{
    id: ServiceId
    title: string
    icon: ReactNode
    description: string
  }> = [
    {
      id: 'asesorias',
      title: 'Asesorías',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      description: 'Consultoría técnica de alto nivel e Inspección Técnica de Obras (ITO). Optimizamos la eficiencia energética y la adecuación normativa de sistemas HVAC, refrigeración industrial y climatización de precisión para infraestructura crítica y comercial. Profesionalismo y seguridad técnica garantizada.',
    },
    {
      id: 'capacitaciones',
      title: 'Capacitaciones',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      description: 'Programas de formación in-company liderados por expertos. Capacitamos a equipos de mantenimiento en el uso seguro de tecnologías de vanguardia (CO2/VRF), bajo un enfoque práctico orientado a la prevención de riesgos y la mejora continua de procesos.',
    },
    {
      id: 'servicios',
      title: 'Servicios',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      description: 'Mantenimiento integral, preventivo y correctivo, para sistemas de frío y climatización. Aseguramos la continuidad operacional en instalaciones industriales y confort climático en hogares o locales. Soluciones técnicas avanzadas con respuesta rápida, adaptadas a clientes corporativos y particulares.',
    },
  ]

  const activeService = services.find(service => service.id === openGallery) ?? services[0]
  const aboutImage = getAboutImage()
  const serviceImages = getServiceImages(openGallery)
  const currentGalleryIndex = galleryIndexByService[openGallery] ?? 0

  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.6)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToSection(id: string) {
    const target = document.getElementById(id)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      <nav className="site-nav" aria-label="Secciones">
        <button type="button" className="site-nav-link" onClick={() => scrollToSection('top')}>Inicio</button>
        <button type="button" className="site-nav-link" onClick={() => scrollToSection('about')}>Sobre Nosotros</button>
        <button type="button" className="site-nav-link" onClick={() => scrollToSection('services')}>Servicios</button>
        <button type="button" className="site-nav-link" onClick={() => scrollToSection('contact')}>Contacto</button>
      </nav>

      {showBackToTop && (
        <button type="button" className="back-to-top" onClick={() => scrollToSection('top')} aria-label="Volver arriba">
          <IconArrowUp />
        </button>
      )}

      {/* ── Background ambient glows ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-15%', right: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,115,168,0.10) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,115,168,0.07) 0%, transparent 65%)',
        }} />
      </div>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section
        id="top"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          justifyItems: 'center',
          padding: '0 1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Large decorative orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.07,
          }}
        >
          <OrbDecor size={640} />
        </div>

        <div
          className="fade-up"
          style={{
            textAlign: 'center',
            maxWidth: 720,
            padding: '2rem 0',
          }}
        >
          {/* Logo */}
          <div className="fade-up delay-1" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/logo.png"
              alt="Calor & Frío Industrial"
              style={{
                width: 'clamp(200px, 26vw, 300px)',
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          {/* Eyebrow */}
          <p
            className="fade-up delay-2"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--steel-dk)',
              marginBottom: '1.25rem',
            }}
          >
            Soluciones Térmicas Integrales
          </p>

          {/* Headline */}
          <h1
            className="fade-up delay-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginBottom: '1.75rem',
            }}
          >
            Calor & Frío
            <br />
            <em style={{ color: 'var(--steel)', fontStyle: 'italic' }}>Industrial</em>
          </h1>

          {/* Sub */}
          <p
            className="fade-up delay-3"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              letterSpacing: '0.06em',
              color: 'var(--text-mut)',
              marginBottom: '3rem',
              lineHeight: 1.8,
            }}
          >
            Asesorías · Capacitaciones · Servicios
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOBRE NOSOTROS
      ════════════════════════════════════ */}
      <section
        id="about"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(4rem, 4vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span className="rule" />
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--steel-dk)',
          }}>
            Sobre Nosotros
          </p>
        </div>

        <div className="about-block">
          {aboutImage && (
            <div className="about-media">
              <img src={aboutImage} alt="Sobre nosotros" className="about-image" />
            </div>
          )}
          <div className="about-copy">
            <p>Somos una empresa de ingeniería especializada en el mantenimiento, diseño y optimización de sistemas térmicos industriales y comerciales. Nacidos en 2026, atendemos con la misma rigurosidad técnica a grandes clientes industriales y corporativos como a familias y comercios que buscan soluciones de confianza para sus hogares o negocios. Contamos con una dirección técnica de más de 30 años de trayectoria en el sector HVAC y refrigeración industrial.</p>
            <p>Nuestra propuesta de valor se fundamenta en la excelencia técnica, el cumplimiento normativo y la sostenibilidad operativa. Como proveedores de servicios integrales, nos enfocamos en garantizar la continuidad operacional de sus infraestructuras críticas, ofreciendo soluciones que integran desde la inspección técnica y consultoría, hasta la capacitación especializada de su personal.</p>
            <p>Ya sea mediante proyectos de alta complejidad técnica o servicios especializados de mantención domiciliaria; entregamos respaldo estratégico para que sus sistemas operen con la máxima eficiencia energética y seguridad técnica.</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICIOS
      ════════════════════════════════════ */}
      <section
        id="services"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <span className="rule" />
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--steel-dk)',
          }}>
            Lo que hacemos
          </p>
        </div>

        <div className="service-switcher">
          <div className="service-tabs" role="tablist" aria-label="Servicios">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={openGallery === service.id}
                aria-controls="service-panel"
                tabIndex={openGallery === service.id ? 0 : -1}
                className={`service-tab${openGallery === service.id ? ' active' : ''}`}
                onClick={() => setOpenGallery(service.id)}
                onKeyDown={e => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault()
                    setOpenGallery(services[(index + 1) % services.length].id)
                  }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    setOpenGallery(services[(index - 1 + services.length) % services.length].id)
                  }
                }}
              >
                {service.title}
              </button>
            ))}
          </div>

          <div className="service-panel carousel-enter" id="service-panel" role="tabpanel" aria-label={activeService.title}>
            <div className={`service-panel-grid${serviceImages.length === 0 ? ' service-panel-grid--copy-only' : ''}`}>
              {serviceImages.length > 0 && (
                <GalleryCarousel
                  images={serviceImages}
                  label={openGallery}
                  currentIndex={currentGalleryIndex}
                  onCurrentIndexChange={(index) => {
                    setGalleryIndexByService(prev => ({
                      ...prev,
                      [openGallery]: index,
                    }))
                  }}
                />
              )}
              <div className="service-panel-copy">
                <div className="service-panel-heading">
                  <div className="service-panel-icon">{activeService.icon}</div>
                  <h3>{activeService.title}</h3>
                </div>
                <p>{activeService.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTACT STRIP
      ════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 5rem)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            color: 'var(--ink)',
            lineHeight: 1.15,
          }}>
            ¿Listo para optimizar<br />
            <em style={{ color: 'var(--steel)' }}>su operación térmica?</em>
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
          {/* CTA buttons */}
          <div
            className="fade-up delay-4"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://wa.me/message/5NJEUAL5M6GTK1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <IconWhatsApp />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/caloryfrioindustrial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <IconInstagram />
              Instagram
            </a>
            <a
              href="mailto:contacto@caloryfrioindustrial.cl"
              className="btn btn-ghost"
            >
              <IconMail />
              Correo
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 6vw, 5rem)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/logo.png"
            alt="Calor & Frío Industrial"
            style={{
              height: 40,
              mixBlendMode: 'multiply',
              opacity: 0.9,
            }}
          />
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
          }}>
            Soluciones Térmicas Integrales
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a
            href="https://www.instagram.com/caloryfrioindustrial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              color: 'var(--text-faint)',
              transition: 'color 0.2s ease',
              display: 'flex',
            }}
          >
            <IconInstagram />
          </a>
          <a
            href="https://wa.me/message/5NJEUAL5M6GTK1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              color: 'var(--text-faint)',
              transition: 'color 0.2s ease',
              display: 'flex',
            }}
          >
            <IconWhatsApp />
          </a>
          <a
            href="mailto:contacto@caloryfrioindustrial.cl"
            aria-label="Email"
            style={{
              color: 'var(--text-faint)',
              transition: 'color 0.2s ease',
              display: 'flex',
            }}
          >
            <IconMail />
          </a>
        </div>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.63rem',
          color: 'var(--text-faint)',
          letterSpacing: '0.08em',
          width: '100%',
          textAlign: 'center',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(79,115,168,0.1)',
        }}>
          © {new Date().getFullYear()} Calor y Frío Industrial SpA. Todos los derechos reservados. R.U.T. 78.333.185-3 | Zanzibar Oriente 7473, Las Condes, Santiago
        </p>
      </footer>
    </main>
  )
}
