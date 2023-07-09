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
.gg-volume {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 8px;
  height: 8px;
  border: 2px solid;
  border-right: 0;
  -webkit-perspective: 12px;
  perspective: 12px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.gg-volume::after,
.gg-volume::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
}

.gg-volume::before {
  left: 2px;
  transform: rotateY(-90deg);
  width: 10px;
  height: 10px;
  border: 2px solid;
  border-left: 0;
  top: -3px;
}

.gg-volume::after {
  width: 8px;
  height: 16px;
  border: 6px double;
  border-left: 0;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  right: -14px;
  top: -6px;
}
</style>

<template>
  <i class="gg-volume"></i>
</template>
