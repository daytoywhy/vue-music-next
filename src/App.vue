<template>
  <m-header></m-header>
  <tab></tab>
  <router-view></router-view>
</template>

<script setup>
import MHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import { RouterView } from 'vue-router'
</script>
