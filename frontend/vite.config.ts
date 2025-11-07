import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          process.env.DOCKER === 'true'
            ? 'http://backend:3000'
            : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      "/data": {
        target:
          process.env.DOCKER === 'true'
            ? 'http://backend:3000'
            : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
