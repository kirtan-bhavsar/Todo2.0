import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3500,
    proxy: {
      "/api/v1": {
        target: "http://localhost:5500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

// proxy to be added to vite.config.js
// proxy added for backend url so that it only calls this when /api/v1 is invoked
