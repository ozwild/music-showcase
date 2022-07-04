import { Ref } from 'vue'
import { Howl } from 'howler'

export interface ISong {
  id: string
  title: string
  url: string
}

export type AvailableEvents =
  | 'load'
  | 'loaderror'
  | 'playerror'
  | 'play'
  | 'end'
  | 'pause'
  | 'stop'
  | 'mute'
  | 'volume'
  | 'rate'
  | 'seek'
  | 'fade'

export interface IHowlEvent {
  name: AvailableEvents
  hook?: (id: number) => void
}

export interface IInterval {
  id: number | null
  interval: number
  hook: () => void
}

export interface IAudioPlayerOptions {
  autoPlay?: boolean
  loop?: boolean
  preload?: boolean
  html5?: boolean
  formats?: string[]
  xhr?: {
    method?: string | undefined
    headers?: Record<string, string> | undefined
    withCredentials?: boolean | undefined
  }
}

export interface IAudioPlayer {
  instance: Ref<Howl | null | undefined>
  sound: Ref<Howl | null | undefined>
  howl: Ref<Howl | null | undefined>
  isPlaying: Ref<boolean>
  muted: Ref<boolean>
  duration: Ref<number>
  volume: Ref<number>
  rate: Ref<number>
  seek: Ref<number>
  progress: Ref<number>
  elapsed: Ref<number>
  remaining: Ref<number>
  useSound: (source: string) => void
  play: () => void
  pause: () => void
  stop: () => void
  togglePlayback?: () => void
  mute: () => void
  unmute: () => void
  toggleMute: () => void
  setVolume: (value: number) => void
  setRate: (value: number) => void
  setSeek: (value: number) => void
  setProgress: (value: number) => void
}

export interface IEmits {
  (e: 'load', id?: number): void
  (e: 'loaderror', id?: number): void
  (e: 'playerror', id?: number): void
  (e: 'play', id?: number): void
  (e: 'end', id?: number): void
  (e: 'pause', id?: number): void
  (e: 'stop', id?: number): void
  (e: 'mute', id?: number): void
  (e: 'volume', id?: number): void
  (e: 'rate', id?: number): void
  (e: 'seek', id?: number): void
  (e: 'fade', id?: number): void
}
