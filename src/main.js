import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'
import createLoadingLikeDirective from '@/components/base/loading/directive.js'

const app = createApp(App)

app.use(router).use(lazyPlugin,{
  loading: require('@/assets/images/default.png')
}).directive('loading', createLoadingLikeDirective)

app.mount('#app')
