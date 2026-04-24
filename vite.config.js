import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },
  base: 'https://danielenriquezc.github.io/portfolio/'
})