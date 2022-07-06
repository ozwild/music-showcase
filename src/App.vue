<template>
  <HelloWorld />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
})
</script>
<style lang="scss">
html {
  font-family: monospace;
  font-size: 16px;
}
body {
  background: linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea);
  //color: white;
  min-height: 100vh;
}
</style>
