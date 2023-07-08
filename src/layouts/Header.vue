<script setup lang="ts">
import Search from '@/components/Search.vue'
import { useDark } from '@/composables/useDark'
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
import DarkModeIconVue from '@/components/icons/DarkModeIcon.vue'
import { onMounted } from 'vue';

const { toggle: toggleDarkMode } = useDark()

onMounted(() => {
  console.log('header mounted')
  window.toggleDark = toggleDarkMode
})
</script>

<style lang="scss" scoped>
.header.el-page-header {
  position: sticky;
  top: 0;
  padding-top: 1em;
  z-index: 50;
  background-color: var(--el-bg-color-page);

  .brand {
    font-family: Montserrat, sans-serif;
    font-size: var(--el-font-size-large);
  }

  .search-input {
    display: block;
    text-align: end;
  }

  .options-segment {
    display: inline-flex;
    align-items: center;

    .options-dropdown {
      padding: 0 10px 0 30px;
    }
    .options-icon {
      right: 1em;
      top: 0.5em;
    }

    .dark-mode-icon,
    .gg-dark-mode {
      width: 25px;
    }
  }
}
</style>

<style lang="scss">
.el-dropdown-menu__item {
  .el-icon {
    width: 25px;
    i.gg-dark-mode {
      width: 25px;
    }
  }
}
</style>

<template>
  <el-page-header class="header" icon="ArrowLeft">
    <template #content>
      <RouterLink to="/" :custom="true">
        <el-button link><span class="brand">Oskar Wild</span></el-button>
      </RouterLink>
    </template>
    <template #default> <Search class="search-input" /> </template>
    <template #extra>
      <div class="options-segment">
        <el-dropdown class="options-dropdown" trigger="click">
          <span class="el-dropdown-link">
            <OptionsIcon class="options-icon" />
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="DarkModeIconVue" @click="toggleDarkMode">
                Dark Mode
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>
