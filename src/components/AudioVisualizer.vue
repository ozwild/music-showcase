<template>
  <canvas id="my-canvas" />
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
  // z-index: 1000;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  height: 100vh;
}
</style>

<script lang="ts" setup>
import { IAudioPlayer } from '@/types/types'
import { onMounted, inject, watch } from 'vue'
import { $, $$ } from 'vue/macros'

import { useAudioVisualizer } from '../composables/useAudioVisualizer'
import { playerInjectionKey } from '@/utilities/injectionKeys'
import AudioMotionAnalyzer from 'audiomotion-analyzer'

// eslint-disable-next-line vue/no-setup-props-destructure
// const { audioPlayer } = defineProps<{ audioPlayer: IAudioPlayer }>()
const audioPlayerComposable = inject(playerInjectionKey) as IAudioPlayer
//const { context, instance } = $(audioPlayerComposable)
const {
  context,
  gainNode,
  instance: audioPlayer,
  getContext,
  getAnalyser,
  getHowler,
} = audioPlayerComposable

const { spawn } = useAudioVisualizer()

let container: HTMLCanvasElement
let visualizer: AudioMotionAnalyzer

watch(audioPlayer, (newValue) => {
  console.log('AUDIO PLAYER CHANGED', newValue)
  console.log(container)
  const h = getHowler()
  const ctx = h?.ctx
  console.log('Global Context', ctx)
  if (ctx) {
    visualizer = spawn(container as HTMLElement, ctx)
  }
  setTimeout(() => loadup(), 500)
})

function loadup() {
  const analyser = getAnalyser()
  console.log('LOADING UP VISUALIZER', analyser)

  visualizer.connectInput(gainNode.value)
  console.log('VISUALIZER', visualizer)
}

onMounted(() => {
  container = document.getElementById('my-canvas') as HTMLCanvasElement
})
</script>
