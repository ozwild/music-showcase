<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAnalyzer } from './useAnalyzer'
import { useAppStore } from '@/stores'
import { useDark } from '@/composables/useDark'
import { useMediaShell } from '@/modules/player/useMediaShell'

const app = useAppStore()
const { audioElement } = useMediaShell()
const { isDark } = useDark()

const containerElement = ref(document.createElement('div'))
const { analyzer, updateTheme } = useAnalyzer(containerElement.value, {
  source: audioElement.value,
})

containerElement.value.style.height = '100%'

updateTheme(isDark.value)

watch(isDark, () => {
  updateTheme(isDark.value)
})

watch(
  () => app.runAnalyzer,
  (runAnalyzer) => {
    analyzer.value.toggleAnalyzer(!runAnalyzer)
  }
)

onMounted(() => {
  document.getElementById('analyzer-container')?.append(containerElement.value)
})
</script>

<template>
  <div id="analyzer-container" style="height: 200%"></div>
</template>
