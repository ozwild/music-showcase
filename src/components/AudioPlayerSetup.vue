<template>
  <Transition appear>
    <div id="player">
      <div class="">
        <AudioVisualizer :audioElement="audioElement" />
      </div>

      <SongList :songs="songs" :currentSong="currentSong" @click="playSong" />

      <div class="bottom-bar">
        <div class="box">
          <div class="bar-container">
            <div class="controls">
              <audio
                ref="audioElement"
                :src="currentSong?.url"
                crossOrigin="anonymous"
                controls
                autoplay
              ></audio>
              <SongInfo :song="currentSong" />
              <!-- <ProgressInformation /> -->
              <!-- <div>
                <p>MinValue: {{ minValue }}; MaxValue: {{ maxValue }}</p>
              </div> -->
              <div v-if="false">
                <a v-if="true" href="#" @click="play">Continue</a>&nbsp;
                <a v-if="true" href="#" @click="stop">Stop</a>&nbsp;
                <a v-if="true" href="#" @click="pause">Pause</a>
              </div>
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
  audio {
    width: 100%;
  }
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

    width: 90vw;
    background: darkorange;
    color: #040405;
    position: fixed;
    bottom: 2vh;
    left: 5vw;
  }
}
</style>

<script lang="ts" setup>
import { ref, Ref, provide } from 'vue'
import { $ref } from 'vue/macros'
import { IAudioPlayerOptions, ISong } from '@/types/types'
import { audioElementInjectionKey } from '../utilities/injectionKeys'

import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'
import SongList from './SongList.vue'
import AudioVisualizer from '@/components/AudioVisualizer.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

let currentSong: ISong = $ref()
const audioElement: HTMLMediaElement = $ref()
provide(audioElementInjectionKey, audioElement)
// eslint-disable-next-line vue/no-setup-props-destructure
const { songs = [] } = defineProps<IProps>()

// eslint-disable-next-line @typescript-eslint/no-empty-function
function play() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function stop() {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function pause() {}

const playSong = (song: ISong) => {
  currentSong = song
}
</script>
