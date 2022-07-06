import { ref, Ref, unref, reactive, watch } from 'vue'
import { FFTSizes } from '@/utilities/constants'

function getFrequencyRegions(dataArray: Uint8Array) {
  console.log(dataArray)
}

export function useCanvasRendering(
  audioContext: Ref<AudioContext>,
  gainNode: Ref<GainNode>
) {
  const tinyAnalyserNode: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), { fftSize: FFTSizes.TINY })
  )
  const regularAnalyserNode: Ref<AnalyserNode> = ref(
    new AnalyserNode(unref(audioContext), {
      fftSize: FFTSizes.REGULAR,
    })
  )
  const minValue = ref(0)
  const maxValue = ref(0)

  watch(audioContext, () => {
    tinyAnalyserNode.value = new AnalyserNode(unref(audioContext), {
      fftSize: FFTSizes.TINY,
    })

    regularAnalyserNode.value = new AnalyserNode(unref(audioContext), {
      fftSize: FFTSizes.REGULAR,
    })

    gainNode.value
      .connect(tinyAnalyserNode.value)
      .connect(regularAnalyserNode.value)
  })

  function clearCanvas(canvasCtx: CanvasRenderingContext2D) {
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    canvasCtx.clearRect(0, 0, width, height)
  }

  function drawOsciloscope(
    canvasCtx: CanvasRenderingContext2D,
    useTimeData = false
  ) {
    const analyser = unref(regularAnalyserNode)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height

    //Get spectrum data
    if (useTimeData) {
      analyser.getFloatTimeDomainData(dataArray)
    } else {
      analyser.getFloatFrequencyData(dataArray)
    }

    canvasCtx.lineWidth = 2

    canvasCtx.beginPath()

    const sliceWidth = (width * 1.5) / bufferLength
    let x = 0 - width / 10

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = (-v * height) / 15

      canvasCtx.strokeStyle = `rgb(50, 50,  ${Math.floor(y)})`

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y + 50)
      }

      x += sliceWidth
      if (dataArray[i] > maxValue.value) maxValue.value = dataArray[i]
      if (dataArray[i] < minValue.value) minValue.value = dataArray[i]
    }

    canvasCtx.lineTo(width, height / 2)
    canvasCtx.stroke()
  }

  function canvasTint() {
    const analyser = unref(tinyAnalyserNode)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    //Get spectrum data
    analyser.getByteFrequencyData(dataArray)
  }

  function drawBars(canvasCtx: CanvasRenderingContext2D, useTimeData = false) {
    const analyser = unref(tinyAnalyserNode)
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    const canvas = canvasCtx?.canvas
    const width = canvas.width
    const height = canvas.height
    const heightMultiplier = Math.PI * 2

    //Get spectrum data
    if (useTimeData) {
      analyser.getFloatTimeDomainData(dataArray)
    } else {
      analyser.getFloatFrequencyData(dataArray)
    }

    //Draw spectrum
    const barWidth = width / bufferLength
    let posX = 0

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] + height / 8
      canvasCtx.fillStyle = `rgb(  ${Math.floor(barHeight * 2 + 50)}, 50, 150)`
      canvasCtx.fillRect(
        posX,
        canvas.height - barHeight * heightMultiplier,
        barWidth,
        barHeight * heightMultiplier
      )
      posX += barWidth + 1
    }
  }

  return {
    clearCanvas,
    drawOsciloscope,
    drawBars,
    canvasTint,
    minValue,
    maxValue,
  }
}
