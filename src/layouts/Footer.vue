<script setup lang="ts">
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import AppBar from '@/modules/appBar/AppBar.vue'

const { nowPlaying } = useMediaPlayer()
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--el-bg-color);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  height: 90px;
  box-shadow: var(--el-box-shadow-light);
}
</style>

<template>
  <transition name="el-zoom-in-bottom">
    <div class="footer" v-if="nowPlaying">
      <AppBar />
    </div>
  </transition>
</template>
