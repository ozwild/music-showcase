<template>
  <div>
    {{ dataArray[0] }}
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, toRefs } from 'vue'
import * as d3 from 'd3'

import { useAnalizer, FFTSizes } from '@/composables/useAnalizer'

// eslint-disable-next-line vue/no-setup-props-destructure
const props = defineProps<{ gainNode: GainNode; context: AudioContext }>()
const { gainNode, context } = toRefs(props)
const fftSize: Ref<number> = ref(FFTSizes.LOW)

console.log('GainNode:', gainNode)
console.log('Context:', context)

const { analyserNode, dataArray } = useAnalizer(context, gainNode, {
  fftSize: fftSize.value,
})
console.log('Analyser Node: ', analyserNode)
console.log('DataArray', dataArray)

const width: Ref<number> = ref(500)
const height: Ref<number> = ref(500)

const xScale = d3
  .scaleLinear()
  .range([0, width.value])
  .domain([0, fftSize.value])

const yScale = d3.scaleLinear().range([height.value, 0]).domain([-1, 1])

const line = d3
  .line()
  .x((d, i) => xScale(i))
  .y((d, i) => yScale(i))

//d3.select('path').datum(dataArray).attr('d', line)
</script>
