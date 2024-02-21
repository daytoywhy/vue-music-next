<template>
  <MyHeader />
  <tab />
  <router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'
import MyHeader from '@/components/header/header.vue'
import tab from '@/components/tab/tab.vue'
</script>
