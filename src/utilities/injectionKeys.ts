import type { InjectionKey, Ref } from 'vue'
import { IAudioPlayer, ILightThemeInjection } from '@/types/types'

export const playerInjectionKey = Symbol() as InjectionKey<IAudioPlayer>
export const lightThemeInjectionKey =
  Symbol() as InjectionKey<ILightThemeInjection>
export const audioElementInjectionKey = Symbol() as InjectionKey<
  Ref<HTMLMediaElement>
>
