<script setup lang="ts">
import { watch, ref, Ref } from 'vue'
import HeaderBar from './Header.vue'
import FooterBar from './Footer.vue'
import NowPlayingPanel from '@/modules/nowPlaying/NowPlayingPanel.vue'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'

const canvasContainer: Ref<HTMLDivElement | null> = ref(null)

const { videoCanvasElement } = useMediaPlayer()

watch(canvasContainer, () => {
  // @TODO create canvas container as a component based on MediaShell
  // It's not possible to add VideoCanvas to 2 different places
  canvasContainer.value?.append(videoCanvasElement.value)
})
</script>

<style lang="scss" scoped>
.main-container {
  padding-bottom: 80px;
}
</style>

<template>
  <el-container direction="vertical">
    <HeaderBar />

    <el-container>
      <el-main class="main-container">
        <slot></slot>
        <div ref="canvasContainer"></div>
        <NowPlayingPanel />
      </el-main>
    </el-container>
    <el-affix position="bottom">
      <FooterBar />
    </el-affix>
  </el-container>
</template>
