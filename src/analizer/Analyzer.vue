<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAnalyzer } from './useAnalyzer'
import { useSettingsStore } from '@/stores/SettingsStore'
import { useMediaShell } from '@/player/useMediaShell'

//const { audio: audioElement } = useMediaShell()

const { createAnalyzer } = useAnalyzer()
const settings = useSettingsStore()
const { audioElement } = useMediaShell()

// const analyzer = sourceNode.value.context.createAnalyser()

const containerElement = ref(document.createElement('div'))
const analyzer = ref(
  createAnalyzer(containerElement.value, {
    source: audioElement.value,
  })
)

containerElement.value.style.height = '100%'

settings.$subscribe((mutation, { runAnalyzer }) => {
  console.log('analyzer store at analyzer', runAnalyzer)
  analyzer.value.toggleAnalyzer(!runAnalyzer)
})

onMounted(() => {
  document.getElementById('analyzer-container')?.append(containerElement.value)
})
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
  <div id="analyzer-container"></div>
</template>
@/player/useMediaShell
