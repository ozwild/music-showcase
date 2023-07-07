<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import PlaceholderImage from '@/components/PlaceholderImage.vue'
import { useMediaQueries } from '@/composables/useMediaQueries'

const { nowPlaying } = useMediaPlayer()
const { isOnSmallScreen } = useMediaQueries()
</script>

<style lang="scss" scoepd>
.segment {
  display: flex;
  height: 100%;

  &.song-segment {
    justify-content: center;
    align-items: center;
  }
}

p {
  margin: 0;
}

.art {
  width: 64px;
  margin: 0 8px;
}
.title {
  font-size: 1.1em;
  line-height: 1.75;
}
.artist,
.genre,
.title {
  padding: 0 4px;
}
</style>

<template>
  <div class="segment player-segment" v-if="nowPlaying">
    <div>
      <PlaceholderImage class="art" />
    </div>
    <div>
      <p class="title">{{ nowPlaying.title }}</p>
      <p v-if="!isOnSmallScreen">
        <span class="artist">{{ nowPlaying.albumArtist?.name }}</span> •
        <span class="genre">{{ nowPlaying.albumArtist?.genre?.name }}</span>
      </p>
    </div>
  </div>
</template>
