<template>
  <Transition appear>
    <div id="player">
      <div class="layer background-layer">
        <AudioVisualizer />
      </div>

      <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />

      <div class="bottom-bar">
        <div class="box">
          <div class="bar-container">
            <div class="controls">
              <SongInfo :song="currentSong" />
              <ProgressInformation :audioPlayer="audioPlayerComposable" />
              <!-- <div>
                <p>MinValue: {{ minValue }}; MaxValue: {{ maxValue }}</p>
              </div> -->
              <a v-if="!isPlaying" href="#" @click="play">Continue</a>&nbsp;
              <a v-if="isPlaying" href="#" @click="stop">Stop</a>&nbsp;
              <a v-if="isPlaying" href="#" @click="pause">Pause</a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
#player {
  font-size: 1rem;
  .bottom-bar {
    .box {
      padding: 1em 1.3em;
    }
    .bar-container {
      display: flex;
      .controls {
        background-color: yellow;
        min-width: 250px;
        flex: 1;
      }
    }

    background: darkorange;
    color: #040405;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, provide, inject } from 'vue'
import { $ref, $, $$ } from 'vue/macros'
import { IAudioPlayer, IAudioPlayerOptions, ISong } from '@/types/types'
import { playerInjectionKey } from '@/utilities/injectionKeys'

import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
import AudioVisualizer from '@/components/AudioVisualizer.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong = $ref()

// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

const audioPlayerComposable = inject(playerInjectionKey) as IAudioPlayer

const {
  useSound,
  play,
  stop,
  pause,
  isPlaying,
  context,
  gainNode,
  instance: audioPlayer,
} = $(audioPlayerComposable)

watch($$(audioPlayer), (value) => {
  if (value) {
    console.log('AUDIO PLAYER CHANGED', value)
  }
})

const playSong = (song: ISong) => {
  currentSong = song
  useSound(song.url)
}
</script>
