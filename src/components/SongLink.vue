<script setup lang="ts">
import { ISong } from '@/data/types'
defineProps<{ song: ISong }>()
</script>

<template>
  <router-link
    :to="{ name: 'Song', params: { song: song.id } }"
    v-slot="{ href }"
    custom
  >
    <el-link :href="href">{{ song.title }}</el-link>
  </router-link>
</template>
