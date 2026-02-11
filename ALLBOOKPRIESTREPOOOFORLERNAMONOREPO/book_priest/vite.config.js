import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const theme = process.env.VITE_VUE_APP_THEME || "theme1";
console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
console.log(`✅ Using  theme: ${theme} ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅`);
console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");

const themeRelativePath = `artiqui/assets/sass/themes/${theme}`;

const x = `@import "${themeRelativePath}";`;
console.log(x);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     // scss: {
  //     //   additionalData: `
  //     //     @import "artiqui/src/assets/sass/themes/${process.env.VITE_VUE_APP_THEME}";
  //     //   `
  //     // }
  //     scss: {
  //       additionalData: `$theme: "${process.env.VITE_VUE_APP_THEME || 'theme1'}";`
  //    }
  //   }
  // }
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${themeRelativePath}";`,
      },
    },
  },
  server: {
    port: 5173, // Change this to your desired port
  },
});
