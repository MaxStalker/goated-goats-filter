import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import nodePolyfills from "rollup-plugin-polyfill-node";

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
  plugins: [
    react(),
    builtins(),
    resolve({
      browser: true,
    }),
    globals(),
  ],
  /*  optimizeDeps: {
    include: [
      "queue-microtask",
      "@improbable-eng/grpc-web",
      "@improbable-eng/grpc-web-node-http-transport",
      "sha3",
      "@onflow/protobuf",
    ],
    exclude: ["@onflow/fcl"],
  },*/
});
