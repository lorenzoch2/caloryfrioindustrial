/**
 * Credenciales, capacidad operativa y antecedentes legales de la empresa.
 *
 * Este contenido existe principalmente para evaluación por terceros —
 * mandantes industriales y comisiones evaluadoras de licitaciones públicas —
 * que necesitan verificar competencia técnica antes de adjudicar.
 *
 * Regla de contenido: sólo hechos respaldados por un documento en la carpeta
 * de la empresa (CV, certificados, inventario, carpeta tributaria).
 *
 * Deliberadamente NO se nombran clientes de terceros. La trayectoria de la
 * dirección técnica es anterior a la constitución de la sociedad; publicar
 * esos nombres aquí sugeriría que son contratos de la SpA. Los nombres van en
 * el CV que se adjunta a los anexos técnicos, que es su lugar correcto.
 */

export interface Credencial {
  titulo: string
  detalle: string
}

/** Formación y certificaciones de la dirección técnica. Fuente: CV Francisco Chacano. */
export const formacionTecnica: Credencial[] = [
  {
    titulo: 'Ingeniería de Ejecución Industrial',
    detalle: 'Universidad Tecnológica Metropolitana (UTEM) — egresado',
  },
  {
    titulo: 'Técnico de Nivel Superior en Refrigeración Industrial',
    detalle: 'INACAP',
  },
  {
    titulo: 'Buenas Prácticas en Refrigeración e Inflamables, Fases I y II',
    detalle: 'Plan de Gestión para la Eliminación de HCFC — Ministerio del Medio Ambiente / DITAR',
  },
  {
    titulo: 'Refrigerante CO₂ y sistemas VRF',
    detalle: 'Entrenamiento en central móvil Danfoss e instalación de Flujo de Refrigerante Variable',
  },
  {
    titulo: 'Compresores de aire a tornillo',
    detalle: 'Ingersoll Rand',
  },
  {
    titulo: 'Comando electroneumático y soldadura oxiacetilénica',
    detalle: 'USACH e INDURA',
  },
]

/** Sectores en que la dirección técnica ha ejercido. Sin nombres de mandantes. */
export const sectoresExperiencia: string[] = [
  'Refrigeración industrial y agroindustria',
  'Retail y cadenas de supermercados',
  'Climatización de precisión en data centers',
  'Educación superior y edificios institucionales',
  'Inspección Técnica de Obras (ITO)',
  'Docencia técnica y relatoría especializada',
]

/**
 * Capacidad operativa instalada. Fuente: `INVENTARIO EXISTENTE JUNIO 2026.xlsx`.
 * Las bases técnicas suelen exigir acreditar herramienta e instrumental propios.
 */
export const capacidadOperativa: Credencial[] = [
  {
    titulo: 'Equipos de soldadura oxiacetilénica',
    detalle: '3 equipos HARRIS, con tubos de oxígeno y acetileno fijos y portátiles',
  },
  {
    titulo: 'Instrumentación de medición',
    detalle: 'Termómetro industrial e infrarrojo Fluke, anemómetro CPS AM50, multitester',
  },
  {
    titulo: 'Equipamiento de vacío y carga',
    detalle: 'Bomba de vacío DOSIVAC, árboles de carga, tubo de nitrógeno',
  },
  {
    titulo: 'Stock de refrigerantes',
    detalle: 'R-22, R-404A, R-407C, R-410A, R-507 y R-245FA en existencia',
  },
]

/**
 * Antecedentes legales y tributarios. Fuente: Carpeta Tributaria Regular,
 * Registro de Empresas y Sociedades, Información Adicional.
 *
 * `pendiente: true` marca lo que aún no está acreditado. Nunca se debe publicar
 * como vigente algo que no lo esté — en una licitación eso es causal de
 * exclusión, no un detalle de redacción.
 */
export interface Antecedente {
  campo: string
  valor: string
  pendiente?: boolean
}

/**
 * Metodología de trabajo. Espeja el apartado del dossier técnico, que es lo que
 * se presenta en el anexo de metodología de una licitación — los dos textos
 * deben decir lo mismo.
 */
export const metodologia: Credencial[] = [
  { titulo: 'Levantamiento en terreno', detalle: 'Inspección del sistema, registro de equipos, estado y condiciones de operación, con respaldo fotográfico.' },
  { titulo: 'Diagnóstico técnico', detalle: 'Evaluación de estado, identificación de puntos críticos y verificación de cumplimiento normativo aplicable.' },
  { titulo: 'Plan de trabajo', detalle: 'Actividades, frecuencias, repuestos e insumos, y programa de ejecución acordado con la contraparte técnica.' },
  { titulo: 'Ejecución', detalle: 'Trabajos bajo protocolo y normas de seguridad, coordinando accesos y ventanas de intervención para mantener la operación en marcha.' },
  { titulo: 'Verificación y entrega', detalle: 'Pruebas de funcionamiento, mediciones de parámetros e informe de cierre con registro de antes y después.' },
  { titulo: 'Respaldo posterior', detalle: 'Recomendaciones por escrito y disponibilidad para consultas durante el período de garantía ofertado.' },
]

/** Segmentos de comprador. Cada uno tiene un riesgo y un contrato distinto. */
export interface Segmento {
  id: string
  titulo: string
  detalle: string
  destino: string
}

export const segmentos: Segmento[] = [
  {
    id: 'industria',
    titulo: 'Industria y agroindustria',
    detalle: 'Cámaras de frío, salas de máquinas y continuidad de producción.',
    destino: '/servicios/mantenimiento',
  },
  {
    id: 'comercio',
    titulo: 'Comercio y edificios',
    detalle: 'Oficinas, retail y comunidades. Contratos de mantención preventiva.',
    destino: '/servicios/mantenimiento',
  },
  {
    id: 'publico',
    titulo: 'Sector público',
    detalle: 'Licitaciones y compras ágiles, con antecedentes a la vista.',
    destino: '/sector-publico',
  },
  {
    id: 'hogar',
    titulo: 'Hogar',
    detalle: 'Instalación y mantención de split e inverter, con boleta y garantía.',
    destino: '/contacto',
  },
]
