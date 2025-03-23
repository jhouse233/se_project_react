import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/se_project_react/",
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  }
  // assetsInclude: ['**/*.svg']
})
