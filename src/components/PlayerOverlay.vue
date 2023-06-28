<script setup lang="ts">
import Analyzer from '@/analizer/Analyzer.vue'
import { useAnalyzerStore } from '@/stores/AnalyzerStore'
import { useAppStore } from '@/stores/AppStore'

const appStore = useAppStore()
const analyzerStore = useAnalyzerStore()

if (appStore.showPlayerOverlay) {
  console.log('APP STORE STATE AT OVERLAY', appStore.showPlayerOverlay)
}

appStore.$subscribe((mutation, { showPlayerOverlay }) => {
  console.log('app store subscription', mutation, showPlayerOverlay)
  analyzerStore.standby = !showPlayerOverlay
})
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 58px;
  right: auto;
  width: 100%;
  height: 80%;
  background-color: #121212;

  .analyzer-panel {
    position: absolute;
    top: 0;
    right: -8%;
    width: 130%;
    height: 100%;
    opacity: 0.7;
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
      #111012,
      rgba(0 0 0 / 40%),
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
    <div v-show="appStore.showPlayerOverlay" class="container">
      <div class="analyzer-panel"><Analyzer /></div>
      <div class="background-dark-overlay"></div>
      <div class="background-reflection-overlay"></div>
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
