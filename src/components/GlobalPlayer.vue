<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore'

const playerStore = usePlayerStore()
const audio = $ref(document.createElement('audio'))
const video = $ref(document.createElement('video'))

playerStore.$subscribe((mutation, { currentSong }) => {
  if (currentSong) {
    const {
      source: { audio: audioUrl, video: videoUrl },
    } = currentSong

    console.log('SOURCE CHANGED', currentSong)

    if (audioUrl) {
      audio.src = audioUrl
    } else {
      audio.src = ''
      audio.removeAttribute('src')
    }

    if (videoUrl) {
      video.src = videoUrl
    } else {
      video.src = ''
      video.removeAttribute('src')
    }

    console.log('state', audioUrl, videoUrl)
  }
})

document.body.append(audio, video)
</script>

<style lang="scss">
video {
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 240px;
  z-index: 2000;
  z-index: 10000;
  position: fixed;
  display: block;
  top: 100px;
  right: 100px;
}

audio {
  position: fixed;
  left: 12px;
  bottom: 12px;
  width: 240px;
  z-index: 2000;
  z-index: 10000;
  position: fixed;
  display: block;
  top: 100px;
  left: 100px;
}
</style>

<template>
  <div class="container"></div>
</template>
