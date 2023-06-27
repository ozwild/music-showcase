<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSongsStore } from '@/stores/SongBankStore'
import MainLayout from '@/layouts/MainLayout.vue'

const songStore = useSongsStore()
const route = useRoute()

// const songs = songStore.songs
const songId = route.params.song

// SongRoute beforeEnter rule ensures this Page always will get a song
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const song = songStore.getSongById(songId as string)!
</script>

<template>
  <MainLayout>
    <h4>{{ song.title }}</h4>
    <video v-if="song.videoUrl" :src="song.videoUrl" />
  </MainLayout>
</template>
