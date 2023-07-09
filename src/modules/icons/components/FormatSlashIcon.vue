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
.gg-format-slash {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: rotate(25deg) scale(v-bind(scale));
  width: 2px;
  height: 14px;
  background: currentColor;
  border-radius: 3px;
}
</style>

<template>
  <i class="gg-format-slash"></i>
</template>
