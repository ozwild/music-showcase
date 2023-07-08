<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import Analyzer from '@/modules/analizer/Analyzer.vue'
import { useDark } from '@/composables/useDark'
import { useAppStore } from '@/stores'
import { useMediaPlayer } from '../player/useMediaPlayer'

const canvasContainer: Ref<HTMLDivElement | null> = ref(null)

const app = useAppStore()
const { isDark } = useDark()
const { videoCanvasElement, nowPlaying } = useMediaPlayer()

watch(
  () => app.showNowPlayingPanel,
  (showNowPlayingPanel) => {
    app.runAnalyzer = !showNowPlayingPanel
  }
)

watch(canvasContainer, () => {
  canvasContainer.value?.append(videoCanvasElement.value)
})
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 92px;
  right: 0;
  width: 100%;
  height: calc(100% - 145px);
  background-color: var(--el-bg-color-page);
  z-index: 100;

  .song-details-panel {
    height: 5em;
  }

  .small-screen-video-spacer {
    height: 1em;
  }

  .video-panel {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    height: 23em;
    max-height: 50vh;
  }

  .background-layers {
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    &.dark {
      .background-color-overlay {
        mix-blend-mode: difference;
      }

      .background-dark-overlay {
        mix-blend-mode: overlay;
        background-image: linear-gradient(180deg, black, rgb(50, 10, 16), #222);
      }
    }

    .image-layer {
      width: 100%;
      height: 100%;
      background-image: url('../../resources/bg-2.png');
      background-size: cover;
      background-attachment: fixed;
      background-position: 50% 30%;
    }
    .analyzer-panel {
      position: absolute;
      bottom: 0;
      right: -100%;
      width: 200%;
      height: 100%;
      opacity: 1;
      z-index: 1;

      > div {
        height: 100%;
      }
    }
    .background-dark-overlay,
    .background-reflection-overlay,
    .background-color-overlay {
      position: absolute;
      top: 0;
      right: -8%;
      width: 130%;
      height: 100%;
    }

    .background-dark-overlay {
      z-index: 2;
      background-image: linear-gradient(
        180deg,
        var(--el-bg-color-page),
        rgba(25 25 25 / 20%),
        transparent
      );
    }

    .background-reflection-overlay {
      z-index: 3;
      background-image: linear-gradient(
        180deg,
        transparent 12%,
        rgba(255, 120, 255, 0.05),
        transparent 60%
      );
    }

    .background-color-overlay {
      background: cadetblue;
      mix-blend-mode: screen;
    }
  }

  .bottom-panel {
    height: 35vh;
  }
}
</style>

<style lang="scss">
.container {
  .song-details-panel {
    .song-title,
    .song-album-artist {
      margin: 0 20px;
      text-shadow: var(--el-box-shadow-lighter);
    }
    .song-title {
      font-size: var(--el-font-size-larger);
    }
    .song-album-artist {
      font-size: var(--el-font-size-large);
    }
  }
  .video-panel {
    canvas {
      border-radius: 8px;
      pointer-events: none;
    }
  }
}
</style>

<template>
  <transition name="el-zoom-in-bottom">
    <div v-show="app.showNowPlayingPanel" class="container">
      <div class="background-layers" :class="{ dark: isDark }">
        <div class="image-layer"></div>
        <div class="analyzer-panel"><Analyzer /></div>
        <div class="background-color-overlay"></div>
        <div class="background-dark-overlay"></div>
        <div class="background-reflection-overlay"></div>
      </div>
      <div class="content-layers">
        <el-row>
          <el-col :span="24" class="hidden-md-and-down">
            <div class="song-details-panel">
              <h3 class="song-title">{{ nowPlaying?.title }}</h3>
              <h4 class="song-album-artist">
                {{ nowPlaying?.albumArtist?.name }}
              </h4>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="12" :lg="24">
            <div class="small-screen-video-spacer hidden-md-and-up"></div>
            <div class="video-panel" ref="canvasContainer"></div>
          </el-col>
          <el-col :span="16" class="hidden-md-and-up">
            <div class="song-details-panel">Now Playing</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="bottom-panel" :span="24"> </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
