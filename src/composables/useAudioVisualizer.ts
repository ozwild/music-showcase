import AudioMotionAnalyzer, { GradientOptions } from 'audiomotion-analyzer'

const options = {
  alphaBars: false,
  // audioCtx: undefined, // constructor only
  barSpace: 0.1,
  bgAlpha: 0.7,
  connectSpeakers: true, // constructor only
  fftSize: 4096,
  fillAlpha: 0,
  fsElement: undefined, // constructor only
  gradient: 'prism',
  height: undefined,
  ledBars: false,
  lineWidth: 2,
  loRes: false,
  lumiBars: false,
  maxDecibels: -20,
  maxFreq: 16000,
  minDecibels: -70,
  minFreq: 50,
  mirror: -1,
  mode: 10,
  onCanvasDraw: drawCallback,
  onCanvasResize: undefined,
  outlineBars: false,
  overlay: false,
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
  smoothing: 0.2,
  spinSpeed: 0,
  splitGradient: true,
  start: true,
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

function drawCallback(instance: AudioMotionAnalyzer) {
  const ctx = instance.canvasCtx,
    baseSize = (instance.isFullscreen ? 40 : 20) * instance.pixelRatio

  // use the 'energy' value to increase the font size and make the logo pulse to the beat
  /* ctx.font = `${
    baseSize + instance.getEnergy() * 25 * instance.pixelRatio
  }px Orbitron, sans-serif` */

  ctx.font = `${baseSize * 3 * instance.pixelRatio}px Orbitron, sans-serif`

  ctx.fillStyle = '#fff8'
  ctx.textAlign = 'center'
  const x = instance.canvas.width - baseSize * 5
  const y = baseSize * 3
  ctx.fillText('Ozwild', x, y)
}

function spawnVisualizer(container: HTMLElement) {
  const audioMotion = new AudioMotionAnalyzer(container, options)
  audioMotion.registerGradient('outrun', outrunGradient)
  audioMotion.gradient = 'outrun'
  return audioMotion
}

export function useAudioVisualizer() {
  return {
    spawn: spawnVisualizer,
  }
}
