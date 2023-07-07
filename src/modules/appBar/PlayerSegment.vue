<script setup lang="ts">
import PlayButton from './PlayButton.vue'
</script>

<style lang="scss" scoped>
.segment {
  display: flex;
  height: 100%;

  &.player-segment {
    justify-content: center;
    align-items: center;

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
  }
}
</style>

<template>
  <div class="segment song-segment">
    <PlayButton />
  </div>
</template>
