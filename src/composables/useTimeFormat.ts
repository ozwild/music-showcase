function showAsTwoDigits(n: number) {
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}

function format(seconds: number) {
  const s = showAsTwoDigits(Math.floor(seconds % 60))
  const m = showAsTwoDigits(Math.floor((seconds / 60) % 60))

  return `${m}:${s}`
}

export function useTimeFormat() {
  return {
    format,
  }
}
