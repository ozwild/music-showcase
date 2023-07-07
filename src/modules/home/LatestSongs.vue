<script setup lang="ts">
import { useMediaDataStore } from '@/stores/MediaDataStore'

import SongsTable from '@/components/SongsTable.vue'

const mediaDataStore = useMediaDataStore()
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.75em;
  &.bigScreen {
    font-size: 2.5em;
  }
}
</style>

<template>
  <SongsTable title="Ultimas canciones" :songs="mediaDataStore.latestSongs" />
</template>
