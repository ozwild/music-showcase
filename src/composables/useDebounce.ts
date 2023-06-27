export function useDebounce() {
  function createDebouncer() {
    let timeout: number | undefined
    return function (fnc: () => void, delayMs = 500) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fnc()
      }, delayMs)
    }
  }
  return {
    debounce: createDebouncer(),
  }
}
