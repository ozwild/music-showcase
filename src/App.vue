<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMediaDataStore } from './stores/MediaDataStore'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useSettingsStore } from './stores/SettingsStore'
import { useLocalStorage } from './composables/useLocalStorage'
import { useEnvironmentStore } from './stores/EnvironmentStore'

const environment = useEnvironmentStore()
const settingsStore = useSettingsStore()
useMediaDataStore()
useMediaPlayer()

const appSettingsStorageKey = environment.normalizedAppName
const { update } = useLocalStorage(appSettingsStorageKey)

settingsStore.$subscribe((_, state) => update(state))
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

body {
  background-color: var(--el-bg-color-page);
  margin-top: 0;
}
</style>

<template>
  <RouterView />
</template>
