import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  /*
    El año del pie se resuelve al compilar, no al ejecutar.

    Con `new Date().getFullYear()` dentro del componente, el valor se calculaba
    dos veces y sobre relojes distintos: la función de Netlify corre en UTC y el
    visitante está en Chile. El 31 de diciembre después de las 21:00 el servidor
    ya dice 2027 y el navegador todavía 2026, y React reporta un desajuste de
    hidratación. Como constante de compilación, el servidor y el cliente reciben
    el mismo literal y el desajuste no puede ocurrir. Se actualiza en cada
    despliegue.
  */
  define: {
    // `define` sustituye texto, así que el valor va serializado. Con el número
    // crudo la sustitución no se aplica y queda `__ANIO_COMPILACION__ is not
    // defined` en tiempo de ejecución.
    __ANIO_COMPILACION__: JSON.stringify(new Date().getFullYear()),
  },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    netlify({
      dev: {
        // La emulación local de edge functions corre sobre Deno y añade entre 12
        // y 36 segundos por petición en esta máquina, lo que deja el servidor de
        // desarrollo inservible. La función se despliega y corre igual en
        // producción; sólo se apaga su emulación aquí.
        //
        // Para verificarla en local, poner `enabled: true` y comprobar las
        // cabeceras con:
        //   curl -s -D - -o /dev/null http://localhost:3000/
        edgeFunctions: { enabled: false },
        // El proyecto no usa base de datos y su arranque local falla en cada
        // inicio con "RuntimeError: unreachable".
        database: { enabled: false },
      },
    }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
