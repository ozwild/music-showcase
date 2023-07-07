<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import PauseIcon from '@/components/PauseIcon.vue'
import PlayIcon from '@/components/PlayIcon.vue'

const { isPlaying, play, pause } = useMediaPlayer()
</script>
<style lang="scss" scoped>
.action-button {
  width: 64px;
  text-align: center;
  cursor: pointer;

  &.pause-button {
    font-size: 3em;
    top: -8px;
    left: 4px;
    position: relative;
  }
  &.play-button {
    font-size: 3em;
  }
}
</style>
<template>
  <Transition name="fade" mode="out-in">
    <span
      v-if="isPlaying"
      class="action-button pause-button"
      @click.stop="pause"
      role="button"
    >
      <PauseIcon />
    </span>
    <span
      v-else
      class="action-button play-button"
      @click.stop="play"
      role="button"
    >
      <PlayIcon />
    </span>
  </Transition>
</template>
