<script setup lang="ts"></script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--oz-app-bars);
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-light);

  .footer-base {
    width: 100%;
  }
  .footer-options {
    display: flex;
    justify-content: space-around;
  }
}
</style>

<template>
  <el-footer class="footer">
    <div class="footer-base">
      <el-row justify="center">
        <el-col :xs="24" :sm="18" :md="12">
          <div class="footer-options">
            <span>Now Playing</span>
            <span>Play/Pause</span>
            <span>Scrub</span>
            <span>Volume</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-footer>
</template>
