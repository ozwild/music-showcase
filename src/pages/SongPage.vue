<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMediaDataStore } from '@/stores'
import MainLayout from '@/layouts/MainLayout.vue'

const mediaStore = useMediaDataStore()
const route = useRoute()

const songId = route.params.song

// SongRoute beforeEnter rule ensures this Page always will get a song
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const song = mediaStore.getSongById(songId as string)!
</script>

<template>
  <MainLayout>
    <h4>{{ song.title }}</h4>
  </MainLayout>
</template>
