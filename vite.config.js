import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/deploy1/', // 👈 importante, usa el nombre exacto de tu repo
  server: {
    port: 3000,   // 👈 aquí eliges el puerto
    strictPort: true, // si está ocupado, falla en vez de usar otro
  },
  plugins: [react()]
})
