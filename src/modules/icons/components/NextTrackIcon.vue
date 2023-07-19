<script lang="ts">
import { defineComponent } from 'vue'
import { sharedIconProps } from '@/modules/icons/composables/useIconProps'

export default defineComponent({
  props: {
    ...sharedIconProps,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.gg-play-track-next {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 3px;
  height: 10px;
  background: currentColor;
}

.gg-play-track-next::after {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 0;
  height: 10px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid;
  left: -7px;
}
</style>

<template>
  <i class="gg-play-track-next"></i>
</template>
