<template>
  <div class="hello">
    <h1>Palencia | Oskar \ Algren / Ozwild</h1>

    <AudioPlayerSetup :songs="audioSources" />
  </div>
</template>

<script lang="ts" setup>
//import AudioPlayerSetup from './AudioPlayerSetup.vue'
import { ISong } from '@/types/types'
//import AudioPlayer from './AudioPlayer.vue'
import AudioPlayerSetup from './AudioPlayerSetup.vue'

import songs from '@/songs.json'

const audioSources: ISong[] = songs
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
