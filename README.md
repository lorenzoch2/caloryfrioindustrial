# Calor & Frío Industrial — Sitio corporativo

Sitio de **Calor y Frío Industrial SpA**, empresa chilena de ingeniería en climatización,
refrigeración industrial y ventilación.

## Tecnologías

- [TanStack Start](https://tanstack.com/start) (React 19 con SSR)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- Desplegado en [Netlify](https://netlify.com) — https://caloryfrioindustrial.cl

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck
```

> El repositorio vive dentro de una carpeta sincronizada por OneDrive, lo que hace que un arranque
> en frío tarde cerca de dos minutos. Moverlo fuera de OneDrive lo deja en segundos.

## Cabeceras de seguridad

Las declaradas en `netlify.toml` sólo alcanzan a los archivos estáticos del CDN: el HTML lo emite la
función SSR y no pasa por esa capa. Por eso existe `netlify/edge-functions/security-headers.ts`, que
corre por delante del origen y las fija en **toda** respuesta.

Su emulación local está **apagada** en `vite.config.ts`: corre sobre Deno y añadía entre 12 y 36
segundos por petición. La función se despliega y funciona igual en producción. Para verificarla en
local, poner `edgeFunctions: { enabled: true }` en `vite.config.ts` y:

```bash
curl -s -D - -o /dev/null http://localhost:3000/
```

La CSP no se aplica en `localhost` — el servidor de Vite necesita WebSocket y módulos que la
política de producción bloquea. El resto de cabeceras sí, y se pueden comprobar en desarrollo.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Propuesta, selector de segmento, servicios, credenciales, metodología |
| `/servicios/mantenimiento` | Mantención preventiva y correctiva HVAC |
| `/servicios/asesorias` | Asesorías técnicas e Inspección Técnica de Obras |
| `/servicios/capacitaciones` | Capacitación técnica in-company |
| `/sector-publico` | Antecedentes para procesos de compra pública |
| `/empresa` | Equipo, credenciales y antecedentes legales |
| `/contacto` | Formulario y canales directos |

## Dónde se edita el contenido

Casi nunca en el JSX:

| Qué | Archivo |
|---|---|
| RUT, dirección, correo, teléfono, giro | `src/lib/company.ts` |
| Alcance, entregables y público de cada servicio | `src/lib/servicios.ts` |
| Certificaciones, capacidad operativa, metodología, segmentos | `src/lib/credenciales.ts` |
| Colores, tipografía y estilos | `src/styles.css` |

`src/lib/company.ts` debe mantenerse en sincronía con
`Documentos/Mercado Público/01 - Ficha de Proveedor (datos maestros).md`.

## Imágenes

Las galerías se arman solas: cualquier archivo que se deje en
`src/assets/images/{asesorias,capacitaciones,servicios}/` aparece en el carrusel de esa página, y si
una carpeta queda vacía su sección se oculta.

- Proporción recomendada: `16:9`
- Tamaño ideal: `1600 x 900 px`
- Peso: bajo `300 KB`
- Formatos: `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`, `svg`

Las imágenes de portada viven aparte, en `src/assets/hero/`, en dos anchos (1280 y 760) para
`srcset`.

## Formulario de contacto

Usa Netlify Forms. La declaración del formulario está en `public/__forms.html` porque Netlify
detecta formularios escaneando HTML estático y estas páginas se renderizan en el servidor.
**Si se agrega o renombra un campo hay que reflejarlo en los dos archivos**, o el dato se pierde
sin aviso.

En Netlify hay que tener activada la detección de formularios y configurado el correo de aviso.
