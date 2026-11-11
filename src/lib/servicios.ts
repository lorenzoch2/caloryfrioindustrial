import type { ServiceId } from './images'

/**
 * Contenido de las tres líneas de servicio.
 *
 * Cada una tiene su propia página y su propio objetivo de búsqueda. El `alcance`
 * no es relleno: es lo que un jefe de mantención o un administrador de edificio
 * lee para decidir si sabemos de qué estamos hablando. Mantenerlo específico y
 * verificable.
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
    titulo: 'Instalación y mantención',
    tituloPagina: 'Mantención de aire acondicionado · Santiago',
    metaDescription:
      'Instalación, recambio y mantención de climatización y refrigeración en la Región Metropolitana. Con contrato o por evento, para industria, comercio y hogar.',
    eyebrow: 'Servicios · 01',
    bajada: 'Instalación, recambio y mantención, con contrato o por evento.',
    intro:
      'Instalamos equipos nuevos, ejecutamos recambios y mantenemos instalaciones en operación. La degradación de un equipo de frío es progresiva y se manifiesta en el consumo eléctrico, en las presiones de trabajo y en el nivel sonoro antes de producir una detención. La mantención preventiva registra esos parámetros en cada visita y los contrasta con los de la anterior. Trabajamos con contrato periódico en instalaciones críticas y por evento en requerimientos puntuales.',
    alcance: [
      { titulo: 'Instalación y puesta en marcha', detalle: 'Montaje de unidad interior y exterior, líneas de refrigerante, conexión eléctrica, vacío y puesta en marcha.' },
      { titulo: 'Recambio de equipos', detalle: 'Recuperación de refrigerante, desmontaje del equipo existente, traslado e instalación del nuevo.' },
      { titulo: 'Sistemas VRF', detalle: 'Instalación, diseño y selección, y servicio de sistemas de caudal de refrigerante variable, con el equipo acreditado por la Academia HVAC de LG Chile en la línea Multi V.' },
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
    tituloPagina: 'Asesoría técnica e ITO · Santiago',
    metaDescription:
      'Inspección Técnica de Obras en climatización, diagnóstico de sistemas existentes, eficiencia energética y adecuación normativa en la Región Metropolitana.',
    eyebrow: 'Servicios · 02',
    bajada: 'Criterio técnico independiente, con mediciones que quedan por escrito.',
    intro:
      'La inspección técnica de obras verifica lo ejecutado contra lo especificado, mide los parámetros de operación y registra por escrito las observaciones pendientes, con un responsable y un plazo para cada una. Constituye la contraparte técnica del mandante frente a quien ejecuta la obra. Asesoramos además en la etapa previa a la compra: especificación de los equipos y comparación de propuestas.',
    alcance: [
      { titulo: 'Inspección Técnica de Obras', detalle: 'Revisión de la instalación contra especificación y normativa, con planilla de observaciones y seguimiento de levantamiento.' },
      { titulo: 'Diagnóstico de sistemas existentes', detalle: 'Levantamiento de estado, inventario de equipos y evaluación de vida útil remanente.' },
      { titulo: 'Eficiencia energética', detalle: 'Análisis de consumo, identificación de pérdidas y evaluación de alternativas de mejora.' },
      { titulo: 'Adecuación normativa', detalle: 'Revisión frente a la reglamentación aplicable y a las buenas prácticas del rubro.' },
      { titulo: 'Peritaje y segunda opinión', detalle: 'Evaluación independiente ante fallas recurrentes, discrepancias con un contratista o siniestros.' },
      { titulo: 'Especificación técnica', detalle: 'Redacción de requisitos técnicos para comprar equipos o para pedir propuestas comparables.' },
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
      'Empresas que necesitan especificar bien antes de comprar',
    ],
  },
  {
    slug: 'capacitaciones',
    galeria: 'capacitaciones',
    navLabel: 'Capacitaciones',
    titulo: 'Capacitación técnica in-company',
    tituloPagina: 'Capacitación técnica en refrigeración · Santiago',
    metaDescription:
      'Capacitación técnica in-company en refrigeración y climatización: refrigerantes inflamables, CO₂, sistemas VRF y amoníaco, con práctica en equipo real.',
    eyebrow: 'Servicios · 03',
    bajada: 'En sus dependencias, sobre sus propios equipos.',
    intro:
      'Los programas se dictan en dependencias del cliente y sobre los equipos que el personal opera. Combinan sesiones de aula y práctica sobre instalación real, y están a cargo de personal con ejercicio en planta y más de una década de docencia técnica en educación superior.',
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
