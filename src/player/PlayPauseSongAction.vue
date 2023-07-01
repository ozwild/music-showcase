<script setup lang="ts">
import { useMediaPlayer } from '@/player/useMediaPlayer'
import { ISong } from '@/data/types'
import { ref } from 'vue'

const thisSongIsPlaying = ref(false)
const iconSize = ref(20)

const props = defineProps<{ song: ISong; shouldBeVisible: boolean }>()

const { isPlaying, nowPlaying, play, pause, isThisSongPlaying, listen } =
  useMediaPlayer()

listen.onPlayerStateChange(
  () => (thisSongIsPlaying.value = isThisSongPlaying(props.song))
)
</script>

<template>
  <Transition name="el-fade-in-linear" mode="out-in">
    <el-button
      v-if="thisSongIsPlaying && isPlaying"
      type="warning"
      @click="pause"
      link
    >
      <el-icon :size="iconSize"><VideoPause /></el-icon>
    </el-button>
    <el-button v-else-if="thisSongIsPlaying" type="success" @click="play" link>
      <el-icon :size="iconSize"><VideoPlay /></el-icon>
    </el-button>
    <el-button
      v-else
      type="success"
      @click="
        () => {
          nowPlaying = song
        }
      "
      link
    >
      <el-icon :size="iconSize"><VideoPlay /></el-icon>
    </el-button>
  </Transition>
</template>
