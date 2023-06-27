<script setup lang="ts">
import { ISong } from '@/data/types'
defineProps<{ song: ISong; shouldBeVisible: boolean }>()
</script>

<style lang="scss" scoped>
.action {
  cursor: pointer;
}
</style>

<template>
  <transition name="el-fade-in-linear">
    <el-icon v-show="shouldBeVisible" class="action" :size="20" color="#67C23A">
      <VideoPlay />
    </el-icon>
  </transition>
</template>
