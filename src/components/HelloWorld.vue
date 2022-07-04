<template>
  <div class="hello">
    <h1>Palencia | Oskar \ Algren / Ozwild</h1>

    <AudioPlayerSetup :songs="audioSources" />
  </div>
</template>

<script lang="ts" setup>
import AudioPlayerSetup from './AudioPlayerSetup.vue'
import { ISong } from '@/types/types'

const audioSources: ISong[] = [
  {
    id: 'special_k',
    title: 'Special K',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Palencia%20-%20Special%20K%2028052022.mp3',
  },
  {
    id: 'special_needs',
    title: 'Special Needs',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Placebo%20-%20Special%20needs%2010052022.mp3',
  },
  {
    id: 'every_you_every_me',
    title: 'Every you, every me',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Palencia%20-%20Every%20You%20Every%20Me%2028052022.mp3',
  },
  {
    id: 'faust_arp',
    title: 'Faust Arp',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Faust%20Arp%2006012022.mp3',
  },
  {
    id: 'exit_music_for_a_film',
    title: 'Exit music (for a film)',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Exit%20Music%20(for%20a%20film)%2031052022.mp3',
  },
  {
    id: 'knives_out',
    title: 'Knives out',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Radiohead%20-%20Knives%20Out%2006012022.mp3',
  },
  {
    id: 'nothings_impossible',
    title: "Nothing's Impossible",
    url: "https://storage.googleapis.com/ozwild_test_bucket/Depeche%20Mode%20-%20Nothing's%20Impossible%2031052022.mp3",
  },
  {
    id: 'dream_on',
    title: 'Dream on',
    url: 'https://storage.googleapis.com/ozwild_test_bucket/Depeche%20Mode%20-%20Dream%20On%2030052022.mp3',
  },
]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
