<script setup lang="ts">
import SongLink from '@/components/SongLink.vue'
import PlayLink from '@/components/PlayPauseAction.vue'
import { ISong } from '@/data/types'
import { ref } from 'vue'

defineProps<{ song: ISong }>()

const isHovering = ref(false)

interface ISongMouseEvent {
  song: ISong
  event: MouseEvent
}

const mouseEnterHandler: (arg0: ISongMouseEvent) => void = () =>
  (isHovering.value = true)

const mouseLeaveHandler: (arg0: ISongMouseEvent) => void = () =>
  (isHovering.value = false)
</script>

<style lang="scss">
.song-list-item {
  height: 6em;
  video {
    width: 100%;
  }
  &.hovering {
    background-color: rgba(255 255 255 / 8%);
  }
}
</style>

<template>
  <el-col
    :xs="18"
    :sm="12"
    :md="8"
    :lg="6"
    :xl="4"
    class="md-layout-item song-list-item"
    :class="{ hovering: isHovering }"
    @mouseenter="(event: MouseEvent) => mouseEnterHandler({event, song})"
    @mouseleave="(event: MouseEvent) => mouseLeaveHandler({event, song})"
  >
    <el-row :gutter="5">
      <el-col :span="3">
        <PlayLink :song="song" :should-be-visible="isHovering" />
      </el-col>
      <el-col :span="18">
        <!-- <el-badge class="item" is-dot>
          <PlayLink :song="song" />
        </el-badge> -->
        <SongLink :song="song" />
      </el-col>
      <el-col :span="6"> </el-col>
    </el-row>
    <!-- <el-row>
      <el-col><video v-if="song.videoUrl" :src="song.videoUrl"></video></el-col>
    </el-row> -->
  </el-col>
</template>
