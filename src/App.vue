<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSongsStore } from './stores/SongBankStore'
import songs from './data/songs.json'

const songsStore = useSongsStore()
songsStore.$patch({
  allSongs: songs,
  songs,
})
</script>

<style lang="scss">
:root {
  --oz-app-bars: rgb(32, 0, 51);
}

// @import url('https://fonts.googleapis.com/css?family=Montserrat:900');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');

html {
  font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 14px;
}

body {
  margin: 0;
}
</style>

<template>
  <RouterView />
</template>
