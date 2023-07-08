import { useSettingsStore } from '@/stores/SettingsStore'

export function useDark() {
  const settings = useSettingsStore()

  function toggle() {
    settings.isDark = !settings.isDark
  }

  return {
    isDark: settings.isDark,
    toggle,
  }
}
