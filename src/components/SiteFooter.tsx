import { Link } from '@tanstack/react-router'
import { company, domicilioLinea } from '../lib/company'
import { servicios } from '../lib/servicios'
import { IconInstagram, IconMail, IconWhatsApp } from './icons'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-marca">
          <img
            className="footer-logotipo solo-claro"
            src="/lockup-horizontal-claro.svg"
            alt={company.nombreFantasia}
            width={406}
            height={112}
            loading="lazy"
          />
          <img
            className="footer-logotipo solo-oscuro"
            src="/lockup-horizontal.svg"
            alt={company.nombreFantasia}
            width={406}
            height={112}
            loading="lazy"
          />
          <p className="footer-slogan">{company.lema}</p>
          <p className="footer-lema">
            Climatización, refrigeración y ventilación en {company.areaServicio}.
          </p>
          <div className="footer-social">
            <a href={company.contacto.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhatsApp /></a>
            <a href={company.contacto.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
            <a href={`mailto:${company.contacto.email}`} aria-label="Correo"><IconMail /></a>
          </div>
        </div>

        <div className="footer-columna">
          <h2>Servicios</h2>
          <ul>
            {servicios.map(servicio => (
              <li key={servicio.slug}>
                <Link to={`/servicios/${servicio.slug}`}>{servicio.navLabel}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-columna">
          <h2>Empresa</h2>
          <ul>
            <li><Link to="/empresa">Quiénes somos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-columna">
          <h2>Contacto</h2>
          <ul className="footer-datos">
            <li><a href={`mailto:${company.contacto.email}`}>{company.contacto.email}</a></li>
            <li>{company.contacto.telefonoDisplay}</li>
            <li>{domicilioLinea}</li>
          </ul>
        </div>
      </div>

      <div className="site-footer-legal">
        <span>
          © {new Date().getFullYear()} {company.razonSocial} · R.U.T. {company.rut}
        </span>
        <span>Giro {company.codigoActividad} · {company.giro}</span>
      </div>
    </footer>
  )
}
