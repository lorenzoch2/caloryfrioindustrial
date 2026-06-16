export type ServiceId = 'asesorias' | 'capacitaciones' | 'servicios'

const serviceImages: Record<ServiceId, string[]> = {
  asesorias: [
    '/images/asesorias/placeholder-01.svg',
    '/images/asesorias/placeholder-02.svg',
    '/images/asesorias/placeholder-03.svg',
  ],
  capacitaciones: [
    '/images/capacitaciones/placeholder-01.svg',
    '/images/capacitaciones/placeholder-02.svg',
  ],
  servicios: [
    '/images/servicios/placeholder-01.svg',
    '/images/servicios/placeholder-02.svg',
    '/images/servicios/placeholder-03.svg',
    '/images/servicios/placeholder-04.svg',
  ],
}

export function getServiceImages(id: ServiceId): string[] {
  return serviceImages[id]
}
