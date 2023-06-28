<script setup lang="ts">
import HeaderBar from './Header.vue'
import FooterBar from './Footer.vue'
import PlayerOverlay from '@/components/PlayerOverlay.vue'
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
    <!-- <el-scrollbar max-height="calc(100% - 120px)">
      <HeaderBar />
      <el-main class="main-container">
        <slot></slot>
      </el-main>
      <PlayerOverlay />
      <FooterBar />
    </el-scrollbar> -->
    <HeaderBar />
    <el-main class="main-container">
      <slot></slot>
    </el-main>
    <PlayerOverlay />
    <FooterBar />
  </el-container>
</template>
