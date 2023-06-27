<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSongsStore } from '@/stores/SongBankStore'
import { useDebounce } from '@/composables/useDebounce'

const songStore = useSongsStore()
const searchInput = ref(songStore.filterBy)
const { debounce } = useDebounce()

watch(searchInput, (newSearchInput) => {
  debounce(() => songStore.filter(newSearchInput))
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
