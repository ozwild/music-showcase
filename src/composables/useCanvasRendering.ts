import { ref, Ref, unref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { FFTSizes } from '@/utilities/constants'

function getFrequencyRegions(dataArray: Uint8Array) {
  console.log(dataArray)
}

export function useCanvasRendering(
  audioContext: Ref<AudioContext>,
  gainNode: Ref<GainNode>
) {
  const frequencyAnalyser: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), { fftSize: FFTSizes.TINY })
  )
  const timeAnalyser: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), {
      fftSize: FFTSizes.TINY,
    })
  )
  const isOnSmallScreenMode = ref(false)
  const minValue = ref(0)
  const maxValue = ref(0)

  function setAnalysers() {
    const frequencyAnalyserFFTSize = isOnSmallScreenMode.value
      ? FFTSizes.TINY
      : FFTSizes.SMALL

    console.log(
      'Frequency Analyser set with FFTSize: ',
      frequencyAnalyserFFTSize
    )

    frequencyAnalyser.value = new AnalyserNode(unref(audioContext), {
      fftSize: frequencyAnalyserFFTSize,
    })

    const timeAnalyserFFTSize = isOnSmallScreenMode.value
      ? FFTSizes.LOW
      : FFTSizes.MEDIUM

    console.log('Time Analyser set with FFTSize: ', timeAnalyserFFTSize)

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

  function drawOsciloscope(canvasCtx: CanvasRenderingContext2D) {
    const analyser = unref(timeAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = height / 3

    //Get spectrum data
    analyser.getFloatTimeDomainData(dataArray)

    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = `rgb(225, 225, 230)`

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

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  function canvasTint() {
    const analyser = unref(frequencyAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    //Get spectrum data
    analyser.getByteFrequencyData(dataArray)
  }

  function drawBars(canvasCtx: CanvasRenderingContext2D, useTimeData = false) {
    const analyser = unref(frequencyAnalyser)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const renderingHeightRation = (height / 64) * 2.5

    //Get spectrum data
    if (useTimeData) {
      analyser.getFloatTimeDomainData(dataArray)
    } else {
      analyser.getFloatFrequencyData(dataArray)
    }

    //Draw spectrum
    const barWidth = (width / bufferLength) * 1.5
    let posX = 0
    let barHeight = 0

    for (let i = 0; i < bufferLength; i++) {
      //barHeight = dataArray[i] + height / 2
      const value = dataArray[i] + 255
      barHeight = (value / 2) * renderingHeightRation
      const rgbIntensity = Math.floor(value * 2)
      canvasCtx.fillStyle = `rgb(${rgbIntensity}, 40, 50)`
      canvasCtx.fillRect(posX, height - barHeight / 6, barWidth, barHeight)

      posX += barWidth + 1

      if (rgbIntensity > maxValue.value && value !== Infinity)
        maxValue.value = rgbIntensity
      if (rgbIntensity < minValue.value && value !== -Infinity)
        minValue.value = rgbIntensity
    }
  }

  onMounted(() => {
    window.addEventListener('resize', resizeHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })

  return {
    clearCanvas,
    drawOsciloscope,
    drawBars,
    canvasTint,
    minValue,
    maxValue,
  }
}
