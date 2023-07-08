<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAnalyzer } from './useAnalyzer'
import { useSettingsStore } from '@/stores/SettingsStore'
import { useMediaShell } from '@/modules/player/useMediaShell'

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

watch(
  () => settings.runAnalyzer,
  (runAnalyzer) => {
    analyzer.value.toggleAnalyzer(!runAnalyzer)
  }
)

onMounted(() => {
  document.getElementById('analyzer-container')?.append(containerElement.value)
})
</script>

<template>
  <div id="analyzer-container"></div>
</template>
