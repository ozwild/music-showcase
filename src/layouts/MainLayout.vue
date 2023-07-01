<script setup lang="ts">
import HeaderBar from './Header.vue'
import FooterBar from './Footer.vue'
import NowPlayingPanel from '@/player/NowPlayingPanel.vue'
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 75px;
  padding-bottom: 125px;
}
</style>

<template>
  <el-container direction="vertical">
    <HeaderBar />
    <el-main class="main-container">
      <el-row>
        <el-col :offset="3" :span="18"><slot></slot></el-col>
      </el-row>
    </el-main>
    <NowPlayingPanel />
    <FooterBar />
  </el-container>
</template>
