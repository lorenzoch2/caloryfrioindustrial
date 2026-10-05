/**
 * Contenido editorial de la portada y de la página de empresa.
 *
 * El sitio habla como empresa: no nombra personas ni publica formación ni
 * trayectoria individual. Lo que distingue el servicio son hechos del propio
 * trabajo — visita previa, mediciones, informe de cierre, equipamiento propio —
 * y eso es lo que vive en este archivo.
 *
 * Regla de contenido: sólo afirmaciones respaldadas por cómo se trabaja de
 * verdad o por un documento de la empresa. Ver AGENTS.md.
 */

export interface Punto {
  titulo: string
  detalle: string
}

/** Razones de contratación, dichas como servicio y no como currículum. */
export const razones: Punto[] = [
  {
    titulo: 'Visita a terreno antes de cotizar',
    detalle: 'Vamos a ver el equipo, medimos y recién entonces entregamos una propuesta con alcance y precio.',
  },
  {
    titulo: 'Un mismo equipo de principio a fin',
    detalle: 'Quien evalúa la instalación dirige la ejecución y firma el informe de cierre.',
  },
  {
    titulo: 'Mediciones que quedan por escrito',
    detalle: 'Presiones, temperaturas y consumo quedan en un informe con registro fotográfico de antes y después.',
  },
  {
    titulo: 'Instrumental y herramienta propia',
    detalle: 'Medición, soldadura, vacío y carga con equipamiento propio: la ejecución se programa cuando el cliente la necesita.',
  },
  {
    titulo: 'Manejo de refrigerante según norma',
    detalle: 'Recuperación, vacío y carga según especificación del fabricante, incluidos refrigerantes inflamables y CO₂.',
  },
  {
    titulo: 'Contrato periódico o por evento',
    detalle: 'Contrato de mantención para instalaciones críticas y atención puntual para el resto. Boleta o factura electrónica.',
  },
]

/** Cómo se trabaja, del primer contacto al cierre. */
export const metodologia: Punto[] = [
  { titulo: 'Levantamiento en terreno', detalle: 'Inspección del sistema, registro de equipos, estado y condiciones de operación, con respaldo fotográfico.' },
  { titulo: 'Diagnóstico técnico', detalle: 'Evaluación de estado, identificación de puntos críticos y verificación de cumplimiento normativo aplicable.' },
  { titulo: 'Plan de trabajo', detalle: 'Actividades, frecuencias, repuestos e insumos, y programa de ejecución acordado con la contraparte técnica.' },
  { titulo: 'Ejecución', detalle: 'Trabajos bajo protocolo y normas de seguridad, coordinando accesos y ventanas de intervención para mantener la operación en marcha.' },
  { titulo: 'Verificación y entrega', detalle: 'Pruebas de funcionamiento, mediciones de parámetros e informe de cierre con registro de antes y después.' },
  { titulo: 'Respaldo posterior', detalle: 'Recomendaciones por escrito y disponibilidad para consultas durante el período de garantía ofertado.' },
]

/**
 * Equipamiento propio con que se llega a terreno.
 * Fuente: `INVENTARIO EXISTENTE JUNIO 2026.xlsx`.
 */
export const equipamiento: Punto[] = [
  {
    titulo: 'Soldadura oxiacetilénica',
    detalle: '3 equipos HARRIS, con tubos de oxígeno y acetileno fijos y portátiles.',
  },
  {
    titulo: 'Instrumentación de medición',
    detalle: 'Termómetro industrial e infrarrojo Fluke, anemómetro CPS AM50 y multitester.',
  },
  {
    titulo: 'Vacío y carga',
    detalle: 'Bomba de vacío DOSIVAC, árboles de carga y tubo de nitrógeno.',
  },
  {
    titulo: 'Refrigerantes en existencia',
    detalle: 'R-22, R-404A, R-407C, R-410A, R-507 y R-245FA.',
  },
]

/** Lo que preguntan antes de contratar, respondido en una línea. */
export const preguntas: Punto[] = [
  {
    titulo: '¿Cada cuánto conviene hacer mantención?',
    detalle: 'En casas y oficinas, una o dos veces al año. En equipos de operación continua —cámaras de frío, salas de máquinas, salas técnicas— la frecuencia se fija por horas de uso y criticidad, y suele ser trimestral o mensual.',
  },
  {
    titulo: '¿Atienden hogares o sólo empresas?',
    detalle: 'Las dos cosas. Un split domiciliario y una sala de máquinas se trabajan con el mismo procedimiento: cambia la escala, no el método.',
  },
  {
    titulo: '¿Qué incluye la visita técnica?',
    detalle: 'Inspección del equipo, registro de su estado y de las condiciones de operación, mediciones y respaldo fotográfico. Con eso se arma la propuesta.',
  },
  {
    titulo: '¿Trabajan con contrato o por trabajo puntual?',
    detalle: 'Las dos formas. El contrato periódico conviene donde una parada cuesta producción; la atención por evento, para requerimientos puntuales.',
  },
  {
    titulo: '¿En qué zona trabajan?',
    detalle: 'Región Metropolitana de Santiago y alrededores. Para trabajos fuera de la región, se evalúa caso a caso.',
  },
  {
    titulo: '¿Emiten boleta y factura?',
    detalle: 'Sí, ambas en formato electrónico. Para empresas y comunidades emitimos factura con la orden de compra que corresponda.',
  },
]

/** Segmentos de comprador. Cada uno llega con un problema distinto. */
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
    id: 'hogar',
    titulo: 'Hogar',
    detalle: 'Instalación y mantención de split e inverter, con boleta y garantía.',
    destino: '/servicios/mantenimiento',
  },
]
