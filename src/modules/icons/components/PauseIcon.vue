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
.gg-play-pause {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 8px;
  height: 10px;
  border-left: 3px solid;
  border-right: 3px solid;
}
</style>
<template>
  <i class="gg-play-pause"></i>
</template>
