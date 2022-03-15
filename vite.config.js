import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: 'vite-compatible-readable-stream",',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'stream-http',
      https: 'https-browserify',
      buffer: 'buffer'
    }
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions:{
      define: {
        global: "globalThis"
      }
    },
    include: [
      "queue-microtask",
      "@improbable-eng/grpc-web",
      "@improbable-eng/grpc-web-node-http-transport",
      "sha3",
      "@onflow/protobuf",
    ],
    exclude: ["@onflow/fcl"],
  },
  build:{
    rollupOptions:{
      plugins:[
        rollupNodePolyFill()
      ]
    }
  }
})