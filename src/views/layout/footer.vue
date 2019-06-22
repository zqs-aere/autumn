<template>
  <footer class="main-footer">
    footer
  </footer>
</template>

<script>
  export default {
    name: 'main_footer',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-footer {
    height: $footer-h;
    @include bg-color(bg-primary);
  }
</style>
