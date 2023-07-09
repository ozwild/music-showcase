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
.gg-music-note {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 2px;
  height: 14px;
  left: -3px;
  background: currentColor;
}

.gg-music-note::after,
.gg-music-note::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  border: 2px solid;
}

.gg-music-note::before {
  bottom: -4px;
  width: 8px;
  height: 8px;
  left: -6px;
  border-radius: 10px;
}

.gg-music-note::after {
  width: 10px;
  height: 6px;
  top: -4px;
  left: 0;
  border-radius: 2px;
  transform: skewY(-15deg);
}
</style>

<template>
  <i class="gg-music-note"></i>
</template>
