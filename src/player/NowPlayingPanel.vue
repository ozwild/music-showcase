<script setup lang="ts">
import Analyzer from '@/analizer/Analyzer.vue'
import { useSettingsStore } from '@/stores/SettingsStore'

const settings = useSettingsStore()

settings.$subscribe((_, { showNowPlayingPanel }) => {
  settings.runAnalyzer = !showNowPlayingPanel
})
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 58px;
  right: auto;
  width: 100%;
  height: calc(100% - 120px);
  background-color: var(--el-bg-color-page);

  .analyzer-panel {
    position: absolute;
    bottom: 0;
    right: -8%;
    width: 130%;
    height: 100px;
    opacity: 1;
    z-index: 1;
  }

  .background-dark-overlay {
    position: absolute;
    top: 0;
    right: -8%;
    width: 130%;
    height: 100%;
    z-index: 2;
    background-image: linear-gradient(
      180deg,
      var(--el-bg-color-page),
      rgba(25 25 25 / 20%),
      transparent
    );
  }

  .background-reflection-overlay {
    position: absolute;
    top: 0;
    right: -8%;
    width: 130%;
    height: 100%;
    z-index: 2;
    background-image: linear-gradient(
      190deg,
      transparent 12%,
      rgba(255, 120, 255, 0.05),
      transparent 60%
    );
  }

  .bottom-panel {
    height: 35vh;
  }
}
</style>

<template>
  <transition name="el-zoom-in-bottom">
    <div v-show="settings.showNowPlayingPanel" class="container">
      <div class="analyzer-panel"><Analyzer /></div>
      <el-row>
        <el-col :span="24"> Now Playing </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"> </el-col>
      </el-row>
      <el-row>
        <el-col class="bottom-panel" :span="24"></el-col>
      </el-row>
    </div>
  </transition>
</template>
