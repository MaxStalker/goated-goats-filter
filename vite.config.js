import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from '@rollup/plugin-inject'
import polyfill from '@esbuild-plugins/node-modules-polyfill'

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
  plugins: [react()],
  optimizeDeps: {
    include: [
      "queue-microtask",
      "@improbable-eng/grpc-web",
      "@improbable-eng/grpc-web-node-http-transport",
      "sha3",
      "@onflow/protobuf",
    ],
    exclude: ["@onflow/fcl"],
  },
  /*build: {
    rollupOptions: {
      plugins: [
        polyfill()
      ],
    },
  },*/
})