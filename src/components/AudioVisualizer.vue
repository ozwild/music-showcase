<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
  // z-index: 1000;
  //width: 100vw;
  max-width: 100vw;
  //height: 100vh;
  top: 0;
  left: 0;
  border: 3px solid red;
  background: darkblue;
}
</style>

<script lang="ts">
import AudioMotionAnalyzer from 'audiomotion-analyzer'
</script>

<script lang="ts" setup>
import { onMounted, watch, inject, ref, Ref } from 'vue'
import { $, $$ } from 'vue/macros'
import { useAudioVisualizer } from '@/composables/useAudioVisualizer'

import { audioElementInjectionKey } from '@/utilities/injectionKeys'

const audioElement = inject(audioElementInjectionKey) as Ref<HTMLMediaElement>

console.log('AUDIO ELEMENT@BODY', audioElement)
// eslint-disable-next-line vue/no-setup-props-destructure
/* const { audioElement } = defineProps<{
  audioElement: HTMLMediaElement | undefined
}>() */

const { spawn } = useAudioVisualizer()
const canvas: Ref<HTMLMediaElement | undefined> = ref()
let visualizer: AudioMotionAnalyzer = $ref()
let container: HTMLCanvasElement


function resizeHandler(reason: string, instance: AudioMotionAnalyzer) {
  const { innerHeight, innerWidth } = window
  console.log('RESIZE HANDLER', innerWidth, innerHeight, instance.pixelRatio)
  if (reason !== 'fschange') {
    // instance.width = innerWidth / instance.pixelRatio
    // instance.height = innerHeight / instance.pixelRatio
    //instance.width = innerWidth
    //instance.height = innerHeight
  }
}

watch(audioElement, (n: HTMLMediaElement | undefined) => {
  console.log('AUDIO ELEMENT CHANGED', container, n)
  if (!n) {
    return
  }
  setTimeout(() => {
    console.log('INSTANTIATING VISUALIZER', container, n)
    if (canvas.value) {
      visualizer = spawn(canvas.value)
    }
    //visualizer.connectInput(n as HTMLMediaElement)
    //visualizer.onCanvasResize = resizeHandler
  }, 1e3)
})

onMounted(() => {
  /* console.log('ATTEMPT TO INITIALIZE VISUALIZATION', audioElement, canvas)
  if (!audioElement || !canvas) {
    return
  }
  console.log('INSTANTIATING VISUALIZER', canvas, audioElement)
  visualizer = spawn(canvas)
  visualizer.connectInput(audioElement as HTMLMediaElement)
  visualizer.onCanvasResize = resizeHandler */

  console.log('MOUNTED', audioElement)
})
</script>
