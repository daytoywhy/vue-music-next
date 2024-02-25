<template>
  <div class="singer" v-loading="loading">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import IndexList from '@/components/index-list/index.vue'
export default {
  name: 'singer',
  components:{
    IndexList
  },
  data(){
    return{
      singers:[]
    }
  },
  computed:{
    loading(){
      return !this.singers.length
    }
  },
  async created(){
    const result = await getSingerList()
    this.singers = result.singers
  }
}
</script>

<style lang="scss" scoped>
.singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
  </style>
