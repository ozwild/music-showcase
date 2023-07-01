<script setup lang="ts">
import { useMediaPlayer } from '@/player/useMediaPlayer'
import { useSettingsStore } from '@/stores/SettingsStore'

const { showNowPlayingPanel, toggleNowPlayingPanel } = useSettingsStore()
const { nowPlaying } = useMediaPlayer()
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--el-bg-color);
  background-color: var(--el-bg-color-page);
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
  z-index: 1;

  .footer-base {
    width: 100%;
  }
  .footer-options {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>

<template>
  <transition name="el-zoom-in-bottom">
    <el-footer class="footer" v-if="nowPlaying">
      <div class="footer-base">
        <el-row justify="center">
          <el-col :xs="24" :sm="18" :md="12">
            <div class="footer-options">
              <span>{{ nowPlaying.title }}</span>
              <span>Play/Pause</span>
              <span>Scrub</span>
              <span>Volume</span>
              <el-button
                :icon="showNowPlayingPanel ? 'Upload' : 'More'"
                @click="toggleNowPlayingPanel"
                link
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-footer>
  </transition>
</template>
@/stores/SystemStore
