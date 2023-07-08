import { Ref, ref } from 'vue'
import AudioMotionAnalyzer, {
  GradientOptions,
  ConstructorOptions,
} from 'audiomotion-analyzer'
import { FFTSizes } from '@/utilities/constants'

import themes from './themes.json'
import defaultsJson from './defaults.json'

const defaults = { ...defaultsJson, fftSize: FFTSizes.SMALL }

function createAnalyzer(container: HTMLElement, options: ConstructorOptions) {
  const analyzer = new AudioMotionAnalyzer(container, {
    ...(defaults as unknown as Partial<ConstructorOptions>),
    ...options,
  })

  analyzer.registerGradient('outrun', themes.Outrun)
  analyzer.registerGradient('light', themes.Light)
  analyzer.registerGradient(
    'light-rainbow',
    themes.LightRainbow as GradientOptions
  )

  return analyzer
}

export function useAnalyzer(
  container: HTMLElement,
  options: ConstructorOptions = {}
) {
  const analyzer: Ref<AudioMotionAnalyzer> = ref(
    createAnalyzer(container, options)
  )
  return {
    updateTheme: (isDark: boolean) => {
      analyzer.value.gradient = isDark ? 'outrun' : 'orangered'
      
    },
    analyzer,
  }
}
