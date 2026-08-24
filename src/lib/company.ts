/**
 * Fuente única de verdad de los datos corporativos.
 *
 * Todo dato de identificación, contacto o antecedente legal de la empresa se
 * declara aquí y se consume desde las vistas. Si un dato cambia (correo,
 * teléfono, ID de ChileProveedores), se cambia en este archivo y en ningún otro.
 *
 * Los valores deben coincidir exactamente con `Documentos/Información Adicional.txt`
 * y con la Ficha de Proveedor usada en Mercado Público.
 */

export const company = {
  razonSocial: 'Calor y Frío Industrial SpA',
  nombreFantasia: 'Calor & Frío Industrial',
  rut: '78.333.185-3',
  giro: 'Instalaciones de gasfitería, calefacción y aire acondicionado',
  codigoActividad: '432200',
  tipoSociedad: 'Sociedad por Acciones (SpA)',
  regimenTributario: 'Régimen Pro Pyme General (14 D)',
  inicioActividades: '2026-01-12',
  representanteLegal: 'Lorenzo Chacano Muñoz',
  direccionTecnica: 'Francisco Chacano Jara',

  domicilio: {
    calle: 'Zanzibar Oriente 7473',
    comuna: 'Las Condes',
    ciudad: 'Santiago',
    region: 'Región Metropolitana',
    pais: 'Chile',
    codigoPais: 'CL',
  },

  contacto: {
    email: 'contacto@caloryfrioindustrial.cl',
    telefono: '+56991389110',
    telefonoDisplay: '+56 9 9138 9110',
    whatsapp: 'https://wa.me/message/5NJEUAL5M6GTK1',
    instagram: 'https://www.instagram.com/caloryfrioindustrial',
    instagramHandle: '@caloryfrioindustrial',
  },

  sitio: {
    url: 'https://caloryfrioindustrial.cl',
    dominio: 'caloryfrioindustrial.cl',
  },

  areaServicio: 'Región Metropolitana de Santiago y alrededores',
} as const

export const domicilioLinea = [
  company.domicilio.calle,
  company.domicilio.comuna,
  company.domicilio.ciudad,
].join(', ')

/**
 * Datos estructurados schema.org.
 *
 * Sólo se declaran hechos verificables contra los documentos de la empresa.
 * No se incluyen `geo` ni `openingHours` porque no hay un dato confirmado que
 * los respalde — es preferible omitirlos a inventarlos.
 */
export function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${company.sitio.url}/#organizacion`,
    name: company.nombreFantasia,
    legalName: company.razonSocial,
    url: company.sitio.url,
    logo: `${company.sitio.url}/logo.png`,
    image: `${company.sitio.url}/logo.png`,
    email: company.contacto.email,
    telephone: company.contacto.telefono,
    taxID: company.rut,
    vatID: company.rut,
    foundingDate: company.inicioActividades,
    founder: {
      '@type': 'Person',
      name: company.representanteLegal,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.domicilio.calle,
      addressLocality: company.domicilio.comuna,
      addressRegion: company.domicilio.region,
      addressCountry: company.domicilio.codigoPais,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: company.areaServicio,
    },
    sameAs: [company.contacto.instagram],
    knowsAbout: [
      'Climatización HVAC',
      'Refrigeración industrial',
      'Ventilación',
      'Inspección Técnica de Obras (ITO)',
      'Eficiencia energética',
      'Refrigerantes CO2 y sistemas VRF',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: [
        'Asesorías e Inspección Técnica de Obras',
        'Capacitaciones técnicas in-company',
        'Mantenimiento preventivo y correctivo HVAC',
      ].map(nombre => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: nombre },
      })),
    },
  }
}
