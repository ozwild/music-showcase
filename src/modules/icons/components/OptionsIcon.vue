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
.gg-options {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(v-bind(scale));
  width: 10px;
  height: 2px;
  box-shadow: -3px 4px 0 0, 3px -4px 0 0;
}

.gg-options::after,
.gg-options::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid;
  border-radius: 100%;
}

.gg-options::before {
  top: -7px;
  left: -4px;
}

.gg-options::after {
  bottom: -7px;
  right: -4px;
}
</style>

<template>
  <i class="gg-options"></i>
</template>
