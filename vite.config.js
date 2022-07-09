import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        canvas: resolve(__dirname, 'canvas/index.html'),
        css: resolve(__dirname, 'extensions/css/index.html'),
        help: resolve(__dirname, 'extensions/help/index.html'),
      },
    },
  },
})
