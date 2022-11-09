import AudioMotionAnalyzer from 'audiomotion-analyzer'

const options = {
  alphaBars: false,
  // audioCtx: undefined, // constructor only
  barSpace: 0.1,
  bgAlpha: 0.7,
  connectSpeakers: false, // constructor only
  fftSize: 8192,
  fillAlpha: 1,
  fsElement: undefined, // constructor only
  gradient: 'classic',
  height: undefined,
  ledBars: false,
  lineWidth: 0,
  loRes: false,
  lumiBars: false,
  maxDecibels: -25,
  maxFreq: 22000,
  minDecibels: -85,
  minFreq: 20,
  mirror: 0,
  mode: 0,
  onCanvasDraw: drawCallback,
  onCanvasResize: undefined,
  outlineBars: false,
  overlay: false,
  radial: false,
  reflexAlpha: 0.15,
  reflexBright: 1,
  reflexFit: true,
  reflexRatio: 0,
  showBgColor: true,
  showFPS: true,
  showLeds: false, // DEPRECATED - use ledBars instead
  showPeaks: true,
  showScaleX: true,
  showScaleY: false,
  smoothing: 0.5,
  spinSpeed: 0,
  splitGradient: false,
  start: true,
  stereo: false,
  useCanvas: true,
  volume: 1,
  width: undefined,
}

function drawCallback(instance: AudioMotionAnalyzer) {
  console.log('Canvas Draw', instance.getEnergy())
  const ctx = instance.canvasCtx,
    baseSize = (instance.isFullscreen ? 40 : 20) * instance.pixelRatio

  // use the 'energy' value to increase the font size and make the logo pulse to the beat
  ctx.font = `${
    baseSize + instance.getEnergy() * 25 * instance.pixelRatio
  }px Orbitron, sans-serif`

  ctx.fillStyle = '#fff8'
  ctx.textAlign = 'center'
  ctx.fillText(
    'audioMotion',
    instance.canvas.width - baseSize * 8,
    baseSize * 2
  )
}

function spawnVisualizer(container: HTMLElement, context: AudioContext) {
  return new AudioMotionAnalyzer(container, { audioCtx: context })
}

export function useAudioVisualizer() {
  return {
    spawn: spawnVisualizer,
  }
}
