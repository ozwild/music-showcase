<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import SongListItem from '@/templates/SongListItem.vue'

import { useSongsStore } from '@/stores/SongBankStore'

const songsStore = useSongsStore()
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
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
        v-for="song in songsStore.songs"
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
        v-for="song in songsStore.songs"
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
        v-for="song in songsStore.songs"
        :key="song.id"
        :song="song"
      />
    </TransitionGroup>
  </MainLayout>
</template>
@/stores/SongBankStore
