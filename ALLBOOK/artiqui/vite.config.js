import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import liveReload from 'vite-plugin-live-reload';
import path from 'path';

export default defineConfig({
  plugins: [createVuePlugin(),liveReload([
  'assets/sass/**/*.{scss}',
  'src/components/**/*.vue'  // Recursive watching for all .vue files
])],// liveReload('assets/sass/**/*.{scss}')
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/abstracts/_colors.scss";`  // Update with your actual path
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/routerEngine.js'),
      name: 'RouterEngine',
      fileName: (format) => `router-engine.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
   server: {
    port: 2004, // Change this to your desired port
  },
});




// import { defineConfig } from 'vite';
// import { createVuePlugin } from 'vite-plugin-vue2';
// import path from 'path';

// export default defineConfig({
//   plugins: [createVuePlugin()],
  
//   build: {
//     outDir: path.resolve(__dirname, 'dist'),  // ✅ output path   outDir: path.resolve(__dirname, 'src/assets/artidist'),
//     lib: {
//       entry: path.resolve(__dirname, 'src/routerEngine.js'),
//       name: 'RouterEngine',
//       fileName: (format) => `router-engine.${format}.js`,
//       formats: ['es', 'umd']
//     },
//     // rollupOptions: {
//     //   external: ['vue'],
//     //   output: {
//     //     globals: {
//     //       vue: 'Vue'
//     //     },
//     //     assetFileNames: 'assets/[name].[ext]'  // ✅ controls asset path inside artidist
//     //   }
//     // }
//   }
// });
