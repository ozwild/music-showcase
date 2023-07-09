import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores'

import { useToggle } from './useToggle'

const initialized = ref(false)
const isDark = ref(true)
const { toggle } = useToggle(isDark)

function getInitialValue() {
  const settings = useSettingsStore()
  return settings.isDark
}

function storeNewValue(newValue: boolean) {
  const settings = useSettingsStore()
  settings.isDark = newValue
}

export function useDark() {
  if (!initialized.value) {
    isDark.value = getInitialValue()
    initialized.value = true
  }

  watch(isDark, (newDarkValue) => {
    storeNewValue(newDarkValue)
  })

  return {
    isDark,
    toggle,
  }
}
