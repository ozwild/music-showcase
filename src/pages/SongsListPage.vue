<script setup lang="ts">
import { useMediaDataStore } from '@/stores/MediaDataStore'
import MainLayout from '@/layouts/MainLayout.vue'
import SongListItem from '@/templates/SongListItem.vue'

const mediaDataStore = useMediaDataStore()
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>

<template>
  <MainLayout>
    <TransitionGroup
      name="list"
      tag="div"
      class="el-row is-justify-space-evenly song-list-container"
      :gutter="0"
    >
      <SongListItem
        v-for="song in mediaDataStore.filteredSongs"
        :key="song.id"
        :song="song"
      />
    </TransitionGroup>
    <TransitionGroup
      name="list"
      tag="div"
      class="el-row is-justify-space-evenly song-list-container"
      :gutter="0"
    >
      <SongListItem
        v-for="song in mediaDataStore.filteredSongs"
        :key="song.id"
        :song="song"
      />
    </TransitionGroup>
    <TransitionGroup
      name="list"
      tag="div"
      class="el-row is-justify-space-evenly song-list-container"
      :gutter="0"
    >
      <SongListItem
        v-for="song in mediaDataStore.filteredSongs"
        :key="song.id"
        :song="song"
      />
    </TransitionGroup>
  </MainLayout>
</template>
