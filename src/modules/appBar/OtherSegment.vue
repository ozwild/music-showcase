<script setup lang="ts">
import { useSettingsStore } from '@/stores/SettingsStore'
import VolumeControl from './VolumeControl.vue'

const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.other-segment {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;

  .volume-control {
    padding: 0 0.75em;
    cursor: pointer;
  }
  .toggle-panel-button {
    padding: 0 1.5em 0 1em;
  }
}
</style>

<template>
  <div class="other-segment">
    <VolumeControl class="volume-control" />
    <el-button
      class="toggle-panel-button"
      @click="settingsStore.toggleNowPlayingPanel"
      link
    >
      <el-icon :size="24" v-if="settingsStore.showNowPlayingPanel">
        <ArrowDownBold />
      </el-icon>
      <el-icon :size="24" v-else>
        <ArrowUpBold />
      </el-icon>
    </el-button>
  </div>
</template>
