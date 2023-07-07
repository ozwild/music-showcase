<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useMediaQueries } from '@/composables/useMediaQueries'
import PlayIcon from '@/components/PlayIcon.vue'
import PauseIcon from '@/components/PauseIcon.vue'
import NowPlayingIcon from '@/components/NowPlayingIcon.vue'
import { ISong } from '@/data/types'

defineProps<{ songs: ISong[]; title: string }>()

const { currentScreenSize, ScreenSize, isOnSmallScreen } = useMediaQueries()
const { nowPlaying, play, pause, loadSong, isPlaying } = useMediaPlayer()

const hoveredSong: Ref<ISong | null> = ref(null)
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.75em;
  &.bigScreen {
    font-size: 2.5em;
  }
}
</style>

<template>
  <h2 :class="{ bigScreen: !isOnSmallScreen }">{{ title }}</h2>

  <el-table
    :data="songs"
    style="width: 100%"
    table-layout="auto"
    @cellMouseEnter="(song: ISong) => hoveredSong = song"
    @cellMouseLeave="hoveredSong = null"
  >
    <el-table-column width="70">
      <template #default="{ row: song }">
        <el-button
          v-if="hoveredSong !== song && nowPlaying === song"
          type="primary"
          link
        >
          <NowPlayingIcon />
        </el-button>
        <el-button
          v-if="hoveredSong === song && isPlaying && nowPlaying === song"
          type="info"
          @click="pause"
          link
        >
          <PauseIcon />
        </el-button>
        <el-button
          v-if="hoveredSong === song && !isPlaying && nowPlaying === song"
          type="info"
          @click="play"
          link
        >
          <PlayIcon />
        </el-button>
        <el-button
          v-if="hoveredSong === song && nowPlaying !== song"
          type="info"
          @click="loadSong(song)"
          link
        >
          <PlayIcon />
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="Titulo">
      <template #default="{ row: song }">
        <el-button @click="() => loadSong(song)" :dark="true" link>
          {{ song.title }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      v-if="currentScreenSize !== ScreenSize.Small"
      prop="albumArtist.name"
      label="Original de"
    />
    <el-table-column
      v-if="currentScreenSize >= ScreenSize.Medium"
      prop="albumArtist.genre.name"
      label="Genero"
    />
  </el-table>
</template>
