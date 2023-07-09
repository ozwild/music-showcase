<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import { useMediaQueries } from '@/composables/useMediaQueries'
import { PlayIcon, PauseIcon, MusicNoteIcon } from '@/modules/icons'

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
    :max-height="512"
    empty-text=""
    table-layout="auto"
    @cellMouseEnter="(song: ISong) => hoveredSong = song"
    @cellMouseLeave="hoveredSong = null"
  >
    <el-table-column width="64" align="right">
      <template #default="{ row: song }">
        <el-button
          v-if="hoveredSong !== song && nowPlaying === song"
          type="danger"
          link
        >
          <MusicNoteIcon :scale="0.75" />
        </el-button>
        <el-button
          v-if="hoveredSong === song && isPlaying && nowPlaying === song"
          type="warning"
          @click="pause"
          link
        >
          <PauseIcon :scale="1" />
        </el-button>
        <el-button
          v-if="hoveredSong === song && !isPlaying && nowPlaying === song"
          type="danger"
          @click="play"
          link
        >
          <PlayIcon />
        </el-button>
        <el-button
          v-if="hoveredSong === song && nowPlaying !== song"
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
@/modules/icons
