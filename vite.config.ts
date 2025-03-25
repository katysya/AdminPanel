import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src/app"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@app/styles/reset.css";`,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
