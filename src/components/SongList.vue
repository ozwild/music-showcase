<template>
  <div>
    <ol class="list">
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.list {
  &:hover {
    .li:not(:hover) {
      filter: opacity(0.18);
    }
  }
}
.li {
  background: white;
  padding: 2px 15px 6px 4px;
  display: inline flow-root list-item;
  display: inline-flex;
  font-size: xx-large;
  transform: scale(0.7);
  cursor: pointer;
  transition: all 0.6s;
  &.active {
    background: black;
    color: white;
  }
  &:hover {
    transform: scale(1);
    transition: all 0.3s;
    z-index: 1000;
  }
}
</style>

<script lang="ts" setup>
import { ISong } from '@/types/types'

interface IProps {
  songs: ISong[]
  currentSong: ISong | null
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()
defineEmits<{
  (e: 'click', song: ISong): void
}>()
</script>
