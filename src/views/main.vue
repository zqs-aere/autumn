<template>
  <main class="main">
    <main-header
      type="fixed"
      @changeAside="changeAside">
    </main-header>
    <main-content type="header-fixed"></main-content>
    <!-- <main-footer></main-footer> -->

    <main-aside :show.sync="showAside"></main-aside>
  </main>
</template>

<script>
  import MainHeader from './layout/header'
  import MainContent from './layout/content'
  import MainFooter from './layout/footer'
  import MainAside from './layout/aside'

  export default {
    name: 'route_main',
    components: {
      MainHeader,
      MainContent,
      MainFooter,
      MainAside
    },
    data () {
      return {
        showAside: false
      }
    },
    mounted () {
      // if (document.body.clientWidth < 900) {
      //   this.showAside = true
      // }
    },
    methods: {
      changeAside () {
        this.showAside = !this.showAside
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
