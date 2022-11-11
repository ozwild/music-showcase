// @ref https://audiomotion.dev/#/

import AudioMotionAnalyzer, {
  GradientOptions,
  Options,
} from 'audiomotion-analyzer'

import { FFTSizes } from '@/utilities/constants'

interface ConstructorOptions extends Options {
  audioCtx?: AudioContext
  connectSpeakers?: boolean
  fsElement?: HTMLElement
  source?: HTMLMediaElement | AudioNode
}

const defaults = {
  alphaBars: false,
  // audioCtx: undefined, // constructor only
  barSpace: 0.1,
  bgAlpha: 0.7,
  connectSpeakers: true, // constructor only
  fftSize: FFTSizes.MEDIUM,
  fillAlpha: 0,
  fsElement: undefined, // constructor only
  gradient: 'prism',
  height: undefined,
  ledBars: false,
  lineWidth: 2,
  loRes: true,
  lumiBars: false,
  maxDecibels: -20,
  maxFreq: 16000,
  minDecibels: -70,
  minFreq: 50,
  mirror: -1,
  mode: 10,
  onCanvasDraw: undefined,
  onCanvasResize: undefined,
  outlineBars: false,
  overlay: true,
  radial: false,
  reflexAlpha: 0.15,
  reflexBright: 1,
  reflexFit: true,
  reflexRatio: 0.4,
  showBgColor: true,
  showFPS: false,
  showLeds: false, // DEPRECATED - use ledBars instead
  showPeaks: true,
  showScaleX: false,
  showScaleY: false,
  smoothing: 0.1,
  spinSpeed: 0,
  splitGradient: true,
  start: false,
  stereo: true,
  useCanvas: true,
  volume: 1,
  width: undefined,
}

const outrunGradient: GradientOptions = {
  bgColor: '#101',
  colorStops: [
    { pos: 0, color: 'rgb( 255, 223, 67 )' },
    { pos: 0.182, color: 'rgb( 250, 84, 118 )' },
    { pos: 0.364, color: 'rgb( 198, 59, 243 )' },
    { pos: 0.525, color: 'rgb( 133, 80, 255 )' },
    { pos: 0.688, color: 'rgb( 74, 104, 247 )' },
    { pos: 1, color: 'rgb( 35, 210, 255 )' },
  ],
}

const lightGradient: GradientOptions = {
  bgColor: '#efe',
  colorStops: [
    { pos: 0, color: 'rgb( 0, 32, 188 )' },
    { pos: 0.182, color: 'rgb( 5, 171, 137 )' },
    { pos: 0.364, color: 'rgb( 57, 196, 12 )' },
    { pos: 0.525, color: 'rgb( 122, 175, 0 )' },
    { pos: 0.688, color: 'rgb( 181, 151, 8 )' },
    { pos: 1, color: 'rgb( 220, 45, 0 )' },
  ],
}

function spawnVisualizer(container: HTMLElement, options: ConstructorOptions) {
  const audioMotion = new AudioMotionAnalyzer(container, {
    ...defaults,
    ...options,
  })
  audioMotion.registerGradient('outrun', outrunGradient)
  audioMotion.registerGradient('light', lightGradient)
  audioMotion.gradient = 'outrun'
  return audioMotion
}

export function useAudioVisualizer() {
  return {
    spawn: spawnVisualizer,
  }
}
