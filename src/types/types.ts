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
