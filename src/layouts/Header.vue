<script setup lang="ts">
import Search from '@/components/Search.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style lang="scss">
.header {
  background-color: var(--el-bg-color);
  background-color: var(--el-bg-color-page);
  position: fixed;
  width: 100%;
  z-index: 1;

  .header-base {
    width: 100%;

    .brand {
      font-family: Montserrat, sans-serif;
      font-size: var(--el-font-size-large);
    }
  }
}
</style>

<template>
  <el-header class="header">
    <div class="header-base">
      <el-page-header title="Home" @back="goHome">
        <template #content>
          <h3 class="brand">Oskar Wild</h3>
        </template>
        <template #extra>
          <Search />
        </template>
      </el-page-header>
    </div>
  </el-header>
</template>
