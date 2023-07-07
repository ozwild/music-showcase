<script setup lang="ts">
import { ref } from 'vue'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import NowPlayingIcon from '@/components/NowPlayingIcon.vue'
import PlayIcon from '@/components/PlayIcon.vue'
import PauseIcon from '@/components/PauseIcon.vue'
import { ISong } from '@/data/types'

const props = defineProps<{ song: ISong }>()
const { nowPlaying, isThisSongPlaying, play, pause, loadSong, isPlaying } =
  useMediaPlayer()

const isHoveringOver = ref(false)
const thisSongIsPlaying = ref(isThisSongPlaying(props.song))

interface ISongMouseEvent {
  song: ISong
  event: MouseEvent
}

const mouseEnterHandler: (arg0: ISongMouseEvent) => void = () => {
  isHoveringOver.value = true
}

const mouseLeaveHandler: (arg0: ISongMouseEvent) => void = () => {
  isHoveringOver.value = false
}
</script>

<style lang="scss">
.song-list-item {
  padding: 8px;
  video {
    width: 100%;
  }
  .player-actions {
    width: 1.5em;
    height: 1.5em;
  }
  &.playing {
    background-color: var(--el-bg-color);
  }
}
</style>

<template>
  <el-col
    :span="24"
    class="md-layout-item song-list-item"
    :class="{ hovering: isHoveringOver, playing: thisSongIsPlaying }"
    @mouseenter="(event: MouseEvent) => mouseEnterHandler({event, song})"
    @mouseleave="(event: MouseEvent) => mouseLeaveHandler({event, song})"
  >
    <el-row :gutter="5">
      <el-col :span="3">
        <div class="player-actions">
          <el-button
            v-if="!isHoveringOver && nowPlaying === song"
            type="primary"
            link
          >
            <NowPlayingIcon />
          </el-button>
          <el-button
            v-if="isHoveringOver && isPlaying && nowPlaying === song"
            type="info"
            @click="pause"
            link
          >
            <PauseIcon />
          </el-button>
          <el-button
            v-if="isHoveringOver && !isPlaying && nowPlaying === song"
            type="info"
            @click="play"
            link
          >
            <PlayIcon />
          </el-button>
          <el-button
            v-if="isHoveringOver && nowPlaying !== song"
            type="info"
            @click="loadSong(song)"
            link
          >
            <PlayIcon />
          </el-button>
          <!-- <Transition name="fade" mode="out-in">
            
          </Transition> -->
        </div>
      </el-col>
      <el-col :span="18">
        <el-button @click="() => loadSong(song)" :dark="true" link>
          {{ song.title }}
        </el-button>
      </el-col>
      <el-col :span="3"> </el-col>
    </el-row>
    <!-- <el-row>
      <el-col><video v-if="song.videoUrl" :src="song.videoUrl"></video></el-col>
    </el-row> -->
  </el-col>
</template>
