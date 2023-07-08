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
  padding-bottom: 150px;
  .background-layers {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    mix-blend-mode: soft-light;
    .image-layer {
      width: 100%;
      height: 100%;
      background-image: url('../resources/bg-2.png');
      background-size: cover;
      background-attachment: fixed;
      background-position: 50% 30%;
    }
  }
}
</style>

<template>
  <el-container direction="vertical">
    <HeaderBar />

    <el-container>
      <el-main class="main-container">
        <div class="background-layers">
          <div class="image-layer"></div>
        </div>
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
