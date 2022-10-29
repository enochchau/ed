import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  define: {
    process: {}
  },
  plugins: [solidPlugin(), react()]
})
