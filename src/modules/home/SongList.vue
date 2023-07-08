<script setup lang="ts">
import { useMediaDataStore } from '@/stores/MediaDataStore'
import SongsTable from '@/components/SongsTable.vue'

const mediaDataStore = useMediaDataStore()
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2.5em;
}
</style>

<template>
  <SongsTable
    title="Todas las canciones"
    :songs="mediaDataStore.filteredSongs"
  />
</template>
