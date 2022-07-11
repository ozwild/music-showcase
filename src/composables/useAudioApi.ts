import { Ref, unref } from 'vue'

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

export function useAudioApi() {
  function getAnalyser(
    context: AudioContext | Ref<AudioContext>,
    sourceNode: AudioNode,
    fftSize: number
  ): AnalyserNode {
    const analyser = new AnalyserNode(unref(context), { fftSize })
    sourceNode.connect(analyser)
    return analyser
  }

  function getAnalyserFrequencyByteData(
    analyserNode: AnalyserNode
  ): Uint8Array {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)
    return dataArray
  }

  function getAnalyserFrequencyFloatData(
    analyserNode: AnalyserNode
  ): Float32Array {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    analyserNode.getFloatFrequencyData(dataArray)
    return dataArray
  }

  function getAnalyserTimeByteData(analyserNode: AnalyserNode): Uint8Array {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteTimeDomainData(dataArray)
    return dataArray
  }

  function getAnalyserTimeFloatData(analyserNode: AnalyserNode): Float32Array {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)
    analyserNode.getFloatTimeDomainData(dataArray)
    return dataArray
  }

  function getDataAverage(dataArray: Uint8Array | Float32Array): number {
    const peaks = getDataPeaks(dataArray, -Infinity)
    const sum = peaks.reduce((a: number, b: number) => a + b, 0)
    const count = peaks.length
    console.log('Sum, Count: ', sum, count)
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
    getAnalyser,
    getAnalyserFrequencyByteData,
    getAnalyserFrequencyFloatData,
    getAnalyserTimeByteData,
    getAnalyserTimeFloatData,
    getDataAverage,
    getDataMax,
  }
}
