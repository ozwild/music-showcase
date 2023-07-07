<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useTimeFormat } from '@/composables/useTimeFormat'

const { duration } = useMediaPlayer()
const { format } = useTimeFormat()
</script>
<template>
  <span>{{ format(duration) }}</span>
</template>
