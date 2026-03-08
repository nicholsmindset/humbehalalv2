import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Warn if any single chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, long cache lifetime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Icons — large library, separate chunk
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
