<script setup lang="ts">
import Search from '@/components/Search.vue'
import DarkModeToggler from '@/components/DarkModeToggler.vue'
</script>

<style lang="scss" scoped>
.header.el-page-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--el-bg-color-page);

  .el-page-header__back {
    display: none;
  }

  .brand {
    font-family: Montserrat, sans-serif;
    font-size: var(--el-font-size-large);
  }
}
</style>

<style lang="scss">
.header.el-page-header {
  .el-page-header__back,
  .el-divider.el-divider--vertical {
    display: none;
  }

  .el-page-header__header {
    height: 60px;
  }
}
</style>

<template>
  <el-page-header class="header">
    <template #content>
      <RouterLink to="/" :custom="true">
        <el-button link><span class="brand">Oskar Wild</span></el-button>
      </RouterLink>
    </template>
    <template #extra>
      <Search />
      <DarkModeToggler />
    </template>
  </el-page-header>
</template>
