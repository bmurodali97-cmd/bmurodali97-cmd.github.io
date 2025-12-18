import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolia/',   // 🔥 ENG MUHIM QATOR
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
})

