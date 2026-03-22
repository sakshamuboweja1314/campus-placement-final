import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  // Proxy API requests during development to the Express backend (port 4000)
  server: {
    proxy: {
      // Any call to /api/* will be forwarded to http://local0.host:4000
      '/api': 'http://localhost:4000'
    }
  }
});
