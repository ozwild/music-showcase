<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useDark } from '@/composables/useDark'
import { PlayIcon, PauseIcon } from '@/modules/icons'

const { isPlaying, play, pause } = useMediaPlayer()
const { isDark } = useDark()
</script>
<style lang="scss" scoped>
.action-button {
  position: relative;
  text-align: center;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 50%;

  &:hover,
  &:active,
  &:focus {
    &.isDark {
      background: rgba(255 255 255 / 5%);
    }
    background: rgba(0 0 0 / 5%);
  }

  > i {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(2.5);
  }
  &.play-button {
    > i {
      top: calc(50% - 3px);
    }
  }
}
</style>
<template>
  <Transition name="fade" mode="out-in">
    <span
      v-if="isPlaying"
      class="action-button pause-button"
      :class="{ isDark }"
      @click.stop="pause"
      role="button"
    >
      <PauseIcon :scale="2.5" />
    </span>
    <span
      v-else
      class="action-button play-button"
      :class="{ isDark }"
      @click.stop="play"
      role="button"
    >
      <PlayIcon :scale="2.5" />
    </span>
  </Transition>
</template>
@/modules/icons
