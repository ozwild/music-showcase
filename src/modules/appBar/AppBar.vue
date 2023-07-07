<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'

import PlayerSegment from './PlayerSegment.vue'
import SongSegment from './SongSegment.vue'
import OtherSegment from './OtherSegment.vue'
import Scrubber from './Scrubber.vue'

const { nowPlaying } = useMediaPlayer()
</script>

<style lang="scss" scoped>
.app-bar {
  width: 100%;
  justify-content: space-evenly;
}
</style>

<template>
  <div class="app-bar" v-if="nowPlaying">
    <Scrubber />
    <el-row>
      <el-col :span="8">
        <SongSegment />
      </el-col>

      <el-col :span="8">
        <PlayerSegment />
      </el-col>

      <el-col :span="8">
        <OtherSegment />
      </el-col>
    </el-row>
  </div>
</template>
