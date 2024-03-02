import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'
import noResultDirective from '@/components/base/no-result/directive'
import createLoadingLikeDirective from '@/components/base/loading/directive.js'

import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

const app = createApp(App)

app
  .use(router)
  .use(lazyPlugin, {
    loading: require('@/assets/images/default.png')
  })
  .directive('loading', createLoadingLikeDirective)
  .directive('no-result', noResultDirective)
  .use(store)

app.mount('#app')
