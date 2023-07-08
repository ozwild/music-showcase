<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { useMediaPlayer } from '@/modules/player/useMediaPlayer'
import Duration from './Duration.vue'
import ElapsedTime from './ElapsedTime.vue'

const progress = ref(0)
const container: Ref<HTMLDivElement | null> = ref(null)
const buffers: Ref<{ start: number; end: number; span: number }[]> = ref([])
const clickX = ref(0)
const currentMouseX = ref(0)
const mouseIsDown = ref(false)
const dotPosition = computed(() => {
  if (mouseIsDown.value && container.value) {
    const width = container.value.clientWidth
    return (currentMouseX.value / width) * 100
  } else {
    return progress.value
  }
})

const { seek, currentTime, duration, bufferedTimeRanges, listen } =
  useMediaPlayer()

listen.onBuffering(() => {
  buffers.value = bufferedTimeRanges.value.map((timeRange) => {
    const start = (timeRange.start / duration.value) * 100
    const end = (timeRange.end / duration.value) * 100
    const span = end - start
    return { start, end, span }
  })
})

function trackMouseHorizontalPosition(event: MouseEvent) {
  currentMouseX.value = event.x
}

function trackMouseUpEvents() {
  if (mouseIsDown.value && container.value) {
    seek((currentMouseX.value / container.value.clientWidth) * duration.value)
  }
  mouseIsDown.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', trackMouseHorizontalPosition)
  document.addEventListener('mouseup', trackMouseUpEvents)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', trackMouseHorizontalPosition)
  document.removeEventListener('mouseup', trackMouseUpEvents)
})

watch(currentTime, () => {
  progress.value = (currentTime.value / duration.value) * 100
})
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: var(--el-color-info-light-9);
  user-select: none;
  cursor: pointer;

  &:hover,
  &.seeking {
    > * {
      opacity: 1;
    }

    .buffer-bar,
    .progress-bar {
      transform: scaleY(1.5);
    }

    .dot {
      opacity: 1;
    }

    .elapsed,
    .duration {
      opacity: 0.9;
    }
  }

  .buffer-bar,
  .progress-bar {
    position: absolute;
    top: -0.5px;
    left: 0;
    height: 4px;
    margin: 3px 0px;
    transform: scaleY(1);
    transition: transform 0.1s;
    cursor: pointer;
  }

  .buffer-bar {
    background-color: var(--el-color-info-light-3);
  }

  .progress-bar {
    background-color: yellow;
    background-color: var(--el-text-color-primary);
    background-color: var(--el-text-color-regular);
  }

  .dot {
    position: absolute;
    top: -1.5px;
    left: 0px;
    background-color: var(--el-text-color-regular);
    background-color: var(--el-text-color-primary);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .elapsed,
  .duration {
    position: absolute;
    top: -1.2em;
    font-size: 0.85em;
    font-weight: 700;
    color: var(--el-color-info-dark-2);
    opacity: 0;
    transition: opacity 0.6s;
  }
  .elapsed {
    left: 4px;
  }

  .duration {
    right: 6px;
  }
}
</style>

<template>
  <div
    class="container"
    :class="{ seeking: mouseIsDown }"
    ref="container"
    @click="
      (event) => {
        if (!container) return
        seek((event.clientX / container.clientWidth) * duration)
      }
    "
    @mousedown="
      (event) => {
        mouseIsDown = true
        clickX = event.clientX
      }
    "
  >
    <ElapsedTime class="elapsed" @click.stop />
    <Duration class="duration" @click.stop />
    <div
      v-for="({ start, span }, index) in buffers"
      :key="index"
      class="buffer-bar"
      :style="`left: ${start}%; width: ${span}%`"
    ></div>
    <div class="progress-bar" :style="`width: ${progress}%`"></div>
    <span class="dot" :style="`left: calc(${dotPosition}% - 4px)`"></span>
  </div>
</template>
