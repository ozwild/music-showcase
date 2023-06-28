import AudioMotionAnalyzer, { GradientOptions } from 'audiomotion-analyzer'
import themes from './themes.json'
import defaultsJson from './defaults.json'

import { FFTSizes } from '@/utilities/constants'
import { IAnalyzerOptions } from './types'

const defaults = { ...defaultsJson, fftSize: FFTSizes.REGULAR }

function createAnalyzer(
  container: HTMLElement,
  options: IAnalyzerOptions = {}
) {
  console.log('analyzer defaults', defaults)
  const analyzer = new AudioMotionAnalyzer(container, {
    ...defaults,
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
