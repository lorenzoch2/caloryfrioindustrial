import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { company } from '../lib/company'
import { servicios } from '../lib/servicios'

const enlaces = [
  ...servicios.map(servicio => ({
    to: `/servicios/${servicio.slug}`,
    label: servicio.navLabel,
  })),
  { to: '/sector-publico', label: 'Sector Público' },
  { to: '/empresa', label: 'Empresa' },
]

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  )
}

export function SiteHeader() {
  const [abierto, setAbierto] = useState(false)
  const pathname = useRouterState({ select: state => state.location.pathname })

  // Cerrar el panel al navegar: sin esto queda abierto sobre la página nueva.
  useEffect(() => { setAbierto(false) }, [pathname])

  // Con el panel abierto, el fondo no debe desplazarse bajo él.
  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previo }
  }, [abierto])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="marca" aria-label={`${company.nombreFantasia} — inicio`}>
          <img src="/marca-clara.png" alt="" width={34} height={34} />
          <span className="marca-texto">
            <span className="marca-nombre">Calor &amp; Frío Industrial</span>
            <span className="marca-bajada">Ingeniería térmica</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Principal">
          {enlaces.map(enlace => (
            <Link
              key={enlace.to}
              to={enlace.to}
              className="nav-link"
              activeProps={{ className: 'nav-link nav-link--activo' }}
            >
              {enlace.label}
            </Link>
          ))}
          <Link to="/contacto" className="btn btn-primario btn-sm">Contacto</Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setAbierto(valor => !valor)}
          aria-expanded={abierto}
          aria-controls="nav-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {abierto && (
        <div className="nav-movil" id="nav-movil">
          {enlaces.map(enlace => (
            <Link
              key={enlace.to}
              to={enlace.to}
              className="nav-movil-link"
              activeProps={{ className: 'nav-movil-link nav-movil-link--activo' }}
            >
              {enlace.label}
            </Link>
          ))}
          <Link to="/contacto" className="btn btn-primario nav-movil-cta">Contacto</Link>
        </div>
      )}
    </header>
  )
}
