<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useToggle } from '@/composables/useToggle'
import { VolumeIcon, FormatSlashIcon } from '@/modules/icons'
import VolumeSlider from './VolumeSlider.vue'

import { useMediaPlayer } from '../player/useMediaPlayer'
const volumeBarIsVisible = ref(false)
const { muted } = useMediaPlayer()
const { toggle: toggleVolumeBar } = useToggle(volumeBarIsVisible)

function clearVolumeControl(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.volume-control')) {
    volumeBarIsVisible.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', clearVolumeControl))
onUnmounted(() => document.removeEventListener('mousedown', clearVolumeControl))
</script>

<style lang="scss" scoped>
.mute-control {
  position: relative;
  padding: 0 24px 0 0px;
}

.volume-control {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  &.muted {
    color: var(--el-color-info-light-5);
  }

  .slash-icon {
    position: absolute;
    right: 18px;
    bottom: -3px;
    transform: scale(2) rotate(135deg);
  }
}
</style>

<template>
  <span
    class="volume-control"
    :class="{ muted: muted }"
    @click="toggleVolumeBar"
  >
    <span v-if="!volumeBarIsVisible" class="mute-control">
      <VolumeIcon />
      <FormatSlashIcon class="slash-icon" v-if="muted" />
    </span>

    <VolumeSlider v-if="volumeBarIsVisible" class="volume-slider" @click.stop />
  </span>
</template>
