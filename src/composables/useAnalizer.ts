import { ref, Ref } from 'vue'

export const FFTSizes = {
  LOW: 2048,
  MEDIUM: 8192,
  HIGH: 16384,
}

interface IAnalyserOptions {
  fftSize?: number
  maxDecibels?: number
  minDecibels?: number
  smoothingTimeConstant?: number
}

const defaultAnalyserOptions: IAnalyserOptions = {
  fftSize: FFTSizes.LOW,
  maxDecibels: -25,
  minDecibels: -60,
  smoothingTimeConstant: 0.5,
}

export function useAnalizer(
  context: Ref<AudioContext>,
  gainNode: Ref<GainNode>,
  options = {} as IAnalyserOptions
) {
  const analyserNode: Ref<AnalyserNode> = ref(
    new AnalyserNode(context.value, { ...defaultAnalyserOptions, ...options })
  )

  gainNode.value.connect(analyserNode.value)
  //analyserNode.value.connect(context.value.destination)
  const bufferLength: Ref<number> = ref(analyserNode.value.frequencyBinCount)
  const dataArray: Ref<Float32Array> = ref(new Float32Array(bufferLength.value))

  analyserNode.value.getFloatTimeDomainData(dataArray.value)

  return {
    analyserNode,
    dataArray,
    bufferLength,
  }
}
