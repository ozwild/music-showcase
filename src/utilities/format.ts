export function formatSecondsAsTime(seconds: number): string {
  if (!seconds) return '--:--'
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

export function formatDuration(seconds: number): string {
  return formatSecondsAsTime(seconds)
}

export function formatElapsed(seconds: number): string {
  return formatSecondsAsTime(seconds)
}

export function formatRemaining(seconds: number): string {
  return formatSecondsAsTime(seconds)
}

export function formatProgress(progress: number): string {
  if (!progress) return '-%'
  return (progress * 100).toFixed(0) + '%'
}
