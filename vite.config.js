import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    // Enable CSS code-splitting for better caching
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    rollupOptions: {
      output: {
        // Fingerprinted assets for cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          // Three.js — largest library, isolated for long-term caching
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          // GSAP — second heaviest, keep separate
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          // Lucide icons — frequent updates keep separate
          if (id.includes('node_modules/lucide')) {
            return 'vendor-lucide';
          }
          // AOS animate-on-scroll — used at startup
          if (id.includes('node_modules/aos')) {
            return 'vendor-aos';
          }
          // Vercel analytics — separate so it never blocks
          if (id.includes('@vercel')) {
            return 'vendor-vercel';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['aos', 'lucide', 'gsap'],
    // Three.js is tree-shaken via dynamic imports
    exclude: ['three']
  }
});
