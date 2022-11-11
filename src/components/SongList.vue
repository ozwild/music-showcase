<template>
  <div class="list-container" :class="{ ['light-theme']: lightTheme }">
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
  max-height: calc(80vh - 5em);
  overflow-y: auto;
  position: relative;
  z-index: 100;
  top: 5em;

  &.light-theme {
    .list {
      .li {
        filter: opacity(0.18);
        background: yellow;
        color: crimson;

        &.active {
          filter: opacity(0.8);
          background: crimson;
          color: lightpink;
        }
      }
      &:hover {
        .li:not(:hover) {
          filter: opacity(0.28);
        }
        .li:hover {
          filter: opacity(1);
        }
      }
    }
  }

  .list {
    .li {
      filter: opacity(0.08);
      background: yellow;
      color: crimson;
      &.active {
        filter: opacity(0.8);
      }
    }
    &:hover {
      .li:not(:hover):not(.active) {
        filter: opacity(0.18);
      }
      .li:hover {
        filter: opacity(1);
      }
    }
  }
}

.li {
  padding: 2px 15px 6px 4px;
  display: inline flow-root list-item;
  display: inline-flex;
  font-size: xx-large;
  transform: scale(0.7);
  cursor: pointer;
  transition: all 0.75s;
  &.active {
    background: black;
    transform: scale(0.7) rotatez(-3deg);
    color: white;
  }
  &:hover:not(.active) {
    filter: opacity(1);
    transform: scale(1) rotatez(-3deg);
    transition: all 0.2s;
    z-index: 1000;
  }
}
</style>

<script lang="ts" setup>
import { inject } from 'vue'
import { lightThemeInjectionKey } from '@/utilities/injectionKeys'
import { ILightThemeInjection, ISong } from '@/types/types'

interface IProps {
  songs: ISong[]
  currentSong: ISong | null
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const { lightTheme } = inject(lightThemeInjectionKey) as ILightThemeInjection

defineEmits<{
  (e: 'click', song: ISong): void
}>()
</script>
