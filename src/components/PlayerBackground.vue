<template>
  <div :class="{ isPlaying }"><button @click="testPeaks">click!</button></div>
</template>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all ease-out;
  transition-duration: v-bind('transitionDuration');
  background: hsl(0, 100%, 100%);
  z-index: -1;
}
div.isPlaying {
  background: v-bind('playingBackground');
}
</style>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { useAudioApi } from '@/composables/useAudioApi'
import { IAudioPlayer, ColorSet } from '@/types/types'
import { ISong } from '@/data/types'
import { FFTSizes } from '@/utilities/constants'

import { playerInjectionKey } from '@/utilities/injectionKeys'

// eslint-disable-next-line vue/no-setup-props-destructure
const { song } = defineProps<{
  song: ISong
}>()
const audioPlayerComposable = inject(playerInjectionKey) as IAudioPlayer
const {
  isPlaying,
  instance: audioPlayerInstance,
  context,
  gainNode,
  analyserNode: internalAnalyserNode,
  getAnalyser,
  spawnAnalyser,
} = $(audioPlayerComposable)

const {
  getAnalyserTimeFloatData,
  getAnalyserTimeByteData,
  getAnalyserFrequencyByteData,
  getAnalyserFrequencyFloatData,
  getDataMax,
} = useAudioApi($$(context), $$(gainNode))

let analyser: AnalyserNode = $ref()
let shouldRun: boolean = $ref(false)
let tempo: number = $ref(120)

let lastBeat: number = $ref(0)
let tempoInMilliseconds: number = $computed(() => 60e3 / tempo)
let barSize: number = $computed(() => tempoInMilliseconds * 4)
// @TODO change coeficient back to 4
let beatSize: number = $computed(() => tempoInMilliseconds * 16)

let transitionDuration = $computed(() => `${barSize / 4}ms`)
let baseColorSet: ColorSet = $ref([0, 100, 100])
let colorSet: ColorSet = $ref(baseColorSet)
let playingBackground = $computed(() => {
  const [hue, saturation, luminance] = colorSet
  return `hsl(${hue}, ${saturation}%, ${luminance}%)`
})

function updateAnalyser() {
  analyser = spawnAnalyser({
    fftSize: FFTSizes.LOW,
    minDecibels: -50,
    maxDecibels: -12,
  })
}

function updateMusicalVariables() {
  console.log(`updating time variables using song: ${song.title}`, song)
  tempo = song.meta?.bpm ?? 120
  baseColorSet = getBaseColorValuesForMusicalScale(song.meta?.key)
}

function getBaseColorValuesForMusicalScale(musicalKey = '') {
  switch (musicalKey) {
    default:
      return [0, 80, 90]
  }
}

function getSaturation(soundLevel: number): number {
  const energy = song.meta?.energy ?? 40
  const energyFactor = 40
  const energyRange = (energy / 100) * energyFactor

  const base = 15 + energy / 4
  const minimumRange = 0

  return base + soundLevel * (minimumRange + energyRange)
}

function getLuminosity(soundLevel: number): number {
  const happiness = song.meta?.happiness ?? 40
  const danceability = song.meta?.danceability ?? 40
  const average = (happiness + danceability) / 2

  const songFactorsRangeRatio = 40
  const songFactorsRange = (average / 100) * songFactorsRangeRatio

  const base = 20 + average / 4
  const minimumRange = 10

  return base + soundLevel * (minimumRange + songFactorsRange)
}

function getUpdatedColor() {
  const analyserNode = getAnalyser()
  console.log('ANALYSER', analyserNode, internalAnalyserNode)
  const timeSnapshot: Uint8Array = getAnalyserTimeByteData()
  const frequencySnapshot: Uint8Array = getAnalyserFrequencyByteData()
  const maxDataValue: number = getDataMax(timeSnapshot)
  console.log(timeSnapshot, maxDataValue)
  console.log('FREQUENCY SNAPSHOT', frequencySnapshot)
  const [hue] = baseColorSet
  const saturation = getSaturation(maxDataValue)
  const luminosity = getLuminosity(maxDataValue)
  console.log(
    `Color Levels: [${hue}, ${saturation}, ${luminosity}], with max: ${maxDataValue}`
  )
  return [hue, saturation, luminosity]
}

/**
 * Add additional properties to songs
 * scale (use song scale to provide color palette)
 * energy (to provide a base luminosity and saturation on which operate)
 * danceability (to determine how often to trigger beat())
 * happiness (to add on to saturation)
 */

function beat(now?: number) {
  console.log('BEAT')
  if (now) {
    if (!lastBeat || now - lastBeat > beatSize) {
      colorSet = getUpdatedColor()
      lastBeat = now
    }
  }
  if (shouldRun) requestAnimationFrame(beat)
}

function testPeaks() {
  if (!analyser) return
  beat()
}

watch($$(isPlaying), (_isPlaying) => {
  console.log('isPlaying changed')
  if (_isPlaying) {
    shouldRun = true
    setTimeout(beat, 200)
  } else {
    setTimeout(() => {
      shouldRun = false
    }, 200)
  }
})

watch($$(audioPlayerInstance), (v) => {
  console.log('howl instance changed', v)
  updateAnalyser()
  updateMusicalVariables()
})
</script>
