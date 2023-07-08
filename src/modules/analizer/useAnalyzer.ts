import AudioMotionAnalyzer, {
  GradientOptions,
  ConstructorOptions,
} from 'audiomotion-analyzer'
import themes from './themes.json'
import defaultsJson from './defaults.json'

import { FFTSizes } from '@/utilities/constants'

const defaults = { ...defaultsJson, fftSize: FFTSizes.SMALL }

function createAnalyzer(
  container: HTMLElement,
  options: ConstructorOptions = {}
) {
  console.log('analyzer defaults', defaults)
  const analyzer = new AudioMotionAnalyzer(container, {
    ...defaults as unknown as Partial<ConstructorOptions>,
    ...options,
  })

  analyzer.registerGradient('outrun', themes.Outrun)
  analyzer.registerGradient('light', themes.Light)
  analyzer.registerGradient(
    'light-rainbow',
    themes.LightRainbow as GradientOptions
  )

  analyzer.gradient = 'outrun'

  return analyzer
}

export function useAnalyzer() {
  return {
    createAnalyzer,
  }
}
