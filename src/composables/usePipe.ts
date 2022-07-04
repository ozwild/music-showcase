export const pipe = (process?: () => void) =>
  new Promise((r) => {
    r(process ? process() : null)
  })

export function usePipe() {
  return {
    pipe,
  }
}
