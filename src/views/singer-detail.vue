<template>
  <div class="singer-detail">
    <music-list :title="title" :pic="pic" :songs="songs" :loading="loading"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/index.vue'
import storage from 'good-storage'
export default {
  name: 'singer-detail',
  components: { MusicList },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    computedData() {
      let ret = null
      const data = this.data
      if (data) {
        ret = data
      } else {
        const cached = storage.session.get('__singer__')
        if (cached && (cached.mid || cached.id + '') === this.$route.params.id) {
          ret = cached
        }
      }
      return ret
    },
    title() {
      const data = this.computedData
      return data && (data.name || data.title)
    },
    pic() {
      const data = this.computedData
      return data && data.pic
    }
  },
  async created() {
    const data = this.computedData
    if (!data) {
      const path = this.$route.matched[0].path
      this.$router.push({
        path
      })
      return
    }
    const result = await getSingerDetail(data)
    this.songs = await processSongs(result.songs)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
