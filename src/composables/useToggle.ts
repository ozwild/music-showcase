import { Ref } from 'vue'

export function useToggle(variable: Ref<boolean>) {
  function toggle() {
    variable.value = !variable.value
  }
  return {
    toggle,
  }
}
