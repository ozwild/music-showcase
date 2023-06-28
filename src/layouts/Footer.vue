<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore'
import { useAppStore } from '@/stores/AppStore'

const appStore = useAppStore()
const playerStore = usePlayerStore()
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--oz-app-bars);
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
    <el-footer class="footer" v-if="playerStore.currentSong">
      <div class="footer-base">
        <el-row justify="center">
          <el-col :xs="24" :sm="18" :md="12">
            <div class="footer-options">
              <span>{{ playerStore.currentSong?.title ?? '' }}</span>
              <span>Play/Pause</span>
              <span>Scrub</span>
              <span>Volume</span>
              <el-button
                :icon="appStore.showPlayerOverlay ? 'Upload' : 'More'"
                @click="appStore.togglePlayerOverlay"
                link
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-footer>
  </transition>
</template>
