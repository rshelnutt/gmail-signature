import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const domain = isProd ? 'ba-sig.robshelnutt.com' : 'localhost:5173'
  const authApiUrl = isProd ? `https://${domain}/auth` : 'http://localhost:3001/auth'

  process.env.VITE_AUTH_API_URL = authApiUrl

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      cors: true
    }
  }
})
