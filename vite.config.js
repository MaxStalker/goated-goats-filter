import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: 'vite-compatible-readable-stream",',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'stream-http',
      https: 'https-browserify',
    }
  },
  plugins: [react()]
})