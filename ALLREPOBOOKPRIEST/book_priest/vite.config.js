import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const theme = process.env.VITE_VUE_APP_THEME || "theme1";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add this alias for SCSS
      "artiqui-sass": path.resolve(__dirname, "../artiqui/assets/sass"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Use the alias here
        additionalData: `@import "artiqui-sass/themes/${theme}";`,
      },
    },
  },
  server: {
    port: 5173,
  },
});
