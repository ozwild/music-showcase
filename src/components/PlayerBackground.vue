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
  transition: all cubic-bezier(0.47, 0, 0.745, 0.715);
  transition-duration: v-bind('styles.transitionDuration');
  background: v-bind('styles.defaultBackground');
  z-index: -1;
}
div.isPlaying {
  background: v-bind('styles.playingBackground');
}
</style>

<script lang="ts">
export const energyColors = [0, 120, 65, 23, 18, 221]
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import { $ref, $ } from 'vue/macros'
import { useAudioApi } from '@/composables/useAudioApi'
import { IAudioPlayer, ISong } from '@/types/types'
import { FFTSizes } from '@/utilities/constants'

// eslint-disable-next-line vue/no-setup-props-destructure
const { song, audioPlayer } = defineProps<{
  song: ISong
  audioPlayer: IAudioPlayer
}>()

const { isPlaying, context, gainNode } = $(audioPlayer)

const { getAnalyser, getAnalyserTimeFloatData, getDataMax, getDataAverage } =
  useAudioApi()

let analyser: AnalyserNode = $ref()

let tempo: number = $ref(500)
let lastBeat: number = $ref(0)
let barSize: number = $ref(tempo * 4)
let beatSize: number = $ref(barSize * 4)
let styles: Record<string, string> = $ref({
  defaultBackground: `hsl(0, 100%, 100%)`,
  playingBackground: `hsl(0, 100%, 100%)`,
  transitionDuration: `${barSize / 2}ms`,
})

function getPaletteFromSongKey() {
  return ['red', 'purple', 'blue']
}

function getHue(soundLevel: number) {
  const palette = getPaletteFromSongKey()
  const percentileFactor = Math.floor(soundLevel * 10 * 3) / 10
  const key = Math.floor(percentileFactor * palette.length)
  console.log(`Palette key: ${key}  with percentile ${percentileFactor}`)
  return palette[key]
}

function getIntensity(): number {
  const base = 20
  const minimumRange = 10
  const happinessRange = song.meta?.happiness || 20
  const danceabilityRange = song.meta?.energy || 15
  const range = minimumRange + happinessRange + danceabilityRange
  return base + Math.random() * range
}

function getSaturation(): number {
  const base = 30
  const minimumRange = 0
  const happinessRange = song.meta?.happiness || 30
  const danceabilityRange = song.meta?.energy || 20
  const range = minimumRange + happinessRange + danceabilityRange
  return base + Math.random() * range
}

function getColor() {
  const dataSnapshot: Float32Array = getAnalyserTimeFloatData(analyser)
  const maxDataValue: number = getDataMax(dataSnapshot)
  const hue = getHue(maxDataValue)
  const saturation = getSaturation()
  const intensity = getIntensity()

  console.log(
    `Color Levels: hue:${hue}; saturation: ${saturation}; intensity: ${intensity}; maxTimeValue: ${maxDataValue};`
  )
  return `hsl(${hue}, 50%, ${intensity}% )`
}

/**
 * Add additional properties to songs
 * scale (use song scale to provide color palette)
 * energy (to provide a base luminosity and saturation on which operate)
 * danceability (to determine how often to trigger beat())
 * happiness (to add on to saturation)
 */

function beat(now?: number) {
  if (now) {
    if (!lastBeat || now - lastBeat > beatSize) {
      styles.playingBackground = getColor()
      lastBeat = now
    }
  }
  if (isPlaying) requestAnimationFrame(beat)
}

function testPeaks() {
  if (!analyser) return
  beat()
}

watch(
  () => isPlaying,
  (_isPlaying) => {
    if (_isPlaying) {
      setTimeout(beat, 300)
    }
  }
)

watch(song, (newSong: ISong) => {
  if (!newSong) return
  tempo = newSong.meta?.bpm ?? 120
})

watch(
  () => context,
  () => {
    analyser = getAnalyser(context, gainNode, FFTSizes.REGULAR)
  }
)
</script>
