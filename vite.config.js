import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import requireTransform from 'vite-plugin-require-transform';

const express = require('express')
// import { registerRouter } from './backend/router.js'
// console.log(registerRouter,'数据');
const registerRouter = require('./backend/router.js')


async function createServer(){
  const app = express()
  registerRouter(app)
  app.listen(3000, function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:3000' + '\n')
  })
}
createServer()

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
    open: './server.js',
    proxy:{
      '/api':{
        target:  'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
