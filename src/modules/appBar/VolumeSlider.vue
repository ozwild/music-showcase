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
  /* display: flex;
  align-items: center;
  position: relative;
  bottom: 0.5em;
  right: -0.5em;
  padding-bottom: 1em; */

  .el-slider__button.el-tooltip__trigger.el-tooltip__trigger {
    border: none;
    width: 10px;
    height: 10px;
  }
}
.slider-demo-block .el-slider {
  /* margin-top: 0;
  margin-left: 12px; */
}
</style>
<template>
  <div class="slider-block">
    <el-slider v-model="value" :show-tooltip="false" />
  </div>
</template>
