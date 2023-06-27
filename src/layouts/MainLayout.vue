<script setup lang="ts">
import HeaderBar from './Header.vue'
import FooterBar from './Footer.vue'
</script>

<style lang="scss" scoped>
.main-container {
  padding-bottom: 125px;
  max-width: 1440px;
  margin: 0 auto;
}
</style>

<template>
  <el-container direction="vertical">
    <el-scrollbar max-height="95vh">
      <HeaderBar />
      <el-main class="main-container">
        <slot></slot>
      </el-main>
      <FooterBar />
    </el-scrollbar>
  </el-container>
</template>
