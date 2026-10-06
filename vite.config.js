import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lucide')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/aos')) {
            return 'vendor-aos';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
