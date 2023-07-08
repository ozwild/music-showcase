import { useSettingsStore } from '@/stores'
import { ref, watch } from 'vue'
import { useToggle } from './useToggle'

const initialized = ref(false)
const isDark = ref(true)
const { toggle } = useToggle(isDark)

function getInitialValue() {
  const settings = useSettingsStore()
  console.log('initial value', settings.isDark)
  return settings.isDark
}

function storeNewValue(newValue: boolean) {
  const settings = useSettingsStore()
  settings.isDark = newValue
}

export function useDark() {
  console.log('use dark called', initialized.value, isDark.value)

  if (!initialized.value) {
    isDark.value = getInitialValue()
    initialized.value = true
  }

  watch(isDark, (newDarkValue) => {
    console.log('new dark', newDarkValue)
    storeNewValue(newDarkValue)
  })

  return {
    isDark,
    toggle,
  }
}
