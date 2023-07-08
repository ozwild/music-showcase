import { computed } from 'vue'

export function useLocalStorage(key: string) {
  const stored = computed(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : {}
  })

  function update(value: Record<string, unknown>) {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  }
  return {
    stored,
    update,
  }
}
