<template>
  <div id="app">
    <main-layout></main-layout>
  </div>
</template>

<script>
import MainLayout from './views/main'

export default {
  name: 'App',
  components: {
    MainLayout
  },
  mounted () {
    console.log('log')
    console.info('info')
    console.dir('dir')
    this.$store.dispatch('setTheme')
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @include color(primary);
}
</style>
