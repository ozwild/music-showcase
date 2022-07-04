<template>
  <div class="hello">
    <h1>useAudioPlayer Sample</h1>

    <AudioPlayerSetup :sources="audioSources" />
  </div>
</template>

<script lang="ts" setup>
import AudioPlayerSetup from './AudioPlayerSetup.vue'

const audioSources = [
  'https://storage.googleapis.com/ozwild_test_bucket/Palencia%20-%20Special%20K%2028052022.mp3',
  'https://storage.googleapis.com/ozwild_test_bucket/Placebo%20-%20Special%20needs%2010052022.mp3',
  'https://storage.googleapis.com/ozwild_test_bucket/Palencia%20-%20Every%20You%20Every%20Me%2028052022.mp3',
  'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Faust%20Arp%2006012022.mp3',
  'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Exit%20Music%20(for%20a%20film)%2031052022.mp3',
  'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Knives%20Out%2006012022.mp3',
  "https://storage.googleapis.com/ozwild_test_bucket/Depeche%20Mode%20-%20Nothing's%20Impossible%2031052022.mp3",
  'https://storage.googleapis.com/ozwild_test_bucket/Depeche%20Mode%20-%20Dream%20On%2030052022.mp3',
] as string | string[]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
