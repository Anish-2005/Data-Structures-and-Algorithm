import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // ... other config
  optimizeDeps: {
    exclude: ['web-tree-sitter']
  }
});
