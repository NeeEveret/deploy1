import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/deploy1/', // 👈 importante, usa el nombre exacto de tu repo
})
