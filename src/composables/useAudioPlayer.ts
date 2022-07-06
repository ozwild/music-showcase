import { Howl, HowlCallback } from 'howler'
import { computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import type { Ref } from 'vue'

import {
  IAudioPlayerOptions,
  IInterval,
  IHowlEvent,
  IAudioPlayer,
} from '@/types/types'
import { clamp } from '@/composables/useClamp'
import { pipe } from '@/composables/usePipe'

const defaultSettings = {
  muted: false,
  volume: 1.0,
  rate: 1.0,
}

const defaultOptions: IAudioPlayerOptions = {
  autoPlay: false,
  loop: false,
  preload: true,
  html5: false,
  formats: ['audio/mpeg'],
  xhr: undefined,
}

export function useAudioPlayer(options?: IAudioPlayerOptions): IAudioPlayer {
  const howl: Ref<Howl | null | undefined> = ref()
  const context: Ref<AudioContext> = ref(new AudioContext())
  const gainNode: Ref<GainNode> = ref(new GainNode(context.value))

  const source: Ref<string | null> = ref(null)
  const duration: Ref<number> = ref(0)
  const isPlaying: Ref<boolean> = ref(false)
  const muted: Ref<boolean> = ref(defaultSettings.muted)
  const volume: Ref<number> = ref(defaultSettings.volume)
  const rate: Ref<number> = ref(defaultSettings.rate)
  const seek: Ref<number> = ref(1.0)
  const polls: Ref<{ seek: IInterval }> = ref({
    seek: {
      id: null,
      interval: 1000 / 4,
      hook: () => {
        if (howl.value) seek.value = howl.value.seek()
      },
    },
  })

  const internalEvents: Ref<IHowlEvent[]> = ref(
    [
      {
        name: 'load',
        hook: () => {
          if (howl.value) duration.value = howl.value?.duration()
        },
      },
      {
        name: 'loaderror',
      },
      {
        name: 'playerror',
      },
      {
        name: 'play',
        hook: () => {
          isPlaying.value = true
        },
      },
      {
        name: 'end',
        hook: () => {
          isPlaying.value = false
        },
      },
      {
        name: 'pause',
        hook: () => {
          isPlaying.value = false
        },
      },
      {
        name: 'stop',
        hook: () => {
          isPlaying.value = false
          if (howl.value) {
            seek.value = howl.value.seek()
          }
        },
      },
      {
        name: 'mute',
      },
      {
        name: 'volume',
        hook: () => {
          if (howl.value) volume.value = howl.value.volume()
        },
      },
      {
        name: 'rate',
        hook: () => {
          if (howl.value) rate.value = howl.value.rate()
        },
      },
      {
        name: 'seek',
        hook: () => {
          if (howl.value) seek.value = howl.value.seek()
        },
      },
      {
        name: 'fade',
      },
    ].map((handler) => handler as IHowlEvent)
  )

  const progress = computed(() => {
    if (duration.value == 0) return 0
    return seek.value / duration.value
  })

  const elapsed = computed(() => {
    if (seek.value == 0) return 0
    return seek.value
  })

  const remaining = computed(() => {
    if (duration.value == 0) return 0
    return duration.value - seek.value
  })

  watch(isPlaying, (value) => {
    const { seek: pollSeek } = polls.value
    if (howl.value) seek.value = howl.value.seek()

    if (value) {
      pollSeek.id = setInterval(pollSeek.hook, pollSeek.interval)
    } else {
      if (pollSeek.id) clearInterval(pollSeek.id)
    }
  })

  /**
   *
   * @todo actual event implementation
   */
  function emit(event: string, id?: number) {
    console.log(`${event} triggered ${id ? `with id ${id}` : ''}`)
  }

  function initialize() {
    start()
  }

  function cleanup(resetSettings = false) {
    reset()

    // Reset settings (optionally)
    if (resetSettings) {
      muted.value = defaultSettings.muted
      volume.value = defaultSettings.volume
      rate.value = defaultSettings.rate
    }
  }

  function start() {
    if (!source.value) {
      console.error('Unable to start. Source is required')
      return
    }
    console.log(source.value)

    const initializationOptions = { ...defaultOptions, ...options }

    howl.value = new Howl({
      ...initializationOptions,
      src: unref(source) as string,
    })

    console.log('howl initialization', howl.value)

    duration.value = howl.value.duration()

    if (duration.value > 0) {
      emit('load')
    }

    internalEvents.value.map((event: IHowlEvent) => {
      const { name, hook } = event
      const handler: HowlCallback = (id: number) => {
        if (hook) hook(id)
        //emit(name, id)
      }

      howl.value?.on(name, handler)

      return { ...event, handler }
    })
  }

  function reset() {
    // Stop playback
    if (howl.value) {
      stop()
    }

    // Stop polls
    Object.values(polls).forEach((poll) => {
      if (poll?.id) clearInterval(poll.id)
    })

    // Clear all event listeners

    internalEvents.value.map((event) => {
      const { name, hook } = event
      if (hook && howl.value) {
        howl.value.off(name, hook)
      }

      return event
    })

    // Destroy the Howl instance
    howl.value = null
    duration.value = 0
  }

  function restart() {
    return pipe().then(reset).then(start).then(fillAudioNodes)
  }

  const useSound = (url: string) => {
    const currentSource = unref(source)

    // Avoid restarting if url is the same as the current one
    if (currentSource && currentSource === url) return

    source.value = url

    pipe().then(restart).then(play)
  }

  const play = () => {
    console.log('play', howl.value)
    howl.value?.play()
  }
  const pause = () => howl.value?.pause()
  const stop = () => {
    howl.value?.stop()
  }
  const togglePlayback = () => {
    isPlaying.value ? pause() : play()
  }
  const setMute = (value: boolean) => {
    howl.value?.mute(value)
    muted.value = value
  }
  const mute = () => setMute(true)
  const unmute = () => setMute(false)
  const toggleMute = () => (muted.value ? unmute() : mute())
  const setVolume = (value: number) => howl.value?.volume(clamp(value, 0, 1))
  const setRate = (value: number) => howl.value?.rate(clamp(value, 0, 1))
  const setSeek = (value: number) =>
    howl.value?.seek(clamp(value, 0, duration.value))
  const setProgress = (value: number) =>
    setSeek(clamp(value, 0, 1) * duration.value)

  function fillAudioNodes() {
    const masterContext = Howler.ctx
    const masterGainNode = Howler.masterGain

    if (masterContext) {
      context.value = masterContext
    }

    if (masterGainNode) {
      gainNode.value = masterGainNode
    }
  }

  onMounted(() => {
    pipe().then(initialize)
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    // System Ref Variables
    instance: howl,
    sound: howl,
    howl,
    context,
    gainNode,

    // Player Ref Variables
    isPlaying,
    muted,
    duration,
    volume,
    rate,
    seek,

    // Computed Variables
    progress,
    elapsed,
    remaining,

    // Actions
    useSound,
    play,
    pause,
    stop,
    togglePlayback,
    mute,
    unmute,
    toggleMute,
    setVolume,
    setRate,
    setSeek,
    setProgress,
  }
}
