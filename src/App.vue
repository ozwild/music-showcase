<template>
  <SplashPresentation v-if="showSplash" @done="splashDoneHandler" />
  <HelloWorld v-if="showApp" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import SplashPresentation from './components/SplashPresentation.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    SplashPresentation,
  },
  data() {
    return {
      showSplash: true,
      showApp: false,
    }
  },
  methods: {
    splashDoneHandler() {
      this.showSplash = false
      this.showApp = true
    },
  },
})
</script>
<style lang="scss">
html {
  font-family: monospace;
  font-size: 16px;
}
body {
  margin: 0;
}
</style>
