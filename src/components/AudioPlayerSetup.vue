<template>
  <div id="player">
    <div>
      <ol>
        <li v-for="song in songs" :key="song.id" @click="() => playSong(song)">
          {{ song.title }}
        </li>
      </ol>
    </div>
    <div class="bottom-bar">
      <div class="box">
        <div>
          <div>Is Playing: {{ isPlaying ? 'Yes' : 'No' }}</div>
          <div>
            <SongInfo :song="currentSong" />
            <ProgressInformation :audioPlayer="audioPlayer" />
          </div>
        </div>
      </div>
      <div>
        <button v-if="!isPlaying" @click="() => play()">Play</button>
        <button v-if="isPlaying" @click="() => stop()">Stop</button>
        <button v-if="isPlaying" @click="() => pause()">Pause</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#player {
  font-size: 1rem;
  .bottom-bar {
    .box {
      padding: 1em 1.3em;
    }
    background-color: yellow;
    color: #040405;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { IAudioPlayerOptions, ISong } from '@/types/types'
import { useAudioPlayer } from '@/composables/useAudioPlayer'
import ProgressInformation from '@/components/ProgressInformation.vue'
import SongInfo from '@/components/SongInfo.vue'

interface IProps extends IAudioPlayerOptions {
  songs: ISong[]
}

const currentSong: Ref<ISong | null> = ref(null)

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  songs = [],
  autoPlay = false,
  loop = false,
  preload = true,
  html5 = false,
  formats = [],
  xhr = undefined,
} = defineProps<IProps>()

const audioPlayer = useAudioPlayer({
  autoPlay,
  loop,
  preload,
  html5,
  formats,
  xhr,
})

const { useSound, play, stop, pause, isPlaying } = audioPlayer

const playSong = (song: ISong) => {
  currentSong.value = song
  useSound(song.url)
}
</script>
