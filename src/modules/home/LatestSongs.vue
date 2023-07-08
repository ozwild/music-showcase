<script setup lang="ts">
import { useMediaDataStore } from '@/stores'

import SongsTable from '@/components/SongsTable.vue'

const mediaStore = useMediaDataStore()
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
  <SongsTable title="Ultimas canciones" :songs="mediaStore.latestSongs" />
</template>
