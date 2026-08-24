/**
 * Iconos inlineados como componentes.
 *
 * Se dibujan a mano en vez de traer una librería: el sitio usa una docena de
 * iconos y una dependencia de iconos pesa más que todos ellos juntos.
 * Trazo de 1.6 sobre grilla de 24, para que combinen entre sí.
 */

interface IconProps {
  size?: number
}

function stroke(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

export function IconInstagram({ size = 18 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconWhatsApp({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.83L.057 23.885l6.23-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.524-5.206-1.435l-.374-.22-3.875 1.016 1.034-3.78-.242-.388A9.933 9.933 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

export function IconMail({ size = 18 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  )
}

export function IconIndustria({ size = 22 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="M3 21h18" />
      <path d="M5 21V8l6-4v17" />
      <path d="M11 21V10l8 3v8" />
      <path d="M8 12h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}

export function IconComercio({ size = 22 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M8 7h.01" /><path d="M12 7h.01" /><path d="M16 7h.01" />
      <path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />
      <path d="M10 21v-4h4v4" />
    </svg>
  )
}

export function IconPublico({ size = 22 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="M3 21h18" />
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

export function IconHogar({ size = 22 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M9 21v-8h6v8" />
    </svg>
  )
}

export function IconCheck({ size = 18 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  )
}

export function IconFlecha({ size = 18 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function IconArriba({ size = 18 }: IconProps) {
  return (
    <svg {...stroke(size)}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  )
}
