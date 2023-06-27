<template>
  <div class="hello">
    <AudioPlayerSetup :songs="audioSources" />
  </div>
</template>

<script lang="ts" setup>
import { ISong } from '@/data/types'
import AudioPlayerSetup from './AudioPlayerSetup.vue'

import songs from '@/data/songs.json'

const audioSources: ISong[] = songs
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
