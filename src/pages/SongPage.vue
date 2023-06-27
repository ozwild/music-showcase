<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSongsStore } from '@/stores/SongBankStore'
import MainLayout from '@/layouts/MainLayout.vue'

const songStore = useSongsStore()
const route = useRoute()

const songs = songStore.songs
const songId = route.params.song
const [song] = songs.filter((song) => song.id === songId)
</script>

<template>
  <MainLayout>
    <h4>{{ song.title }}</h4>
    <video v-if="song.videoUrl" :src="song.videoUrl" />
  </MainLayout>
</template>
@/stores/SongBankStore