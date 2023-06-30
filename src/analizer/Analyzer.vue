<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { useAnalyzer } from './useAnalyzer'
import { usePlayerStore } from '@/stores/PlayerStore'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { useAnalyzerStore } from '@/stores/AnalyzerStore'
import { useMediaShell } from '@/composables/useMediaShell'

//const { audio: audioElement } = useMediaShell()

const { createAnalyzer } = useAnalyzer()
const playerStore = usePlayerStore()
const analyzerStore = useAnalyzerStore()

const container = ref(null)
const initialized = ref(false)
const instance: Ref<AudioMotionAnalyzer | null> = ref(null)
const analyzer = ref(createAnalyzer(document.createElement('div')))

analyzerStore.$subscribe((mutation, { standby }) => {
  if (instance.value) {
    console.log('analyzer store at analyzer', standby)
    instance.value.toggleAnalyzer(!standby)
  }
})

console.log('refs', container)

// container.value.append(analyzer.value)

/* function bootstrap(mediaElement: HTMLVideoElement | null) {
  console.log('BOOTSTRAP ANALYZER')
  if (mediaElement && !initialized.value) {
    console.log('INITIALIZING ANALYZER')
    const containerElement = document.getElementById(
      'analyzer-container'
    ) as HTMLDivElement

    console.log('container', containerElement)
    const analyzer = createAnalyzer(containerElement, { source: mediaElement })
    // analyzer.connectInput(mediaElement)
    // analyzer.toggleAnalyzer(true)
    initialized.value = true
    instance.value = analyzer
  }
} */

console.log('ANALYZER BODY')
// bootstrap(playerStore.mediaElement)
/* watch(
  () => container.value,
  () => {
    if (container.value && audioElement) {
      console.log('CONTAINER', container.value)
      bootstrap(playerStore.mediaElement)
    }
  }
) */
/* watch(
  () => playerStore.mediaElement,
  (mediaElement) => {
    console.log('INITIALIZING ANALYZER', playerStore.mediaElement, mediaElement)
    bootstrap(playerStore.mediaElement)
  }
) */

</script>

<style lang="scss" scoped>
#analyzer-container {
  //position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  //width: 100vw;
  //height: 100vh;
  width: 100%;
  height: 100%;
  //max-height: 500px;
}
</style>

<template>
  <div id="analyzer-container" ref="container"></div>
</template>
