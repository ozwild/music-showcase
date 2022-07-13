import type { InjectionKey } from 'vue'
import { IAudioPlayer } from '@/types/types'

export const playerInjectionKey = Symbol() as InjectionKey<IAudioPlayer>
