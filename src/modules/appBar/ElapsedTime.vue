<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useTimeFormat } from '@/composables/useTimeFormat'

const { currentTime } = useMediaPlayer()
const { format } = useTimeFormat()
</script>

<template>
  <span>{{ format(currentTime) }}</span>
</template>
