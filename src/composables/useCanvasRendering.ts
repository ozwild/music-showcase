import { ref, Ref, unref, watch, onMounted, onUnmounted } from 'vue'
import { useMediaQueries } from '@/composables/useMediaQueries'
import { FFTSizes } from '@/utilities/constants'

function getDataPeaks(
  dataArray: Uint8Array | Float32Array,
  threshold: number
): number[] {
  const output = []
  for (let index = 0; index < dataArray.length; index++) {
    const datum = dataArray[index]
    if (datum > threshold) {
      output.push(datum)
      index += 1000
    }
    index++
  }
  return output
}

export function useCanvasRendering(
  audioContext: Ref<AudioContext>,
  gainNode: Ref<GainNode>
) {
  const { isOnSmallScreen: isOnSmallScreenMode } = useMediaQueries()

  const frequencyAnalyser: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), { fftSize: FFTSizes.TINY })
  )
  const timeAnalyser: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), {
      fftSize: FFTSizes.TINY,
    })
  )

  const minValue = ref(0)
  const maxValue = ref(0)
  const avgValue = ref(0)

  function setAnalysers() {
    const frequencyAnalyserFFTSize = isOnSmallScreenMode.value
      ? FFTSizes.REGULAR
      : FFTSizes.REGULAR

    frequencyAnalyser.value = new AnalyserNode(unref(audioContext), {
      fftSize: frequencyAnalyserFFTSize,
    })

    const timeAnalyserFFTSize = isOnSmallScreenMode.value
      ? FFTSizes.REGULAR
      : FFTSizes.REGULAR

    timeAnalyser.value = new AnalyserNode(unref(audioContext), {
      fftSize: timeAnalyserFFTSize,
    })

    gainNode.value.connect(frequencyAnalyser.value).connect(timeAnalyser.value)
  }

  function manageScreenSize() {
    const width = window.innerWidth
    if (width < 768 && !isOnSmallScreenMode.value) {
      isOnSmallScreenMode.value = true
    } else if (width >= 768 && isOnSmallScreenMode.value) {
      isOnSmallScreenMode.value = false
    }
  }

  watch(audioContext, () => {
    setAnalysers()
  })

  watch(isOnSmallScreenMode, () => {
    setAnalysers()
  })

  function resizeHandler() {
    manageScreenSize()
  }

  function clearCanvas(canvasCtx: CanvasRenderingContext2D) {
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    canvasCtx.clearRect(0, 0, width, height)
  }

  function canvasTint(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(timeAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height

    analyser.getByteFrequencyData(dataArray)

    const peaks = getDataPeaks(dataArray, 0)
    const sum = peaks.reduce((a: number, b: number) => a + b, 0)
    const intensityAvg = sum / peaks.length / 2

    /* if (intensityAvg > maxValue.value && intensityAvg !== Infinity)
      maxValue.value = intensityAvg
    if (
      intensityAvg < minValue.value &&
      intensityAvg !== -Infinity &&
      intensityAvg !== 0
    )
      minValue.value = intensityAvg */

    avgValue.value = intensityAvg

    const canvasColorIntensity = (intensityAvg - 90) * 10
    minValue.value = canvasColorIntensity
    canvasCtx.fillStyle = `hsl(100, ${canvasColorIntensity}, 50)`
    canvasCtx.fillRect(0, 0, width, height)
  }

  function drawOsciloscope(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(timeAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = height / 2

    //Get spectrum data
    analyser.getFloatTimeDomainData(dataArray)

    canvasCtx.lineWidth = 1
    canvasCtx.strokeStyle = 'rgba(220,180,210,0.8)'
    canvasCtx.strokeStyle = 'rgba(22,18, 10,0.8)'
    //canvasCtx.strokeStyle = 'black'

    const sliceWidth = ((width * 1) / bufferLength) * 0.8
    let x = width / 10

    //canvasCtx.setTransform(1, 0, 0, 1, 0, 0)

    canvasCtx.beginPath()
    canvasCtx.moveTo(0, height / 2)

    for (let i = 0; i < bufferLength; i++) {
      /**
       * Value is a number from -1 to +1 representing intensity (volume if you may)
       */
      const value = dataArray[i]
      /**
       * Coordinate y should be equal to value
       */
      let y = value
      /**
       * but the scale is too small compared to our canvas
       * so we multiply it by a fraction of the canvas height
       * in order to scale up the magnitude
       */
      y *= renderingHeightRation

      /**
       * And we add half of the height to rendering in the middle of our canvas
       */

      y += height / 2

      canvasCtx.lineTo(x, y)

      x += sliceWidth
    }

    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  function drawTensionLines(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(timeAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = height / 3

    //Get spectrum data
    analyser.getFloatTimeDomainData(dataArray)

    /* canvasCtx.shadowColor = 'cyan'
    canvasCtx.shadowBlur = 15 */
    canvasCtx.lineWidth = 2
    //canvasCtx.strokeStyle = `rgb(225, 225, 230)`
    canvasCtx.strokeStyle = '#121212'
    //canvasCtx.strokeStyle = 'azure'
    canvasCtx.setTransform(0.5, -0.03, 0.01, 1, 0, height / 3)
    canvasCtx.rotate((Math.PI / 180) * 0.01)

    canvasCtx.beginPath()

    const sliceWidth = (width * 1.15) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      /**
       * Value is a number from -1 to +1 representing intensity (volume if you may)
       */
      const value = dataArray[i]
      /**
       * Coordinate y should be equal to value
       */
      let y = value
      /**
       * but the scale is too small compared to our canvas
       * so we multiply it by a fraction of the canvas height
       * in order to scale up the magnitude
       */
      y *= renderingHeightRation

      /**
       * And we add half of the height to rendering in the middle of our canvas
       */

      y += height / 2

      canvasCtx.moveTo(x, y)

      canvasCtx.lineTo(width / 2, height / 2)

      canvasCtx.moveTo(-x, y)

      //canvasCtx.lineTo(width / 2, height / 2)
      canvasCtx.resetTransform()

      x += sliceWidth
    }

    canvasCtx.lineTo(width / 2, height / 2)
    canvasCtx.stroke()
  }

  function drawHud(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(frequencyAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = height

    //Get spectrum data
    analyser.getByteFrequencyData(dataArray)

    //Draw spectrum

    const barWidth = isOnSmallScreenMode.value
      ? (width / 2 / bufferLength) * 3
      : (width / 1 / bufferLength) * 1.5
    let posX = width
    let barHeight = 0

    //scale(0.75, 0.8) translate(-60%, -108%) skew(0deg, -20deg)
    //canvasCtx.setTransform(0.8, 0, 0, 3, 0, height / 8)
    //canvasCtx.filter = 'blur(1px)'

    for (let i = 0; i < bufferLength; i++) {
      const datum = dataArray[i]
      const value = datum / 256
      barHeight = value * renderingHeightRation

      canvasCtx.translate(0, height - height / 10)
      canvasCtx.scale(1, -1)

      canvasCtx.fillStyle = `rgba(90, 75, 83, 0.1)`
      canvasCtx.fillRect(
        -posX + width * 2.5,
        height / 5 - barHeight / 2,
        barWidth,
        barHeight
      ) // right wing

      canvasCtx.fillStyle = `rgba(40, 35, 45, 0.3)`
      canvasCtx.fillRect(
        -posX + width * 2.3 - barWidth * 2,
        height / 1.5 + barHeight,
        barWidth,
        -barHeight / 2
      ) // left wing

      canvasCtx.fillStyle = `rgba(60, 55, 57, 0.65)`
      canvasCtx.fillRect(
        posX - width + barWidth * 2,
        height / 2 + barHeight / 1.75,
        barWidth,
        -barHeight / 1.5
      ) // right wing

      posX += barWidth + 1
    }

    canvasCtx.resetTransform()
  }

  function drawBars(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(frequencyAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = height / 2

    //Get spectrum data
    analyser.getByteFrequencyData(dataArray)

    //Draw spectrum
    const barWidth = (width / bufferLength) * 1
    let posX = 0
    let barHeight = 0

    //canvasCtx.setTransform(1, -0.1, 0, 1, -width / 3, 0)

    for (let i = 0; i < bufferLength; i++) {
      //barHeight = dataArray[i] + height / 2
      const datum = dataArray[i]
      const value = datum / 256
      barHeight = value * renderingHeightRation
      const rgbIntensity = datum / 2

      //canvasCtx.setTransform(0.6, -0.01, 0.01, 1, 50, 0)
      canvasCtx.fillStyle = `#121212`
      canvasCtx.fillStyle = `rgb(0, 0, 0)`
      canvasCtx.fillStyle = 'rgb(22,18, 10)'
      /* canvasCtx.fillStyle = `rgba(${rgbIntensity}, ${rgbIntensity}, ${rgbIntensity}, 0.95)`
      canvasCtx.fillStyle = `rgba(${rgbIntensity}, 50, 50, 0.95)` */
      //canvasCtx.fillStyle = `rgba(${rgbIntensity}, ${rgbIntensity}, ${rgbIntensity}, 1)`
      /**
       * Top frequency Bars
       */
      /* canvasCtx.fillRect(
        -posX + width / 2 - barWidth * 1.25,
        height / 1.5,
        barWidth,
        -barHeight / 2
      ) */ // left wing
      canvasCtx.fillRect(posX + width, height, barWidth, -barHeight) // right Wing

      posX += barWidth + 1
    }

    canvasCtx.resetTransform()
  }

  return {
    clearCanvas,
    drawOsciloscope,
    drawHud,
    drawTensionLines,
    drawBars,
    canvasTint,
    minValue,
    maxValue,
  }
}
