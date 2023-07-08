<script setup lang="ts">
import DarkModeIcon from '@/components/icons/DarkModeIcon.vue'
import { useDark } from '@/composables/useDark'

const { isDark, toggle } = useDark()
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
</style>

<template>
  <DarkModeIcon class="icon" :class="{ isDarK: isDark }" @click="toggle" />
</template>
