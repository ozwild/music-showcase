<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettingsStore, useMediaDataStore } from '@/stores'
import { useDark } from './composables/useDark'

import data from '@/data/DATA.json'
import { watch } from 'vue'

const settings = useSettingsStore()
const mediaStore = useMediaDataStore()
const { isDark } = useDark()

mediaStore.loadSongsData(data)

// First establishing the light/dark theme to use according to stored settings
document.documentElement.classList.toggle('dark', isDark.value)

watch(isDark, () => {
  // Updating the light/dark theme in the DOM
  document.documentElement.classList.toggle('dark', isDark.value)
})

settings.$subscribe(() => {
  // Trigger a settings backup (can't trigger this action from within the store)
  settings.backupSettingsToLocalStorage()
})
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

body {
  background-color: var(--el-bg-color-page);
  margin-top: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>

<template>
  <RouterView />
</template>
