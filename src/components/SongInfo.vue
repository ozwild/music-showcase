<template>
  <div v-if="song">{{ song.title }}</div>
  <div v-else>Pick a song to play</div>
</template>

<script lang="ts" setup>
import { ISong } from '@/types/types'
// eslint-disable-next-line vue/no-setup-props-destructure
const { song } = defineProps<{ song: ISong | null }>()
</script>
