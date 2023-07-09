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
