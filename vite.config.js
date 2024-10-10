import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',  // Where your static site is located
  server: {
    port: 3001,    // Different from your express port (e.g., 3000)
  }
});
