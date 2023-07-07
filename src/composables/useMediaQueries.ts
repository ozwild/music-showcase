import { onMounted, onUnmounted, Ref, ref } from 'vue'

enum ScreenSize {
  Small = 0,
  Medium = 1,
  Desktop = 2,
}

const getCurrentScreenSize = (): ScreenSize => {
  const width = window.innerWidth
  const height = window.innerHeight

  switch (true) {
    case width < 768:
    case width < 1024 && height <= 640:
      return ScreenSize.Small
    case width < 1024 && height > 640:
      return ScreenSize.Medium
    default:
      return ScreenSize.Desktop
  }
}

export function useMediaQueries() {
  const isOnSmallScreen: Ref<boolean> = ref(false)
  const currentScreenSize: Ref<ScreenSize> = ref(ScreenSize.Desktop)

  function revalidateScreenSize() {
    const screenSize = getCurrentScreenSize()
    currentScreenSize.value = screenSize
    isOnSmallScreen.value = screenSize === ScreenSize.Small
  }

  onMounted(() => {
    window.addEventListener('resize', revalidateScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', revalidateScreenSize)
  })
  return {
    currentScreenSize,
    isOnSmallScreen,
    revalidateScreenSize,
    ScreenSize,
  }
}
