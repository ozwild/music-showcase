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
import { IAudioPlayer } from '@/types/types'
import { FFTSizes } from '@/utilities/constants'

// eslint-disable-next-line vue/no-setup-props-destructure
const { tempo, audioPlayer } = defineProps<{
  tempo: number
  audioPlayer: IAudioPlayer
}>()

const { isPlaying, context, gainNode } = $(audioPlayer)

const {
  getAnalyser,
  getAnalyserTimeByteData,
  getAnalyserTimeFloatData,
  getDataMax,
  getDataAverage,
} = useAudioApi()

let analyser: AnalyserNode = $ref()
let energyHue: number = $ref(128)
let lastBeat: number = $ref(0)
let barSize: number = $ref(tempo * 4)
let beatSize: number = $ref(barSize * 4)
let styles: Record<string, string> = $ref({
  defaultBackground: `hsl(0, 100%, 100%)`,
  playingBackground: `hsl(0, 100%, 100%)`,
  transitionDuration: `${barSize / 2}ms`,
})

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
      const dataSnapshot: Float32Array = getAnalyserTimeFloatData(analyser)
      const maxDataValue: number = getDataMax(dataSnapshot)
      const averageDataValue: number = getDataAverage(dataSnapshot)

      const colorIndex = Math.floor(Math.random() * energyColors.length)
      const luminosityIndex = maxDataValue * 2 * 100
      const hueIndex = luminosityIndex * 360
      energyHue = energyColors[colorIndex] as number
      styles.playingBackground = `hsl(${hueIndex}, 50%, ${luminosityIndex}% )`
      lastBeat = now

      console.log('max data value', maxDataValue)
      console.log('average data value', averageDataValue)
      console.log('last beat assignation', lastBeat)
      console.log('hue', energyHue)
      console.log('luminosityIndex', luminosityIndex)
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
  (newValue) => {
    console.log('is playing watcher:', newValue)
    if (newValue) {
      setTimeout(beat, 300)
    }
  }
)

watch(
  () => context,
  () => {
    analyser = getAnalyser(context, gainNode, FFTSizes.REGULAR)
  }
)
</script>
