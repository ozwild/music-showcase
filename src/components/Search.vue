<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMediaDataStore } from '@/stores/MediaDataStore'
import { useDebounce } from '@/composables/useDebounce'

const { debounce } = useDebounce()
const mediaStore = useMediaDataStore()

const searchInput = ref(mediaStore.filterBy)

watch(searchInput, (newSearchInput) => {
  debounce(() => (mediaStore.filterBy = newSearchInput), 300)
})
</script>
<template>
  <el-input
    v-model="searchInput"
    class=""
    placeholder="Buscar"
    prefix-icon="Search"
    clearable
  />
</template>
