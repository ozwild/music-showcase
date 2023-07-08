import { Ref } from 'vue'

export function useToggle(variable: Ref<boolean>) {
  function toggle() {
    console.log('toggle invoked', variable.value)
    variable.value = !variable.value
  }
  return {
    toggle,
  }
}
