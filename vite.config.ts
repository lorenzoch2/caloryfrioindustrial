import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
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
