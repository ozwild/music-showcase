import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const isPlaying = ref(false)

  return {
    isPlaying,
  }
})
