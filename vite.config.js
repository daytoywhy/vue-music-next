import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import requireTransform from 'vite-plugin-require-transform';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.js$|.vue$/
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
          `
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:  'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
