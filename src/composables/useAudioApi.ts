import { ref, Ref, unref, watch } from 'vue'
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
      //index += 1000
    }
    index++
  }
  return output
}

export function useAudioApi(
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

  function setAnalysers() {
    const frequencyAnalyserFFTSize = FFTSizes.REGULAR

    frequencyAnalyser.value = new AnalyserNode(unref(audioContext), {
      fftSize: frequencyAnalyserFFTSize,
    })

    const timeAnalyserFFTSize = FFTSizes.REGULAR

    timeAnalyser.value = new AnalyserNode(unref(audioContext), {
      fftSize: timeAnalyserFFTSize,
    })

    gainNode.value.connect(frequencyAnalyser.value).connect(timeAnalyser.value)
  }

  watch(audioContext, () => {
    setAnalysers()
  })

  function getAnalyserFrequencyByteData(): Uint8Array {
    //analyserNode: AnalyserNode
    const analyserNode = unref(frequencyAnalyser)
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)
    return dataArray
  }

  function getAnalyserFrequencyFloatData(): Float32Array {
    //analyserNode: AnalyserNode
    const analyserNode = unref(frequencyAnalyser)
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    analyserNode.getFloatFrequencyData(dataArray)
    return dataArray
  }

  function getAnalyserTimeByteData(): Uint8Array {
    //analyserNode: AnalyserNode
    const analyserNode = unref(timeAnalyser)
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteTimeDomainData(dataArray)
    return dataArray
  }

  function getAnalyserTimeFloatData(): Float32Array {
    // analyserNode: AnalyserNode
    const analyserNode = unref(timeAnalyser)
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    analyserNode.getFloatTimeDomainData(dataArray)
    return dataArray
  }

  function getDataAverage(dataArray: Uint8Array | Float32Array): number {
    const peaks = getDataPeaks(dataArray, -Infinity)
    const sum = peaks.reduce((a: number, b: number) => a + b, 0)
    const count = peaks.length
    return sum / count
  }

  function getDataMax(dataArray: Uint8Array | Float32Array): number {
    const peaks = getDataPeaks(dataArray, -Infinity)
    return peaks.reduce(
      (a: number, b: number) => (a > b ? a : b > a ? b : a),
      0
    )
  }

  return {
    //getAnalyser,
    getAnalyserFrequencyByteData,
    getAnalyserFrequencyFloatData,
    getAnalyserTimeByteData,
    getAnalyserTimeFloatData,
    getDataAverage,
    getDataMax,
  }
}
