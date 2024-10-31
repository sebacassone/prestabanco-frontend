import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Habilita source maps para el build
  },
  server: {
    // Habilita source maps para el servidor de desarrollo
  },
});
