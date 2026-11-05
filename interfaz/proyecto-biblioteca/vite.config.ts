/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',               // un navegador simulado para pintar los componentes
    setupFiles: './src/setupTests.ts',  // se ejecuta antes de cada fichero de pruebas
  },
})
