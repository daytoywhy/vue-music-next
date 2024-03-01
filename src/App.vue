<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle"></router-view>
  <player></player>
</template>

<script setup>
import MHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const playlist = computed(() => store.state.playlist)
const viewStyle = computed(() => {
  return {
    bottom: playlist.value.length ? '60px' : ''
  }
})


</script>
