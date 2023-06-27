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
  background-color: var(--oz-app-bars);
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);
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
  <el-affix>
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
  </el-affix>
</template>
