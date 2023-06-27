<script setup lang="ts">
import { ref, computed, DefineComponent } from 'vue'

import Home from '@/pages/HomePage.vue'
import SongsList from '@/pages/SongsList.vue'
import About from '@/pages/AboutPage.vue'
import NotFound from '@/pages/NotFound.vue'

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
type Component = DefineComponent<{}, {}, any>

const routes: Record<string, Component> = {
  '/': Home,
  '/songs': SongsList,
  '/about': About,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  const index = currentPath.value.slice(1) || ('/' as keyof typeof routes)
  return routes[index] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/songs">Songs</a> |
  <a href="#/non-existent-path">Broken Link</a>

  <!-- <Transition name="fade" mode="out-in" :duration="600">
    <component :is="currentView" />
  </Transition> -->
  <component :is="currentView" />
</template>
