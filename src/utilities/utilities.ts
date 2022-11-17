import { debounce as tsDebounce } from 'ts-debounce'

const LOCAL_STORAGE_KEYS = {
  LIGHT_THEME: 'light-theme-default-value',
}

export const clamp = (value: number, minimum: number, maximum: number) => {
  return value < minimum ? minimum : value > maximum ? maximum : value
}

export function getDarkModeSystemPreference() {
  return window.matchMedia('(prefers-color-scheme:dark)').matches
}

export function getDefaultLightThemeValue() {
  const locallyStoredValue = localStorage.getItem(
    LOCAL_STORAGE_KEYS.LIGHT_THEME
  )
  if (locallyStoredValue) {
    return locallyStoredValue === 'true'
  }

  return !getDarkModeSystemPreference()
}

export function saveDefaultLightThemeValue(value: boolean) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.LIGHT_THEME, value.toString())
}

export function debounce(fn: () => void) {
  return tsDebounce(fn, 200)
}
