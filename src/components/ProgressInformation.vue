<template>
  <span>{{
    `${formatElapsed(elapsed)} / ${formatDuration(duration)} (${formatProgress(
      progress
    )})`
  }}</span>
  <br />
  <span>{{
    `-${formatRemaining(remaining)} / ${formatDuration(
      duration
    )} (${formatProgress(progress)})`
  }}</span>
</template>

<script lang="ts" setup>
import { IAudioPlayer } from '@/types/types'

import {
  formatProgress,
  formatDuration,
  formatElapsed,
  formatRemaining,
} from '@/utilities/format'

// eslint-disable-next-line vue/no-setup-props-destructure
const { audioPlayer } = defineProps<{ audioPlayer: IAudioPlayer }>()
const { elapsed, duration, progress, remaining } = audioPlayer
</script>
