import type { ServiceId } from './images'

/**
 * Contenido de las tres líneas de servicio.
 *
 * Cada una tiene su propia página y su propio objetivo de búsqueda. El `alcance`
 * no es relleno: es lo que un jefe de mantención o una comisión evaluadora lee
 * para decidir si sabemos de qué estamos hablando, y es lo que se pega en el
 * anexo técnico de una licitación. Mantenerlo específico y verificable.
 */

export interface Servicio {
  /** Segmento de URL bajo /servicios/ */
  slug: 'mantenimiento' | 'asesorias' | 'capacitaciones'
  /** Carpeta de imágenes en src/assets/images/ */
  galeria: ServiceId
  navLabel: string
  titulo: string
  tituloPagina: string
  metaDescription: string
  eyebrow: string
  bajada: string
  intro: string
  alcance: { titulo: string; detalle: string }[]
  entregables: string[]
  paraQuien: string[]
}

export const servicios: Servicio[] = [
  {
    slug: 'mantenimiento',
    galeria: 'servicios',
    navLabel: 'Mantención',
    titulo: 'Mantención HVAC y refrigeración',
    tituloPagina: 'Mantención de aire acondicionado y refrigeración industrial · Santiago',
    metaDescription:
      'Mantención preventiva y correctiva de sistemas de climatización y refrigeración industrial en la Región Metropolitana. Con contrato o por evento, para industria, comercio, edificios y hogar.',
    eyebrow: 'Servicios · 01',
    bajada: 'Preventiva y correctiva, con contrato o por evento.',
    intro:
      'Un equipo de frío rara vez falla de golpe: se degrada durante meses y avisa en el consumo, en las presiones y en el ruido. La mantención preventiva existe para leer esas señales antes de que se conviertan en una parada. Trabajamos con contrato periódico para instalaciones críticas y por evento para requerimientos puntuales.',
    alcance: [
      { titulo: 'Limpieza y sanitización', detalle: 'Evaporadores, condensadores, filtros y bandejas de condensado.' },
      { titulo: 'Medición de parámetros', detalle: 'Presiones de alta y baja, sobrecalentamiento, subenfriamiento y temperaturas de operación.' },
      { titulo: 'Detección y reparación de fugas', detalle: 'Prueba con nitrógeno, localización, reparación por soldadura y verificación de estanqueidad.' },
      { titulo: 'Manejo de refrigerante', detalle: 'Recuperación, vacío y carga según especificación del fabricante.' },
      { titulo: 'Revisión eléctrica', detalle: 'Contactores, protecciones, aislación y consumo por fase.' },
      { titulo: 'Control y regulación', detalle: 'Ajuste de válvulas de expansión, presostatos y elementos de control.' },
      { titulo: 'Drenajes y aislación', detalle: 'Verificación de pendientes, sifones y aislación de líneas.' },
      { titulo: 'Correctivo', detalle: 'Diagnóstico de falla, reemplazo de componentes y puesta en marcha.' },
    ],
    entregables: [
      'Informe de servicio con las mediciones tomadas en terreno',
      'Registro fotográfico de antes y después',
      'Recomendaciones priorizadas por criticidad',
      'Programa de mantención para el período siguiente, en contratos periódicos',
    ],
    paraQuien: [
      'Plantas industriales y agroindustria con cámaras y salas de máquinas',
      'Locales comerciales, retail y oficinas',
      'Comunidades y administraciones de edificios',
      'Hogares con equipos split, multisplit e inverter',
    ],
  },
  {
    slug: 'asesorias',
    galeria: 'asesorias',
    navLabel: 'Asesorías e ITO',
    titulo: 'Asesorías técnicas e Inspección Técnica de Obras',
    tituloPagina: 'Asesoría técnica e ITO de climatización · Santiago',
    metaDescription:
      'Inspección Técnica de Obras (ITO) en climatización, diagnóstico de sistemas existentes, análisis de eficiencia energética y adecuación normativa para infraestructura crítica e industrial.',
    eyebrow: 'Servicios · 02',
    bajada: 'Criterio técnico independiente, con mediciones y no con impresiones.',
    intro:
      'Cuando el que instala es también el que certifica su propio trabajo, el mandante queda sin contraparte. La inspección técnica existe para cerrar esa brecha: revisar lo ejecutado contra lo especificado, medir lo que se puede medir y dejar por escrito lo que falta. También asesoramos antes de comprar, que suele ser más barato que asesorar después.',
    alcance: [
      { titulo: 'Inspección Técnica de Obras', detalle: 'Revisión de la instalación contra especificación y normativa, con planilla de observaciones y seguimiento de levantamiento.' },
      { titulo: 'Diagnóstico de sistemas existentes', detalle: 'Levantamiento de estado, inventario de equipos y evaluación de vida útil remanente.' },
      { titulo: 'Eficiencia energética', detalle: 'Análisis de consumo, identificación de pérdidas y evaluación de alternativas de mejora.' },
      { titulo: 'Adecuación normativa', detalle: 'Revisión frente a la reglamentación aplicable y a las buenas prácticas del rubro.' },
      { titulo: 'Peritaje y segunda opinión', detalle: 'Evaluación independiente ante fallas recurrentes, discrepancias con un contratista o siniestros.' },
      { titulo: 'Especificación técnica', detalle: 'Redacción de requisitos técnicos para compra de equipos o para bases de licitación.' },
    ],
    entregables: [
      'Informe técnico con metodología, mediciones y conclusiones',
      'Planilla de observaciones con estado y responsable',
      'Registro fotográfico referenciado a cada observación',
      'Recomendaciones priorizadas, separando lo urgente de lo deseable',
    ],
    paraQuien: [
      'Mandantes de proyectos de climatización en ejecución',
      'Infraestructura crítica: data centers, salas técnicas, cadena de frío',
      'Administraciones que necesitan una contraparte técnica propia',
      'Organismos públicos que requieren especificación previa a licitar',
    ],
  },
  {
    slug: 'capacitaciones',
    galeria: 'capacitaciones',
    navLabel: 'Capacitaciones',
    titulo: 'Capacitación técnica in-company',
    tituloPagina: 'Capacitación técnica en refrigeración y climatización · Santiago',
    metaDescription:
      'Programas de capacitación técnica in-company en refrigeración y climatización: refrigerantes inflamables, CO₂, sistemas VRF, amoníaco y mantenimiento preventivo, con teoría y práctica en equipo real.',
    eyebrow: 'Servicios · 03',
    bajada: 'En sus dependencias, sobre sus propios equipos.',
    intro:
      'La capacitación que sirve no se hace con diapositivas: se hace frente al equipo que el personal opera todos los días. Nuestros programas se dictan en dependencias del cliente, combinan aula y práctica sobre instalación real, y están a cargo de una dirección técnica con más de una década de docencia en educación superior además del ejercicio en planta.',
    alcance: [
      { titulo: 'Refrigerantes inflamables', detalle: 'Buenas prácticas en refrigeración, manipulación segura y prevención de riesgos.' },
      { titulo: 'Refrigerante CO₂ (R-744)', detalle: 'Fundamentos, particularidades de operación y seguridad en sistemas transcríticos.' },
      { titulo: 'Sistemas VRF', detalle: 'Instalación, puesta en marcha, diagnóstico y mantención.' },
      { titulo: 'Amoníaco (R-717)', detalle: 'Seguridad en sala de máquinas, procedimientos y respuesta ante emergencia.' },
      { titulo: 'Mantenimiento preventivo', detalle: 'Rutinas, registro de parámetros y criterios de detección temprana para equipos de operaciones.' },
      { titulo: 'Electromecánica aplicada', detalle: 'Circuitos de control, protecciones y diagnóstico eléctrico en equipos de frío.' },
    ],
    entregables: [
      'Programa ajustado a los equipos y al nivel del personal',
      'Material de apoyo para cada participante',
      'Evaluación de aprendizaje',
      'Certificado de asistencia y aprobación',
    ],
    paraQuien: [
      'Equipos de operación y mantenimiento de plantas industriales',
      'Personal técnico de empresas de servicio',
      'Áreas de prevención de riesgos que deben acreditar competencias',
      'Instituciones de formación técnica',
    ],
  },
]

export function getServicio(slug: Servicio['slug']): Servicio {
  const servicio = servicios.find(item => item.slug === slug)
  if (!servicio) throw new Error(`Servicio desconocido: ${slug}`)
  return servicio
}
