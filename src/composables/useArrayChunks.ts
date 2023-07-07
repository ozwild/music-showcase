export function useArrayChunks() {
  return {
    splitArray<T>(array: T[], size = 4) {
      const clone = [...array]
      const output: T[][] = []

      while (clone.length > 0) {
        const chunk = clone.splice(0, size)
        output.push(chunk)
      }

      return output
    },
  }
}
