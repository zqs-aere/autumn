<template>
  <main class="main">
    <main-header></main-header>
    <main-content></main-content>
    <main-footer></main-footer>
  </main>
</template>

<script>
  import MainHeader from './layout/header'
  import MainContent from './layout/content'
  import MainFooter from './layout/footer'

  export default {
    name: 'route_main',
    components: {
      MainHeader,
      MainContent,
      MainFooter
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    min-width: 1200px;
  }
</style>
