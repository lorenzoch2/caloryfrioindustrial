export type ServiceId = 'asesorias' | 'capacitaciones' | 'servicios'

const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const serviceFolders: Record<ServiceId, string> = {
  asesorias: '../assets/images/asesorias',
  capacitaciones: '../assets/images/capacitaciones',
  servicios: '../assets/images/servicios',
}

const aboutFolder = '../assets/images/sobre nosotros'

export function getServiceImages(id: ServiceId): string[] {
  const folder = serviceFolders[id]

  return Object.keys(imageModules)
    .filter(path => path.startsWith(`${folder}/`))
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map(path => imageModules[path])
}

export function getAboutImage(): string | undefined {
  const path = Object.keys(imageModules)
    .filter(imagePath => imagePath.startsWith(`${aboutFolder}/`))
    .sort((a, b) => a.localeCompare(b, 'es'))[0]

  return path ? imageModules[path] : undefined
}
