<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import LatestSongs from '@/modules/home/LatestSongs.vue'
import SongList from '@/modules/home/SongList.vue'
</script>

<template>
  <MainLayout>
    <LatestSongs />
    <SongList />
  </MainLayout>
</template>
