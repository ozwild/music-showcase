import { onMounted, onUnmounted, Ref, ref } from 'vue'

export type ScreenSize = 'small' | 'desktop'

export const screenSizes: Record<string, ScreenSize> = {
  SMALL: 'small',
  DESKTOP: 'desktop',
}

const getCurrentScreenSize = (): ScreenSize => {
  const width = window.innerWidth
  const height = window.innerHeight

  switch (true) {
    case width < 768:
    case width < 1024 && height < 640:
      return screenSizes.SMALL
    default:
      return screenSizes.DESKTOP
  }
}

export function useMediaQueries() {
  const isOnSmallScreen: Ref<boolean> = ref(false)
  const currentScreenSize: Ref<ScreenSize> = ref(screenSizes.DESKTOP)

  function revalidateScreenSize() {
    const screenSize = getCurrentScreenSize()
    currentScreenSize.value = screenSize
    isOnSmallScreen.value = screenSize === screenSizes.SMALL
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
  }
}
