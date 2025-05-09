import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "listApp",
      filename: "remoteEntry.js",
      exposes: {
        "./CharacterList": "./src/components/CharacterListWithStore.tsx",
      },
      remotes: {
        detailApp: "http://localhost:3000/assets/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "^19.0.0",
        },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
