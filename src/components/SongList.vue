<template>
  <div class="list-container" :class="{ lightTheme }">
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
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
      <li
        class="li"
        :class="{ active: currentSong?.id === song.id }"
        v-for="song in songs"
        :key="song.id"
        @click="$emit('click', song)"
      >
        {{ song.title }}
      </li>
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
.list-container {
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  z-index: 100;

  &.lightTheme {
    .li {
      background: black;
      color: snow;

      &.active {
        background: white;
        color: black;
      }
    }
  }
}
.list {
  .li {
    filter: opacity(0.12);
  }
  &:hover {
    .li:not(:hover) {
      filter: opacity(0.38);
    }
    .li:hover {
      filter: opacity(1);
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
  transition: all 0.75s;
  &.active {
    background: black;
    color: white;
  }
  &:hover {
    transform: scale(1);
    transition: all 0.2s;
    z-index: 1000;
  }
}
</style>

<script lang="ts" setup>
import { ISong } from '@/types/types'

interface IProps {
  songs: ISong[]
  currentSong: ISong | null
  lightTheme: boolean
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()
defineEmits<{
  (e: 'click', song: ISong): void
}>()
</script>
