<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore'

const playerStore = usePlayerStore()
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  max-width: 50%;
}
</style>

<template>
  <video
    v-if="playerStore.wantsVideo && playerStore.currentSong?.videoUrl"
    :src="playerStore.currentSong?.videoUrl ?? ''"
    ref="globalVideoPlayer"
    autoplay
    controls
  />
  <audio
    v-else
    :src="playerStore.currentSong?.audioUrl ?? ''"
    ref="globalAudioPlayer"
    controls
    autoplay
  />
</template>
