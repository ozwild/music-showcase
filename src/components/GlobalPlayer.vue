<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore'
import { ref, watch } from 'vue'

const playerStore = usePlayerStore()
const mediaElement = ref(null)

watch(mediaElement, () => {
  playerStore.$state.mediaElement = mediaElement.value
})
</script>

<style lang="scss" scoped>
video {
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 240px;
  z-index: 2000;
}
</style>

<template>
  <video
    ref="mediaElement"
    :src="
      playerStore.currentSong?.audioUrl ??
      playerStore.currentSong?.videoUrl ??
      ''
    "
    crossOrigin="anonymous"
    controls
    autoplay
  ></video>
</template>
