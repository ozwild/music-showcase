<script setup lang="ts">
import { useMediaDataStore } from '@/stores/MediaDataStore'
import SongListItem from './SongListItem.vue'

const mediaDataStore = useMediaDataStore()
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2.5em;
}
</style>

<template>
  <h2>
    {{
      mediaDataStore.filterBy
        ? `Mostrando resultados para: ${mediaDataStore.filterBy}`
        : 'Todas las canciones'
    }}
  </h2>
  <el-divider />
  <el-row :gutter="10">
    <SongListItem
      v-for="song in mediaDataStore.filteredSongs"
      :key="song.id"
      :song="song"
    />
  </el-row>
</template>
