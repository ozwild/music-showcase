<script lang="ts">
const { defaultProps } = useIconProps()
</script>

<script setup lang="ts">
import {
  IIconSharedProps,
  useIconProps,
} from '@/modules/icons/composables/useIconProps'
withDefaults(defineProps<IIconSharedProps>(), { ...defaultProps })
</script>
<style lang="scss" scoped>
.gg-play-button {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 12px;
  height: 12px;
}

.gg-play-button::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 0;
  height: 10px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid;
  top: 6px;
  top: 2px;
  left: 9px;
  left: 4px;
}
</style>
<template>
  <i class="gg-play-button"></i>
</template>
