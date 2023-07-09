<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useMediaPlayer } from '../player/useMediaPlayer'

const { setVolume, volume, muted } = useMediaPlayer()

const value = ref(volume * 100)

watch(value, (newValue) => {
  setVolume(newValue / 100)
  muted.value = newValue === 0
})
</script>
<style lang="scss">
.slider-block {
  width: 72px;

  .el-slider__bar {
    background-color: var(--el-menu-text-color);
  }

  .el-slider__button.el-tooltip__trigger.el-tooltip__trigger {
    border-color: var(--el-menu-text-color);

    width: 12px;
    height: 12px;
  }
}
</style>
<template>
  <div class="slider-block">
    <el-slider v-model="value" :show-tooltip="false" />
  </div>
</template>
