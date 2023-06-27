<script setup lang="ts">
import { ISong } from '@/data/types'
import { usePlayerStore } from '@/stores/PlayerStore'

const playerStore = usePlayerStore()

const props = defineProps<{ song: ISong; shouldBeVisible: boolean }>()

function clickHandler() {
  playerStore.$state.currentSong = props.song
}
</script>

<style lang="scss" scoped>
.action {
  cursor: pointer;
}
</style>

<template>
  <transition name="el-fade-in-linear">
    <el-icon
      v-show="shouldBeVisible"
      class="action"
      :size="20"
      color="#67C23A"
      @click="clickHandler"
    >
      <VideoPlay />
    </el-icon>
  </transition>
</template>
