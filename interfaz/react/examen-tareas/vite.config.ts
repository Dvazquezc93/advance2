/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json', exclude: ['src/App.tsx', 'src/main.tsx', 'src/**/*.test.tsx'] }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/components/index.ts'),
      formats: ['es'],
      fileName: 'examen-tareas',
      cssFileName: 'estilos',
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})